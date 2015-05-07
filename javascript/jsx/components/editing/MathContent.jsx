import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
var katex = require('katex');

export class MathContent extends React.Component {

    constructor(props) {
        super.constructor(props);

        this.state = {
            content: this.props.value,
            editing: this.props.editContent
        };
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

    componentDidMount() {
        this.renderMath();
    }

    componentDidUpdate() {
        this.renderMath();
    }

    edit(e) {
        if (this.props.editable) {
            this.contentBuffer = this.state.content;
            this.setState({editing: true});
        }
    }

    save(e) {
        this.setState({content: this.contentBuffer});
        this.setState({editing: false});
    }

    cancel(e) {
        this.setState({editing: false});
    }

    render() {

        var edit = (
            <ContentType title="Math Content">
                <AceEditor onContentChange={this.contentChange.bind(this)} language='latex' value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div onDoubleClick={this.edit.bind(this)}>
                <div className="math-content"></div>
            </div>
        );

        var content = this.state.editing ? edit : view;

        return content;
    }
}

MathContent.defaultProps = {
    value: ""
}
