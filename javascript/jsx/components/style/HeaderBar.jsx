import React from "react";

import {UserAccountHeader} from "components/style/UserAccountHeader.jsx";

export class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="header">
                {
                    this.props.account ?
                        <UserAccountHeader account={this.props.account} />
                    :
                        <div className="header-bar">
                            <a className="doublejump" href="/" />
                        </div>
                }

                <div className="gradient-strip" />
            </div>

        );
    }
}
