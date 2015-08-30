var React = require("react");
import { Icon } from "components/Icon.jsx";

export class FloatingButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var el = React.findDOMNode(this);

        // $(el).find('[rel=tooltip]').tooltip();
    }

    render() {

        var iconClass = this.props.className;
        if (typeof iconClass == "undefined") {
            iconClass = "";
        }

        return (
            <div className={"FloatingButton " + this.props.size + " " + this.props.className} onClick={this.props.onClick}>

                <Icon icon={this.props.icon} />
            </div>
        );

    }
}
