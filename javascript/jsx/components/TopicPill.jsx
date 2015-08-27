var React = require("react");
import classNames from "classnames";

export class TopicPill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    clicked() {
        if (this.props.selectable) {
            this.setState({selected: true});

            this.props.onSelect(this.props.topic);
        }
    }

    render() {

        var c = {
            "topic-pill": true,
            "big": this.props.big,
            "selectable": this.props.selectable,
            "selected": this.state.selected
        };
        c = classNames(c);

        return (
            <span className={c} onClick={this.clicked.bind(this)} >{this.props.topic.name}</span>
        );
    }
}
