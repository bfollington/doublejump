import classNames from "classnames";
import React from "react";

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shown: false
        };
    }

    onToggle() {
        this.setState({
            shown: !this.state.shown
        });
    }

    render() {

        var classes = {
            Dropdown: true,
            isShown: this.state.shown
        };

        var trigger;
        var children = [];

        this.props.children.forEach( child => {

            if (child.type == DropdownTrigger) {
                trigger = React.cloneElement(child, {onClick: this.onToggle.bind(this)});
            } else {
                children.push(child);
            }
        });

        return (

            <div className={classNames(classes)}>
                {trigger}
                <div className="inner">
                    {children}
                </div>
            </div>
        );
    }
}

export class DropdownTrigger extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="DropdownTrigger" onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export class DropdownItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="DropdownItem">
                <a href={this.props.href}>{this.props.title}</a>
                {this.props.children}
            </div>
        );
    }
}
