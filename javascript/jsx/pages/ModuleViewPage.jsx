var React = require("react");

export class ModuleViewPage extends React.Component {

    constructor() {
        super();

        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        $.get("/concepts/concept/" + this.props.context.params.module,
            (function(data) {
                this.setState({ learningModule: data["learning_module"], contents: data["contents"], loaded: true})
            }).bind(this)
        );
    }

    render() {
        console.log(this.props.context);

        var body;

        if (this.state.loaded) {
            body = (
                <div className="box">
                    <h3>{this.props.context.params.project}</h3>
                    <h2>{this.state.learningModule.title}</h2>
                    <ul>
                    {
                        this.state.contents.map( function( concept ) {
                            return <li>{concept}</li>;
                        })
                    }
                    </ul>
                </div>
            );
        }

        return (
            <div>
                {body}
            </div>
        );
    }
}
