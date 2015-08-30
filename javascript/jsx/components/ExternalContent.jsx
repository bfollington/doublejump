import React from "react";

import { MessageFromUs } from "components/MessageFromUs.jsx";
import { Button } from "components/input/Input.jsx";

export class ExternalContent extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        var win = window.open(this.props.module.url, '_blank');
        win.focus();
    }

    render() {
        return (
            <div className="ExternalContent">
                <MessageFromUs>This concept is hosted on an external website, click the button below when you're ready.</MessageFromUs>
                <p>You'll be heading to <i>{this.props.module.url}</i></p>
                <div className="text-center">
                    <Button text="Open Resource" onClick={this.onClick.bind(this)} />
                </div>
            </div>
        );
    }
}
