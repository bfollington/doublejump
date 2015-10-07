var React = require("react");
var dynamics = require("dynamics.js");

import {Util} from "Util.jsx";
import {Mixin} from "Mixin";
import {Animation} from "mixins/Animation";

export class CommentPanel extends React.Component {
    constructor(props) {
        super(props);

        Mixin.apply(this, Animation);

        this.addAnimationState("open", {
            opacity: 1,
            marginTop: 0,
            scale: 1
        });

        this.addAnimationState("closed", {
            opacity: 0,
            marginTop: "10px",
            scale: 0
        });

        this.addAnimation("spring", {
            type: dynamics.spring,
            frequency: 200,
            friction: 200,
            duration: 500
        });
    }

    addComment(e) {
        e.preventDefault();
        this.props.onAddComment(React.findDOMNode(this.refs.comment).value);

        React.findDOMNode(this.refs.comment).value = "";
    }

    componentDidMount() {
        this.animateBetween("closed", "open", "spring");
    }

    render() {
        return (
            <div className="comment-panel">
                <button className="float-right close-link" onClick={this.animate.bind(this, "closed", "spring", this.props.onClose)}>Close</button>
                <h1 className="title">Comments</h1>
                <ul>
                    {
                        this.props.comments.map( comment => {
                            return <Comment comment={comment}></Comment>;
                        })
                    }
                </ul>
                <div>
                    <form onSubmit={this.addComment.bind(this)}>
                        <input ref="comment" className="form-control" type="text" placeholder="" />
                    </form>
                </div>
            </div>
        );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="Comment">
                {this.props.comment.text}
                {this.props.comment.author}
            </li>
        );
    }
}
