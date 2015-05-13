export class FloatingButton extends React.Component {

    constructor() {

    }

    componentDidMount() {
        var el = React.findDOMNode(this);

        $(el).find('[rel=tooltip]').tooltip();
    }

    render() {

        var iconClass = this.props.className;
        if (typeof iconClass == "undefined") {
            iconClass = "";
        }

        return <div className={"round-icon " + this.props.size} onClick={this.props.onClick}><i className={`fa fa-${this.props.icon} ` + iconClass} rel="tooltip" title={this.props.children} /></div>;

    }
}
