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
            marginTop: 0
        });

        this.addAnimationState("closed", {
            opacity: 0,
            marginTop: "10px"
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
            <div className="comment-panel box">
                <button className="float-right" onClick={this.animate.bind(this, "closed", "spring", this.props.onClose)}>Close</button>
                <h1>Comments</h1>
                <ul>
                    {
                        this.props.comments.map( comment => {
                            return <li>{comment}</li>;
                        })
                    }
                </ul>
                <div>
                    <form>
                        <input ref="comment" className="form-control" type="text" placeholder="Comment..." />
                        <button onClick={this.addComment.bind(this)}>Go</button>
                    </form>
                </div>
            </div>
        );
    }
}
