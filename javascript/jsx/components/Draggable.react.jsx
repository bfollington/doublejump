var React = require("react");

export class Draggable extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState()
    {
        return {
            x: 30,
            y: 30
        };
    }

    touched(e)
    {
        console.log("Touched");
        this.setState({
            startX: e.changedTouches[0].pageX,
            startY: e.changedTouches[0].pageY
        })
        e.stopPropagation();
        e.preventDefault();
    }

    move(e)
    {
        this.setState({
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        });
        e.stopPropagation();
        e.preventDefault();
    }

    release(e)
    {
        console.log("Released");
        console.log(e);
        e.stopPropagation();
        e.preventDefault();
    }

    render() {

        var x = this.state.startX + (this.state.x - this.state.startX);
        var y = this.state.startY + (this.state.y - this.state.startY);

        return (
            <div className={"draggable"} style={{top: y+"px", left: x+"px"}} onTouchStart={this.touched.bind(this)} onTouchMove={this.move.bind(this)} onTouchEnd={this.release.bind(this)}></div>
        );
    }
}
