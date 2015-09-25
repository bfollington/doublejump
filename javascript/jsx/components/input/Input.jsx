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
                            placeholder={this.props.placeholder}
                            required={this.props.required}
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
                            placeholder={this.props.placeholder}
                            required={this.props.required}
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

Input.propTypes = {
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    type: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func,
    multiLine: React.PropTypes.bool,
    required: React.PropTypes.bool,
    placeholder: React.PropTypes.string
};

export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button data-tooltip={this.props.tooltip} disabled={this.props.disabled} type={this.props.type} className={this.props.className + " Button"} onClick={this.props.onClick}>
            {this.props.text}
            {this.props.children}
            </button>
        );
    }
}

Button.defaultProps = {
    type: "button"
};

Button.propTypes = {
    disabled: React.PropTypes.bool,
    type: React.PropTypes.string,
    text: React.PropTypes.string,
    onClick: React.PropTypes.func
};
