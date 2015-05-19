import {Events, SaveModuleFormEvent, ContentTypeSubmissionSuccessEvent} from 'Events.jsx';
import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
var marked = require('marked');
var handlebars = require('handlebars');

export class MarkdownContent extends React.Component {

    constructor(props) {
        super.constructor(props);

        this.state = {
            content: this.props.value,
            id: this.props.id
        };
    }

    componentDidMount() {
        Events.subscribeRoot( SaveModuleFormEvent, this.saveToServer.bind(this) );
        this.renderMath();
    }

    componentDidUnmount() {
        Events.unsubscribeRoot( SaveModuleFormEvent, this.saveToServer.bind(this) );
    }

    componentDidUpdate() {
        this.renderMath();
    }

    saveToServer(e) {
        var data = {
            markdown_content: {
                body: this.state.content,
                id: this.state.id
            }
        };
        $.post("/content/markdown/add", data, this.saveCallback.bind(this));
    }

    saveCallback(data) {
        if (data.success) {
            this.setState({id: data.id});
        }

        Events.emitRoot(ContentTypeSubmissionSuccessEvent, this);
    }

    contentChange(content) {
       this.contentBuffer = content;
    }

    renderMath() {
        if (!this.state.editing) {
            var $el = $(React.findDOMNode(this));

            var renderTarget = $el.find(".markdown-content")[0];
            var html = marked(this.state.content);
            var template = handlebars.compile(html);

            renderTarget.innerHTML = template(this.props.metadata());
        }
    }



    edit(e) {
        if (this.props.editable()) {
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
            <ContentType title="Markdown Content" editable={this.props.editable}>
                <AceEditor onContentChange={this.contentChange.bind(this)} language='markdown' value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div data-id={this.state.id}>
                <div className="markdown-content"></div>
            </div>
        );

        var content = this.state.editing ? edit : view;

        return ContentType.wrapContentType(this, content, this.edit.bind(this));
    }
}

MarkdownContent.defaultProps = {
    value: "",
    id: null
}
