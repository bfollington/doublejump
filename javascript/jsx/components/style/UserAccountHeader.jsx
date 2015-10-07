import React from "react";
import { Dropdown, DropdownTrigger, DropdownItem } from "components/Dropdown.jsx";
import { Icon } from "components/Icon.jsx";

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

                    <Dropdown>
                        <DropdownTrigger>
                            {this.props.account.name}
                            <Icon icon="chevron-down" size="14px" spacingLeft="4px" />
                        </DropdownTrigger>
                        <DropdownItem title="Logout" href="/logout" />
                    </Dropdown>

                    <div>
                        <small className="extra-small">(that's you!)</small>
                    </div>
                </div>

            </div>
        );
    }
}
