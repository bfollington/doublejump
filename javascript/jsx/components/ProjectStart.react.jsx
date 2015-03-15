import {Component} from '../Component.jsx';
import page from 'page';

export class ProjectStart extends Component {

    constructor(props)
    {
        super(props);
        this.state = this.getState();
    }

    getState()
    {
        return {
            field: "value",
            name: "Bob"
        };
    }

    navigate(e)
    {
        console.log("Navigated");
        page("/concepts/test");
    }

    render() {
        return (
            <div className="box">
                <h2>Start a New Project</h2>
                <a href="/concepts/test">Go to test</a>
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
