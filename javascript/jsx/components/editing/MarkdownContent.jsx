import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
var marked = require('marked');

export class MarkdownContent extends React.Component {

    constructor(props) {
        super.constructor(props);

        this.state = {
            content: this.props.value
        };
    }

    contentChange(content) {
       this.contentBuffer = content;
    }

    renderMath() {
        if (!this.state.editing) {
            console.log("Rendering markdown");
            var $el = $(React.findDOMNode(this));

            var renderTarget = $el.find(".markdown-content")[0];

            renderTarget.innerHTML = marked(this.state.content);
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
            <ContentType title="Markdown Content">
                <AceEditor onContentChange={this.contentChange.bind(this)} language='markdown' value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div onDoubleClick={this.edit.bind(this)}>
                <div className="markdown-content"></div>
            </div>
        );

        var content = this.state.editing ? edit : view;

        return content;
    }
}

MarkdownContent.defaultProps = {
    value: ""
}
