import React from "react";

import connect from "mixins/connect";

@connect(
    state => (
        {
            notification: state.notification.currentNotification
        }
    )
)
export class NotificationCenter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.notification}
            </div>
        );
    }
}
