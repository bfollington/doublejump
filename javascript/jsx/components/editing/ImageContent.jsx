import {Events, SaveModuleFormEvent} from 'Events.jsx';
import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
var marked = require('marked');

export class ImageContent extends React.Component {

    constructor(props) {
        super.constructor(props);

        this.state = {
            content: this.props.value
        };
    }

    componentDidMount() {
        Events.subscribeRoot( SaveModuleFormEvent, this.saveToServer.bind(this) );
    }

    componentDidUnmount() {
        Events.unsubscribeRoot( SaveModuleFormEvent, this.saveToServer.bind(this) );
    }

    saveToServer(e) {
        console.log("test");
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
        this.setState({content: this.contentBuffer});
        this.setState({editing: false});
    }

    cancel(e) {
        this.setState({editing: false});
    }

    render() {

        var edit = (
            <ContentType title="Image Content" editable={this.props.editable}>
                <AceEditor onContentChange={this.contentChange.bind(this)} language='markdown' value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div>
                <img src={this.state.content} />
            </div>
        );

        var content = this.state.editing ? edit : view;

        return ContentType.wrapContentType(this, content, this.edit.bind(this));
    }
}

ImageContent.defaultProps = {
    value: ""
}
