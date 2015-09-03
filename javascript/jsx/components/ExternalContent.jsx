import React from "react";

import { MessageFromUs } from "components/MessageFromUs.jsx";
import { Button } from "components/input/Input.jsx";

export class ExternalContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iframeDisplay: "none",
            failedToLoad: false,
            loading: true
        };
    }

    onClick() {
        var win = window.open(this.props.module.url, '_blank');
        win.focus();
    }

    onLoadExternal() {
        console.log('DID LAOD');

        if (new Date().getTime() - this.startLoadingFrameTime < 1024) {
            console.log("BOY THAT'S A FAST LOAD");
            this.setState({
                failedToLoad: true,
                loading: false
            });
        } else {
            this.setState({
                iframeDisplay: "block",
                failedToLoad: false,
                loading: false
            });
        }


    }

    render() {

        if (!this.hasRendered) {
            this.hasRendered = true;

            this.startLoadingFrameTime = new Date().getTime();
        }

        return (
            <div className="ExternalContent">
                <MessageFromUs>This concept is hosted on an external website at <i>{this.props.module.url}</i>.</MessageFromUs>

                { this.state.loading ? "Loading..." : null }
                {
                    this.state.failedToLoad ?

                        <div className="text-center">
                            <Button text="Open Resource" onClick={this.onClick.bind(this)} />
                        </div>
                    :
                        <iframe style={{display: this.state.iframeDisplay}} src={this.props.module.url} onLoad={this.onLoadExternal.bind(this)} />
                }



            </div>
        );
    }
}
