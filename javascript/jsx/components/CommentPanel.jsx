var React = require("react");
var dynamics = require("dynamics.js");

import {Util} from "Util.jsx";
import {Mixin} from "Mixin";
import {Animation} from "mixins/Animation";

import {Icon} from "components/Icon.jsx";

import {Condition, Case} from "react-case";

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
                <button className="float-right close-link" onClick={this.animate.bind(this, "closed", "spring", this.props.onClose)}>
                    <Icon icon="times" />
                </button>
                <h1 className="title">Comments</h1>

                <Condition>
                    <Case test={this.props.comments.length > 0}>
                        <ul>
                            {
                                this.props.comments.map( comment => {
                                    return <Comment comment={comment}></Comment>;
                                })
                            }
                        </ul>
                    </Case>
                    <Case default>
                        <p className="empty-text">No comments here yet, be the first!</p>
                    </Case>
                </Condition>


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
                <div className="user">
                    <img className="avatar" src={this.props.comment.account.avatar} />
                    <div>@{this.props.comment.account.username}</div>
                </div>
                <div className="comment-content">
                    {this.props.comment.text}
                </div>
            </li>
        );
    }
}
