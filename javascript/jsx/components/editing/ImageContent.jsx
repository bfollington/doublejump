import {ContentType} from 'components/editing/ContentType.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
var marked = require('marked');
import {apply, afterRender} from "react-es7-mixin";

var React = require("react");

@apply(afterRender)
export class ImageContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.value,
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
            image_content: {
                src: this.state.content,
                id: this.state.id
            }
        };
        $.post("/content/image/add", data, this.saveCallback.bind(this));
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
            <ContentType title="Image Content" editable={this.props.editable} id={this.state.id}>
                <AceEditor onContentChange={this.contentChange.bind(this)} language='markdown' value={this.state.content} />
                <button className="button create-button" onClick={this.save.bind(this)}>Save</button>
                <button className="button create-button" onClick={this.cancel.bind(this)}>Cancel</button>
            </ContentType>
        );

        var view = (
            <div data-id={this.state.id} className="ImageContent">
                <img src={this.state.content} />
            </div>
        );

        var content = this.state.editing ? edit : view;

        return ContentType.wrapContentType(this, content, this.edit.bind(this));
    }
}

ImageContent.defaultProps = {
    value: "",
    id: null
}
