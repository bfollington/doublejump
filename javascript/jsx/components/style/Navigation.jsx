import React from "react";

import { GridRow } from "components/Layout.jsx";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <nav className="banner-navigation">
                <GridRow autoSize>
                    {
                        !this.props.account ?
                            <a href="/login">Login</a>
                        :
                            <a href="/dashboard">Dashboard</a>
                    }

                    { this.props.account && this.props.account.current_project ? <a href={`/project/${this.props.account.current_project.slug}`}>Current Project</a> : null }
                </GridRow>
            </nav>

        );
    }
}
