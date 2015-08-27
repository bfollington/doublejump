import React from "react";
import { Row, Column } from "components/Layout.jsx";

export class MessageFromUs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MessageFromUs">
                <Row>
                    <Column sizes={{sm: 1, xs: 2}}>
                        <div className="full-height">
                            <div className="doublejump-round" />
                        </div>
                    </Column>
                    <Column sizes={{sm: 11, xs: 10}}>
                        <div className="message-bubble">
                            <div className="triangle" />
                            {this.props.children}
                        </div>
                    </Column>
                </Row>
            </div>
        );
    }
}
