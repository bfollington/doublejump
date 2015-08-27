import React from "react";
import page from "page";

export class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onClick() {
        page(`/concepts/project/${this.props.project.slug}`)
    }

    render() {

        return (
            <div className="Project">
                <div className="inner" onClick={this.onClick.bind(this)}>
                    <h3>{this.props.project.title}</h3>
                    <p>Learned {this.props.project.learning_module_ids.length} concepts so far!</p>
                </div>
            </div>
        );
    }
}
