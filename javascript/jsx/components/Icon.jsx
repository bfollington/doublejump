import React from "react";

export class Icon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <i
                className={"fa fa-" + this.props.icon}
                style={{
                    fontSize: this.props.size,
                    marginLeft: this.props.spacingLeft,
                    marginRight: this.props.spacingRight
                }}
            />
        );
    }
}
