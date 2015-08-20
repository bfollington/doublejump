var React = require("react");

import {TopicPill} from 'components/TopicPill.jsx';

export class Module extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <div className="box module">
                <h3><a onClick={this.props.onClick} href={`/concepts/project/${this.props.project}/${this.props.module["_id"]["$oid"]}`}>{this.props.module.title}</a></h3>
                {
                    this.props.topics.map(topic => {
                        return <TopicPill topic={topic} />;
                    })
                }
            </div>
        );
    }
}
