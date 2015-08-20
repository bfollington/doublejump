import data from "mixins/data";
import connect from "mixins/connect";
//import { addProject } from "actions/Project";
import { fetchTopics } from "actions/Topic";

import React from "react";

@connect(
    state => (
        {
            topics: state.topic.items
        }
    )
)
@data(

    props => [
        fetchTopics()
    ]
)
export class NewProjectPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {};

        this.loadData(props);
    }

    render() {
        return (
            <div className="box">
                <h2>Start a New Project</h2>

                { this.props.topics }
            </div>
        );
    }
}
