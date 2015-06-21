var React = require("react");

export class ContentTypeToolbar extends React.Component {
    render() {
        return (
            <div className="content-type-toolbar">
                <h4>
                    <i className={"fa margin-right" + this.props.icon} />
                    {this.props.children}
                </h4>
            </div>
        );
    }
}
