var React = require("react");

export class TopicPill extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <span className="topic-pill">{this.props.topic.name}</span>
        );
    }
}
