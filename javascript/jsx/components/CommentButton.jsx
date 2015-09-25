import {CommentPanel} from "components/CommentPanel.jsx";

var React = require("react");


export class CommentButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false
        }
    }

    showComments(e) {
        this.setState({showComments: true});
    }

    hideComments(e) {
        console.log("It gone");
        this.setState({showComments: false});
    }

    render() {

        var inner;

        if (this.props.comments.length > 0) {
            inner = [<span>{this.props.comments.length} </span>, <i className="fa fa-comment" />];
        } else {
            inner = [<i className="fa fa-plus" />];
        }

        var panel;

        if (this.state.showComments) {
            panel = <CommentPanel comments={this.props.comments} onAddComment={this.props.onAddComment} onClose={this.hideComments.bind(this)} />;
        }

        return (
            <div className="comment-button">
                <div className="button-wrap">
                    <button className="open-button" onClick={this.showComments.bind(this)}>
                        {inner}
                    </button>
                </div>
                {panel}
            </div>
        );
    }
}

CommentButton.defaultProps = {
    "comments": []
};
