import {Component} from '../Component.jsx';
import {CodeContent} from './editing/CodeContent.jsx';
import {MathContent} from './editing/MathContent.jsx';
import {MarkdownContent} from './editing/MarkdownContent.jsx';
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
            name: "Bob",
            editField: false
        };
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
                <CodeContent editContent={this.state.editField} value="console.log(test);" />
                <MathContent editContent={this.state.editField} value="\alpha\beta\gamma" />
                <MarkdownContent editContent={this.state.editField} value="Hello _You_" />

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
