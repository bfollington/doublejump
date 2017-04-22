import data from "mixins/data";
import connect from "mixins/connect";
import { fetchModules } from "actions/Module";
import { fetchNextModules, fetchProjects } from "actions/Project";
import { fetchTopics } from "actions/Topic";

import { Module } from "components/Module.jsx";
import { MessageFromUs } from "components/MessageFromUs.jsx";
import { GridRow, Column } from "components/Layout.jsx";

import page from "page";
import React from "react";
import Select from "react-select";

@connect(
    state => (
        {
            allModules: Object.keys(state.module.items).map( id => state.module.items[id].data ),
            modules: state.module.items,
            projectData: state.project.items,
            topics: state.topic.items
        }
    )
)
@data(

    props => [
        fetchModules(),
        fetchNextModules(props.project),
        fetchTopics(),
        fetchProjects()
    ]
)
export class ModuleBrowserPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {};

        this.loadData(props)
            .then( () => this.setState({ready: true}) );
    }

    onSelectLiked(topic) {

    }

    onSelectDisliked(topic) {

    }

    onChange(value) {
        page(`/project/${this.props.project}/${value}`);
    }

    render() {

        if (!this.state.ready) return null;

        return (
            <div className="main-content">

                <h3>Project: {this.props.projectData[this.props.project].data.title}</h3>
                <h2>What would you like to learn next?</h2>
                <MessageFromUs>These are the concepts that I think you might want to learn next, these recommendations change over time based on what you choose to learn.</MessageFromUs>

                <GridRow sizes={{xs: 6, sm: 4, md: 3}}>
                    {
                        this.props.projectData[this.props.project].nextModules.map( module => {
                            return <Module module={module} project={this.props.project} topics={module.topics.map( id => this.props.topics[id])} />;
                        })
                    }
                </GridRow>

                <br />
                <h3>Searching for something in particular?</h3>
                <p>If you'd like to learn about one particular concept, then you can search the entire catalogue below.</p>
                <Select options={this.props.allModules.map( module => { return {value: module.id, label: module.title}; } )} onChange={this.onChange.bind(this)} />

                <h3>Concepts You've Learned Already</h3>
                <GridRow sizes={{xs: 6, sm: 4, md: 3}}>
                    {
                        this.props.projectData[this.props.project].data.completed_modules.map( id => {
                            var module = this.props.modules[id].data;
                            return <Module module={module} project={this.props.project} topics={module.topics.map( id => this.props.topics[id])} />;
                        })
                    }
                </GridRow>

            </div>
        );
    }
}
