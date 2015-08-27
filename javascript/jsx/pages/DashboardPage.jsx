import data from "mixins/data";
import connect from "mixins/connect";
import { fetchModules } from "actions/Module";
import { fetchNextModules } from "actions/Project";
import { fetchTopics } from "actions/Topic";

import { Module } from "components/Module.jsx";
import { GridRow, Column } from "components/Layout.jsx";

import page from "page";
import React from "react";
import Select from "react-select";

@connect(
    state => (
        {
        }
    )
)
@data(

    props => [
    ]
)
export class DashboardPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {};

        this.loadData(props)
            .then( () => this.setState({ready: true}) );
    }

    render() {

        if (!this.state.ready) return null;

        return (
            <div className="main-content">

                <h2>Current Project</h2>

                <h2>Other Projects</h2>

            </div>
        );
    }
}
