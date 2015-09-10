import {Events, SaveModuleFormEvent, ContentTypeSubmissionSuccessEvent} from 'Events.jsx';
import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
import {apply, afterRender} from "react-es7-mixin";

var React = require("react");

@apply(afterRender)
export class CodeContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.value,
            language: this.props.language,
            id: this.props.id,
            editing: false,
            saving: false
        };
    }

    saveToServer(e) {

        if (this.props.onSave) {
            this.props.onSave(this);
        }

        this.setState({
            saving: true
        });

        var data = {
            code_content: {
                body: this.state.content,
                language: this.state.language,
                id: this.state.id
            }
        };
        $.post("/content/code/add", data, this.saveCallback.bind(this));
    }

    isSaving() {
        return this.state.saving;
    }

    saveCallback(data) {
        if (data.success) {
            this.setState({
                id: data.id
            });
        }

        if (this.props.onSaveComplete) {
            this.props.onSaveComplete(this);
        }

        this.setState({
            saving: false
        });
    }

    languageChange(lang) {
        this.setState({language: lang});
    }

    contentChange(content) {
        this.contentBuffer = content;
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
            <ContentType title="Code Content" editable={this.props.editable} id={this.state.id}>
                <AceEditor showLanguageSelection={true} onLanguageChange={this.languageChange.bind(this)} onContentChange={this.contentChange.bind(this)} language={this.state.language} value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div className="CodeContent" data-id={this.state.id}>
                <AceEditor readOnly language={this.state.language} value={this.state.content} />
            </div>
        );

        var content = this.state.editing ? edit : view;

        return ContentType.wrapContentType(this, content, this.edit.bind(this), this.state.editing);
    }
}

CodeContent.defaultProps = {
    language: 'javascript',
    value: "",
    id: null
}
