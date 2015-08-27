var React = require("react");
var page = require("page");

import {TopicPill} from 'components/TopicPill.jsx';

export class Module extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onClick() {
        page(`/concepts/project/${this.props.project}/${this.props.module["_id"]["$oid"]}`);
    }

    render() {

        return (
            <div className="module">
                <div className="box inner" onClick={this.onClick.bind(this)}>
                    <div className="bar"></div>
                    <h3><a onClick={this.props.onClick} href={`/concepts/project/${this.props.project}/${this.props.module["_id"]["$oid"]}`}>{this.props.module.title}</a></h3>
                </div>
                <div className="info-panel">
                    <div className="body">

                        Suggested because...?
                    </div>
                    <div className="topics inverted">
                        {
                            this.props.topics.map(topic => {
                                return <TopicPill topic={topic} />;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
