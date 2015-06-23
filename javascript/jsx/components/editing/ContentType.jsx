import {ContentTypeToolbar} from "./ContentTypeToolbar.jsx";
import {FloatingButton} from "components/FloatingButton.jsx";
import {CommentButton} from "components/CommentButton.jsx";

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

ContentType.wrapContentType = function(ctx, content, editHandler) {

    var inner = [
        <div className="edit-content-type-tools float-right">
            <FloatingButton icon="arrows" className="handle">Move</FloatingButton>
            <FloatingButton icon="pencil" onClick={editHandler}>Edit</FloatingButton>
        </div>,
        {content}
    ];

    if (!ctx.props.editable()) {
        inner = content;
    }

    return (
        <div className={"box content-type " + (ctx.props.editable() ? "editable" : "")} >
        <CommentButton />
            {inner}
        </div>
    );
}
