import data from "mixins/data";
import connect from "mixins/connect";
import { fetchProjects } from "actions/Project";

import { Project } from "components/Project.jsx";
import { MessageFromUs } from "components/MessageFromUs.jsx";
import { Button } from "components/input/Input.jsx";
import { GridRow, Column, Row } from "components/Layout.jsx";

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
        page(`/concepts/`);
    }

    render() {

        if (!this.state.ready) return null;

        var currentProject = this.props.projects[this.props.currentAccount.current_project_id.$oid];
        var otherProjects = [];

        for (var project in this.props.projects) {
            if (project !== this.props.currentAccount.current_project_id.$oid) {
                otherProjects.push(project);
            }
        }

        return (
            <div className="main-content">

                <div className="float-right">
                    <Button text="Create New Project" onClick={this.onNewProject.bind(this)} />
                </div>

                <h2>Current Project</h2>
                <MessageFromUs>This is what you were last working on, want to pick up from here?</MessageFromUs>
                <Row sizes={{xs: 4}}>
                    <Column sizes={{xs: 4}}>
                        <Project project={currentProject} />
                    </Column>
                </Row>

                <h2>Other Projects</h2>
                <GridRow sizes={{xs: 4}}>
                    {
                        otherProjects.map( project => {
                            return <Project project={this.props.projects[project]} />;
                        })
                    }
                </GridRow>

            </div>
        );
    }
}
