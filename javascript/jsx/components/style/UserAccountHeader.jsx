import React from "react";

export class UserAccountHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="header-bar logged-in">
                {
                    this.props.account.avatar ?
                        <div className="doublejump-gap center-text">
                            <a href="/">
                                <img className="avatar small" src={this.props.account.avatar} />
                            </a>
                        </div>
                    :
                        <a className="doublejump" href="/"></a>
                }

                <div className="center-text padding">
                    <span className="dropdown">
                        <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                            {this.props.account.name}
                            <i className="fa fa-chevron-down" />
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="/destroy">Logout</a>
                                </li>
                            </ul>
                        </a>
                    </span>

                    <div>
                        <small className="extra-small">(that's you!)</small>
                    </div>
                </div>

            </div>
        );
    }
}
