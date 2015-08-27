import React from "react";

import { GridRow } from "components/Layout.jsx";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <nav className="banner-navigation">
                <GridRow sizes={{xs: 6}}>
                    {
                        !this.props.account ?
                            <a href="/login">Login</a>
                        :
                            <a href="/concepts/dashboard">Dashboard</a>
                    }

                    { this.props.account ? <a href={`/concepts/project/${this.props.account.current_project_id.$oid}`}>Browse Concepts</a> : null }
                </GridRow>
            </nav>

        );
    }
}
