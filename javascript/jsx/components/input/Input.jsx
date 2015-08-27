import React from "react";

export class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    val() {
        return React.findDOMNode(this.refs.input).value;
    }

    render() {
        return (
            <div className="Input">
                <label htmlFor={this.props.name}>{this.props.label}</label>

                {
                    this.props.multiLine ?
                        <textarea
                            ref="input"
                            className="form-control"
                            name={this.props.name}
                            value={this.props.value}
                            defaultValue={this.props.defaultValue}
                            onChange={this.props.onChange}
                        />
                    :
                        <input
                            ref="input"
                            className="form-control"
                            name={this.props.name}
                            type={this.props.type}
                            value={this.props.value}
                            defaultValue={this.props.defaultValue}
                            onChange={this.props.onChange}
                        />
                }


                <div className="caption">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Input.defaultProps = {
    type: "text"
};

export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type={this.props.type} className="Button button create-button" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

Button.defaultProps = {
    type: "button"
};
