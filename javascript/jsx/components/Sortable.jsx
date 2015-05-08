var dragula = require('dragula');

export class Sortable extends React.Component {

    componentDidMount() {
        var el = React.findDOMNode(this);
        var $el = $(el);

        dragula(el, {
            moves: function (el, container, handle) {
                return $(handle).hasClass("handle");
            }
        });
    }


    render() {
        return (<div className="sortable">{this.props.children}</div>);
    }
}
