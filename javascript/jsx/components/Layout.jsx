import React from "react";
import classNames from "classnames";

export class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }
}

export class GridRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let i = 0;

        var children = this.props.children.length >= 1 ? this.props.children : [this.props.children];

        return (
            <div className="row">
                {
                    children.map( col => {
                        return <Column key={i++} sizes={this.props.sizes}>{col}</Column>;
                    })
                }
            </div>
        );
    }
}

GridRow.defaultProps = {
    sizes: {
        xs: 1
    }
}

export class Column extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var classes = ["column"];

        for (var size in this.props.sizes) {
            classes.push(`col-${size}-${this.props.sizes[size]}`);
        }

        classes = classNames(classes);

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

Column.defaultProps = {
    sizes: {
        xs: 1
    }
}
