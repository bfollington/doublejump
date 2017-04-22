var React = require("react");
var page = require("page");

import {TopicPill} from 'components/TopicPill.jsx';
import connect from "mixins/connect";


@connect(
    (state, props) => {
        return {
            topic_scores: state.project.items[props.project].data.metadata.topic_scores
        }
    }
)
export class Module extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onClick() {
        page(`/project/${this.props.project}/${this.props.module["id"]}`);
    }

    getMostRelevantTopics() {

        var mostRelevant = [];
        var highestScore = Number.NEGATIVE_INFINITY;

        this.props.topics.forEach( (topic, i) => {
            if (this.props.topic_scores[topic.key_name] > highestScore) {
                highestScore = this.props.topic_scores[topic.key_name];
            }
        });


        this.props.topics.forEach( (topic, i) => {
            if (this.props.topic_scores[topic.key_name] === highestScore) {
                mostRelevant.push(topic);
            }
        });

        console.log("BEST SCORE", highestScore);
        return mostRelevant;
    }

    render() {

        return (
            <div className="module">
                <div className="box inner" onClick={this.onClick.bind(this)}>
                    <div className="bar"></div>
                    <h3><a onClick={this.props.onClick} href={`/project/${this.props.project}/${this.props.module["id"]}`}>{this.props.module.title}</a></h3>
                </div>
                { this.getMostRelevantTopics().length > 0 ?
                    <div className="info-panel">
                        <div className="body">

                            Suggested because
                        </div>
                        <div className="topics inverted">
                            {
                                this.getMostRelevantTopics().map(topic => {
                                    return <TopicPill topic={topic} />;
                                })
                            }
                        </div>
                    </div>
                : null}
            </div>
        );
    }
}
