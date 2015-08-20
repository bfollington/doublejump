import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import page from 'page';

import data from "mixins/data";
import connect from "mixins/connect";
import { fetchProject } from "actions/Project";
import { fetchModules } from "actions/Module";

var React = require("react");

@connect(
    state => (
        {
            modules: Object.keys(state.module).map( key => state.module[key] ),
            projects: state.project,
            topics: state.topic.items
        }
    )
)
@data(

    props => [
        fetchProject(props.project),
        fetchModules()
    ]
)
export class ProjectStartPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {};

        this.loadData(props);
    }

    navigate(e)
    {
        console.log("Navigated");
        page("/concepts/test");
    }

    edit(e) {
        this.setState({editField: !this.state.editField});
    }

    render() {
        return (
            <div className="box">
                <h2>Start a New Project</h2>
                <a href="/concepts/test">Go to test</a>

                { this.props.modules.map( module => <li><a href={`/concepts/project/${this.props.project}/${module.data._id.$oid}`}>{module.data.title}</a></li> )}

                <button className="btn btn-default" onClick={this.edit.bind(this)}>
                    Edit Field
                </button>

                <div className="btn-group" role="group" onClick={this.navigate.bind(this)}>
                    <button className="btn btn-default">
                        Click me to Add Data
                    </button>

                    <button className="btn btn-default">
                        Click me to Replay Data
                    </button>

                    <button className="btn btn-default">
                        Click me to Reset Data
                    </button>
                </div>
            </div>
        );
    }
}
