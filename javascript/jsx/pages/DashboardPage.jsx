import data from "mixins/data";
import connect from "mixins/connect";
import { fetchProjects } from "actions/Project";

import { Project } from "components/Project.jsx";
import { MessageFromUs } from "components/MessageFromUs.jsx";
import { Button } from "components/input/Input.jsx";
import { GridRow, Column, Row } from "components/Layout.jsx";

import {Condition, Case} from "react-case";

import page from "page";
import React from "react";
import Select from "react-select";

@connect(
    state => (
        {
            projects: state.project.items,
            currentAccount: state.account.currentAccount.data
        }
    )
)
@data(

    props => [
        fetchProjects()
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

    onNewProject() {
        page(`/`);
    }

    onCreateModule() {
        page(`/edit`);
    }

    render() {

        if (!this.state.ready) return null;

        var currentProject = this.props.currentAccount.current_project ? this.props.projects[this.props.currentAccount.current_project.slug].data : null;
        var otherProjects = [];

        for (var project in this.props.projects) {
            if (project !== this.props.currentAccount.current_project.slug) {
                otherProjects.push(project);
            }
        }

        return (
            <div className="main-content">

                <Case test={Object.keys(this.props.projects).length > 0}>
                    <div className="float-right">
                        <Button text="Create New Project" onClick={this.onNewProject.bind(this)} />
                    </div>
                </Case>


                <Case test={this.props.currentAccount.role === "admin"}>
                    <Button text="Create New Module" onClick={this.onCreateModule.bind(this)} />
                </Case>

                <Case test={currentProject}>
                    <h2>Current Project</h2>
                    <MessageFromUs>This is what you were last working on, want to pick up from here?</MessageFromUs>
                    <Row sizes={{xs: 4}}>
                        <Column sizes={{xs: 4}}>
                            <Project project={currentProject} />
                        </Column>
                    </Row>
                </Case>

                <Condition>
                    <Case test={otherProjects.length > 0}>
                        <h2>Other Projects</h2>
                        <GridRow sizes={{xs: 4}}>
                            {
                                otherProjects.map( project => {
                                    return <Project project={this.props.projects[project].data} />;
                                })
                            }
                        </GridRow>
                    </Case>
                    <Case test={Object.keys(this.props.projects).length === 0}>
                        <h2>Dashboard</h2>
                        <p className="text-center">You don't have any projects yet!</p>
                        <p className="text-center"> Why not <Button text="create a new one" onClick={this.onNewProject.bind(this)} />?</p>
                    </Case>
                </Condition>

            </div>
        );
    }
}
