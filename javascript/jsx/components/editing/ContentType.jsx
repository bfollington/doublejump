import {ContentTypeToolbar} from "./ContentTypeToolbar.jsx";
import {FloatingButton} from "components/FloatingButton.jsx";
import {CommentButton} from "components/CommentButton.jsx";

import API from "API";
import { fetchContents } from "actions/Content";

var React = require("react");

export class ContentType extends React.Component {
    render() {
        return (
            <div className={"content-type " + this.props.editable() ? "editable" : ""}>
                <ContentTypeToolbar icon={this.props.titleIcon}>{this.props.title}</ContentTypeToolbar>
                {this.props.children}
            </div>
        );
    }
}

ContentType.addComment = function(comment) {

    console.log(this.props);
    API.addComment(this.props.id, comment, res => {
        fetchContents(this.props.module);
        console.log(res);
    });
}

function onDelete() {
    this.props.onDelete(this);
}

ContentType.wrapContentType = function(ctx, content, editHandler, inBox = true) {

    var inner = [
        <div className="edit-content-type-tools float-right">
            <FloatingButton icon="arrows" className="handle">Move</FloatingButton>
            <FloatingButton icon="pencil" onClick={editHandler}>Edit</FloatingButton>
            <FloatingButton icon="times" onClick={onDelete.bind(ctx)}>Delete</FloatingButton>
        </div>,
        {content}
    ];

    if (!ctx.props.editable()) {
        inner = content;
    }

    return (
        <div className={ (inBox ? "box" : "") + " content-type " + (ctx.props.editable() ? "editable" : "")} >
            { !ctx.props.editable() ? <CommentButton comments={ctx.props.comments} onAddComment={ContentType.addComment.bind(ctx)} /> : null }
            <div>{inner}</div>
        </div>
    );
}
