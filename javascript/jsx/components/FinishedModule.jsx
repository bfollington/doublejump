import React from "react";

import { MessageFromUs } from "components/MessageFromUs.jsx";
import { Module } from "components/Module.jsx";

import { GridRow } from "components/Layout.jsx";

import { TopicPill } from "components/TopicPill.jsx";

import { Button } from "components/input/Input.jsx";

import API from "API";

export class FinishedModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTopic: false,
            hasRatedDifficulty: false
        };
    }

    onModuleClick(next) {
        API.transition(this.props.module, next.id);
    }

    onDifficulty(challenge) {
        if (!this.state.hasRatedDifficulty) {
            this.setState({
                hasRatedDifficulty: true
            });

            API.moduleDifficulty(this.props.currentModule.id, challenge);
        }
    }

    onTopicClick(topic) {
        if (!this.state.selectedTopic) {
            this.setState({
                selectedTopic: true
            });

            API.mostAppropriateTopic(this.props.currentModule.id, topic);
        }
    }

    render() {
        return (
            <div className="FinishedModule fade-in">
                <MessageFromUs>Great work! What did you think about this concept?</MessageFromUs>

                <GridRow sizes={{xs: 6}}>
                    <div>
                        <label>What topic did you think this lesson was most relevant to?</label>
                        <ul>
                            {
                                this.props.currentModule.topics.map( id => <Button disabled={this.state.selectedTopic} onClick={this.onTopicClick.bind(this, id)} text={this.props.topics[id].name} /> )
                            }
                        </ul>
                    </div>
                    <div>
                        <label>How challenging did you think this lesson was?</label>
                        <ul>
                            <Button disabled={this.state.hasRatedDifficulty} text="Easy" onClick={this.onDifficulty.bind(this, 0)} />
                            <Button disabled={this.state.hasRatedDifficulty} text="Average" onClick={this.onDifficulty.bind(this, 1)} />
                            <Button disabled={this.state.hasRatedDifficulty} text="Difficult" onClick={this.onDifficulty.bind(this, 2)} />
                        </ul>
                    </div>
                </GridRow>



                <br />
                <br />

                <MessageFromUs>Here's what I think you should try next.</MessageFromUs>
                <GridRow sizes={{xs: 6, sm: 4, md: 3}}>
                    {
                        this.props.nextModules.map(module => {
                            return <Module
                                module={module}
                                project={this.props.project}
                                topics={module.topics.map( id => this.props.topics[id])}
                                onClick={this.onModuleClick.bind(this, module)}
                            />;
                        })
                    }
                </GridRow>
            </div>
        );
    }
}
