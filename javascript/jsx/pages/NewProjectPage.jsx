import data from "mixins/data";
import connect from "mixins/connect";
//import { addProject } from "actions/Project";
import { fetchTopics } from "actions/Topic";

import { TopicPill } from "components/TopicPill.jsx";

import React from "react";
import page from "page";

import API from "API";
import { Input, Button } from "components/input/Input.jsx";
import {Slug} from 'Slug.js';

@connect(
    state => (
        {
            topics: Object.keys(state.topic.items).map( id => state.topic.items[id] )
        }
    )
)
@data(

    props => [
        fetchTopics()
    ]
)
export class NewProjectPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            likedTopics: [],
            comfortableTopics: []
        };

        this.loadData(props)
            .then( () => this.setState({ready: true}) );
    }

    handleTopicSelection(stateKey, topic) {
        if (this.state[stateKey].indexOf(topic) >= 0) {
            var temp = this.state[stateKey];

            temp.splice(this.state[stateKey].indexOf(topic), 1);
            this.setState({
                [stateKey]: temp
            });

            return false;
        }

        if (this.state[stateKey].length >= 3) {
            return false;
        } else {
            var temp = this.state[stateKey];
            temp.push(topic);

            this.setState({
                [stateKey]: temp
            });
            return true;
        }
    }

    onSelectLiked(topic) {

        return this.handleTopicSelection("likedTopics", topic);
    }

    onSelectComfortable(topic) {
        return this.handleTopicSelection("comfortableTopics", topic);
    }

    onNewProject() {
        console.log(this.refs.test.val());

        API.startProject(this.refs.test.val(), Slug.convertToSlug(this.refs.test.val()),
            response => {
                page(`/concepts/dashboard`);
            }
        );
    }

    render() {

        if (!this.state.ready) return null;

        return (
            <div className="box">
                <h2>Start a New Project</h2>

                <Input ref="test" name="title" label="Project Name">
                    Give this project a name, it could be for something you're working on or just a description of what you want to learn.
                </Input>

                <p>Before we get started, we need to find out some information about this project.</p>

                <h3>Select 3 Topics You Would Like To Learn</h3>

                <p>These are the topics you think this project should teach you or you would like to learn.</p>

                {
                    this.props.topics.map( topic => {
                        return <TopicPill big topic={topic} selectable onSelect={this.onSelectLiked.bind(this)} />;
                    })
                }


                <h3>Select 3 Topics You Are Already Comfortable With</h3>

                <p>These are topics have some experience with already.</p>

                {
                    this.props.topics.map( topic => {
                        return <TopicPill big topic={topic} selectable onSelect={this.onSelectComfortable.bind(this)} />;
                    })
                }

                <div className="text-center">
                    <br />
                    <Button text="Start Project" onClick={this.onNewProject.bind(this)} />
                </div>
            </div>
        );
    }
}
