import {ContentTypeToolbar} from "./ContentTypeToolbar.jsx";

export class ContentType extends React.Component {
    render() {
        return (
            <div className={"content-type " + this.props.editable ? "editable" : ""}>
                <ContentTypeToolbar icon={this.props.titleIcon}>{this.props.title}</ContentTypeToolbar>
                {this.props.children}
            </div>
        );
    }
}

ContentType.wrapContentType = function(ctx, content) {

    var inner = (
        <div className="row">
            <div className="col-xs-1">
                <i className="fa fa-arrows handle" />
            </div>
            <div className="col-xs-11">
                {content}
            </div>
        </div>
    );

    if (!ctx.props.editable) {
        inner = content;
    }

    return (
        <div className={"content-type " + (ctx.props.editable ? "editable" : "")} >
            {inner}
        </div>
    );
}
