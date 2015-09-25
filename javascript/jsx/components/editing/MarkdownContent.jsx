import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
var marked = require('marked');
var handlebars = require('handlebars');
import {apply, afterRender} from "react-es7-mixin";

import applyHandlebarsHelpers from "HandlebarsHelpers";
applyHandlebarsHelpers(handlebars);

var React = require("react");

@apply(afterRender)
export class MarkdownContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.value,
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
            markdown_content: {
                body: this.state.content,
                id: this.state.id
            }
        };
        $.post("/content/markdown/add", data, this.saveCallback.bind(this));
    }

    isSaving() {
        return this.state.saving;
    }

    saveCallback(data) {
        if (data.success) {
            this.setState({id: data.id});

        }

        if (this.props.onSaveComplete) {
            this.props.onSaveComplete(this);
        }

        this.setState({
            saving: false
        });
    }

    contentChange(content) {
       this.contentBuffer = content;
    }

    renderMath() {
        if (!this.state.editing) {
            var $el = $(React.findDOMNode(this));

            var renderTarget = $el.find(".markdown-content")[0];
            var html = this.state.content;
            var template = handlebars.compile(html);
            var compiledMd = template(this.props.metadata());

            renderTarget.innerHTML = marked(compiledMd);
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
            <ContentType title="Markdown Content" editable={this.props.editable} id={this.state.id}>
                <AceEditor onContentChange={this.contentChange.bind(this)} height={256} language='markdown' value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div data-id={this.state.id}>
                <div className="MarkdownContent markdown-content"></div>
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
