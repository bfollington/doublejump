import {CodeContent} from './editing/CodeContent.jsx';
import {MathContent} from './editing/MathContent.jsx';
import {MarkdownContent} from './editing/MarkdownContent.jsx';
import page from 'page';

import {Mixin} from 'Mixin';
import {Store} from 'mixins/Store';

var React = require("react");

export class ProjectStart extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = this.getState();

        Mixin.apply(this, Store, {stores: ["module"]});
    }

    getState()
    {
        return {
            modules: []
        };
    }

    componentDidMount() {
        this.stores.module.fetchAll(this.fetchedData.bind(this));
    }

    fetchedData(data) {
        console.log(data);

        this.setState({
            modules: data.modules
        });
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

                { this.state.modules.map( module => <li><a href={`/concepts/view/${module._id.$oid}`}>{module.title}</a></li> )}

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
