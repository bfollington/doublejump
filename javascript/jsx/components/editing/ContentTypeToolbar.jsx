export class ContentTypeToolbar extends React.Component {
    render() {
        return (
            <div className="content-type-toolbar">
                <button className="delete-button float-right">
                    <i className="fa fa-times" />
                </button>

                <button className="create-button float-right">
                    <i className="fa fa-minus" />
                </button>

                <h4>
                    <i className={"fa margin-right" + this.props.icon} />
                    {this.props.children}
                </h4>
            </div>
        );
    }
}
