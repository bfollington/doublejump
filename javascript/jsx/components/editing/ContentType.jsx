import {ContentTypeToolbar} from "./ContentTypeToolbar.jsx";

export class ContentType extends React.Component {
    render() {
        return (
            <div className="content-type">
                <ContentTypeToolbar icon={this.props.titleIcon}>{this.props.title}</ContentTypeToolbar>
                {this.props.children}
            </div>
        );
    }
}
