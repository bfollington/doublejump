import React from "react";

import connect from "mixins/connect";
import {clearNotification} from "actions/Notification";

@connect(
    state => (
        {
            notification: state.notification.currentNotification
        }
    ),
    dispatch => (
        {
            clearNotification: (data) => dispatch(clearNotification())
        }
    )
)
export class NotificationCenter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {

        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }

        this.timeout = window.setTimeout( () => {
            this.props.clearNotification();
        }, 2500);
    }

    render() {
        return (
            <div className="NotificationCenter">
                {
                    this.props.notification ?
                        <div className="Notification">{this.props.notification}</div>
                    :
                        null
                }
            </div>
        );
    }
}
