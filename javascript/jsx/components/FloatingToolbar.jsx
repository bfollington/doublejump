var React = require("react");

export class FloatingToolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var el = React.findDOMNode(this);
    }

    render() {

        return (
            <div className="FloatingToolbar">
                {this.props.children}
            </div>
        );

    }
}
