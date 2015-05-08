import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';

export class CodeContent extends React.Component {

    constructor(props) {
        super.constructor(props);

        this.state = {
            content: this.props.value,
            language: this.props.language
        };
    }

    languageChange(lang) {
        this.setState({language: lang});
    }

    contentChange(content) {
        this.contentBuffer = content;
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
            <ContentType title="Code Content" editable={this.props.editable}>
                <AceEditor showLanguageSelection={true} onLanguageChange={this.languageChange.bind(this)} onContentChange={this.contentChange.bind(this)} language={this.state.language} value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <pre onDoubleClick={this.edit.bind(this)}>
                <code className={this.state.language}>
                    {this.state.content}
                </code>
            </pre>
        );

        var content = this.state.editing ? edit : view;

        return ContentType.wrapContentType(this, content);
    }
}

CodeContent.defaultProps = {
    language: 'javascript',
    value: ""
}
