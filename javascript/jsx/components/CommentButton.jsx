var React = require("react");

export class CommentButton extends React.Component {
    render() {
        return (
            <button className={this.constructor.name}>
                <i className="fa fa-comment" />
            </button>
        );
    }
}
