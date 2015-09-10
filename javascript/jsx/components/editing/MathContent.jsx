import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
var katex = require('katex');
import {apply, afterRender} from "react-es7-mixin";

var React = require("react");

@apply(afterRender)
export class MathContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.value,
            editing: this.props.editContent,
            id: this.props.id,
            editing: false,
            saving: false
        };
    }

    componentDidMount() {
        this.renderMath();
    }

    componentDidUpdate() {
        this.renderMath();
    }

    saveToServer(e) {

        if (this.props.onSave) {
            this.props.onSave(this);
        }

        this.setState({
            saving: true
        });

        var data = {
            math_content: {
                body: this.state.content,
                id: this.state.id
            }
        };
        $.post("/content/math/add", data, this.saveCallback.bind(this));
    }

    isSaving() {
        return this.state.saving;
    }

    saveCallback(data) {
        if (data.success) {
            this.setState({id: data.id});
        }

        this.setState({
            saving: false
        });

        if (this.props.onSaveComplete) {
            this.props.onSaveComplete(this);
        }
    }

    contentChange(content) {
        this.contentBuffer = content;
    }

    renderMath() {
        if (!this.state.editing) {
            console.log("Rendering math");
            var $el = $(React.findDOMNode(this));

            var renderTarget = $el.find(".math-content")[0];
            try {
                katex.render(this.state.content, renderTarget, { displayMode: true });
            } catch (err) {
                renderTarget.innerHTML = "Math Render Error: " + err;
            }
        }
    }

    edit(e) {
        if (this.props.editable()) {
            this.contentBuffer = this.state.content;
            this.setState({editing: true});
        }
    }

    save(e) {
        this.setStateAnd({
            content: this.contentBuffer,
            editing: false
        })
        .then( this.saveToServer.bind(this) );
    }

    cancel(e) {
        this.setState({editing: false});
    }

    render() {

        var edit = (
            <ContentType title="Math Content" editable={this.props.editable} id={this.state.id}>
                <AceEditor onContentChange={this.contentChange.bind(this)} language='latex' value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div data-id={this.state.id}>
                <div className="math-content"></div>
            </div>
        );

        var content = this.state.editing ? edit : view;

        return ContentType.wrapContentType(this, content, this.edit.bind(this));
    }
}

MathContent.defaultProps = {
    value: "",
    id: null
}
