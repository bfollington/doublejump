var React = require("react");

import API from "API";
import { read } from "Util.jsx";
import page from "page";
import {Condition, Case} from "react-case";
import { apply } from "react-es7-mixin";
import {toggle} from "react-operators";

import { fetchContents } from "actions/Content";
import { fetchModule } from "actions/Module";
import { fetchProject, updateMetadata, fetchNextModules } from "actions/Project";
import { fetchTopics } from "actions/Topic";

import {AceEditor} from 'components/AceEditor.jsx';
import {ExternalContent} from 'components/ExternalContent.jsx';
import {FinishedModule} from "components/FinishedModule.jsx";
import {Icon} from "components/Icon.jsx";
import { GridRow } from "components/Layout.jsx";
import {LearningGraph} from 'components/LearningGraph.jsx';
import {MessageFromUs} from 'components/MessageFromUs.jsx';
import {Module} from 'components/Module.jsx';
import {TopicPill} from 'components/TopicPill.jsx';

import {CodeContent} from 'components/editing/CodeContent.jsx';
import {ImageContent} from 'components/editing/ImageContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';

import {Button} from 'components/input/Input.jsx';

import connect from "mixins/connect";
import data from "mixins/data";

@connect(
    state => (
        {
            modules: state.module.items,
            projects: state.project.items,
            contents: state.content.items,
            topics: state.topic.items,
            account: state.account.currentAccount.data
        }
    ),
    dispatch => (
        {
            onUpdateMetadata: (project, metadata) => dispatch(updateMetadata(project, metadata)),
            onRefreshRecommendations: (project, module) => dispatch(fetchNextModules(project, module))
        }
    )
)
@data(

    props => [
        fetchProject(props.project),
        fetchModule(props.module),
        fetchTopics(),
        fetchNextModules(props.project, props.module),
        fetchContents(props.module)
    ]
)
export class ViewModulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            done: false,
            showGraph: false
        };

        this.loadData(props)
            .then( () => this.setState({ready: true}) );
    }

    //TODO, remove old style from here

    componentDidMount() {

    }


    onToggleGraph() {
        this.setState({
            showGraph: !this.state.showGraph
        });
    }


    isEditable() {
        return false;
    }

    // Antipattern yo
    getMetadata() {
        return this.props.projects[this.props.project].data.metadata;
    }

    getNextModules() {
        return this.props.projects[this.props.project].nextModules;
    }

    getContents() {
        return this.props.modules[this.props.module].data.contents.map( id => this.props.contents[id].data );
    }

    getModule() {
        return this.props.modules[this.props.module].data;
    }

    getTopics() {
        return this.props.modules[this.props.module].data.topics.map( id => this.props.topics[id] );
    }

    metadataChange(content) {
        try {
            var metadata = JSON.parse(content);

            this.props.onUpdateMetadata(this.props.project, metadata);
        } catch(err) {
            console.log("invalid metadata");
        }

    }

    onFinishConcept() {
        API.finishedModule(this.props.project, this.props.module, () => {
            this.setState({
                done: true
            });

            this.props.onRefreshRecommendations(this.props.project, this.props.module);
        });
    }

    onEditModule() {
        page(`/edit/${this.props.module}`);
    }

    render() {

        if (!this.state.ready) return null;

        var contentTypeLookup = {
            "MarkdownContent": ctx => <MarkdownContent comments={ctx.comments} module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "CodeContent": ctx => <CodeContent comments={ctx.comments} module={this.props.module} id={ctx.id} value={ctx.body} language={ctx.language} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "MathContent": ctx => <MathContent comments={ctx.comments} module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "ImageContent": ctx => <ImageContent comments={ctx.comments} module={this.props.module} id={ctx.id} value={ctx.src} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />
        };

        return (
            <div className="main-content">
                <div className="view-module-page">
                    <div className="title-area">
                        <h2>
                            {this.getModule().title}
                        </h2>
                        <Case test={this.props.account.role === "admin"}>
                            <Button text="Edit Module" onClick={this.onEditModule.bind(this)} />
                        </Case>
                        <h3 className="author">Ben Follington</h3>
                        {
                            this.getTopics().map(topic => {
                                return <TopicPill topic={topic} />;
                            })
                        }

                        {
                            () => {
                                console.log(this.getModule().external, this.getModule().url);
                                if (!this.getModule().external && this.getModule().url) {
                                    return <small><p>Adapted from content hosted at <a href={this.getModule().url}>{this.getModule().url.trunc(100)}</a></p></small>;
                                }
                            }()
                        }
                    </div>

                    {/*<div className="box">
                        <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
                    </div>*/}

                    <Condition>
                        <Case test={!this.getModule().external}>
                            {
                                this.getContents().map(block => {
                                    return contentTypeLookup[block.type](block);
                                })
                            }
                        </Case>
                        <Case default>
                            <ExternalContent module={this.getModule()} />
                        </Case>
                    </Condition>
                </div>

                <Condition>
                    <Case test={!this.state.done}>
                        <div className="text-center">
                            <Button text="I'm Finished!" onClick={this.onFinishConcept.bind(this)}></Button>
                        </div>
                    </Case>
                    <Case default>
                        <FinishedModule topics={this.props.topics} currentModule={this.getModule()} nextModules={this.getNextModules()} project={this.props.project} />
                    </Case>
                </Condition>

                <p className="align-right">
                    <Button tooltip="Want to see something cool?" onClick={toggle.bind(this, "showGraph")}>
                        <Icon icon="bar-chart-o" size="14px"/>
                    </Button>
                </p>

                <Case test={this.state.showGraph}>
                    <LearningGraph module={this.props.module} project={this.props.project} />
                </Case>
            </div>
        );
    }
}
