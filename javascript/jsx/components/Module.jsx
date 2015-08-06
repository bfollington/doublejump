var React = require("react");

import {Mixin} from 'Mixin';
import {Store} from 'mixins/Store';
import {TopicPill} from 'components/TopicPill.jsx';

export class Module extends React.Component {
    constructor(props) {
        super(props);

        Mixin.apply(this, Store, {stores: ["topic", "project"]});

        this.state = {
            topics: []
        };
    }

    componentDidMount() {
        this.updateTopics();
    }

    componentWillReceiveProps() {
        this.updateTopics();
    }

    updateTopics() {
        this.stores.topic.getList(this.props.module.topic_ids.map(topic_id => topic_id["$oid"]), (topics) => {
            this.setState({
                topics: topics
            });
        });
    }

    render() {

        return (
            <div className="box module">
                <h3><a onClick={this.props.onClick} href={`/concepts/project/${this.stores.project.getCurrentProject()}/${this.props.module["_id"]["$oid"]}`}>{this.props.module.title}</a></h3>
                {
                    this.state.topics.map(topic => {
                        return <TopicPill topic={topic} />;
                    })
                }
            </div>
        );
    }
}
