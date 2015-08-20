var React = require("react");

import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import {ImageContent} from 'components/editing/ImageContent.jsx';

import {AceEditor} from 'components/AceEditor.jsx';

import {Module} from 'components/Module.jsx';
import {TopicPill} from 'components/TopicPill.jsx';

import {LearningGraph} from 'components/LearningGraph.jsx';

import API from "API";
import { read } from "Util.jsx";

import { apply } from "react-es7-mixin";
import data from "mixins/data";
import connect from "mixins/connect";
import { fetchProject, updateMetadata, fetchNextModules } from "actions/Project";
import { fetchModule } from "actions/Module";
import { fetchTopics } from "actions/Topic";


@connect(
    state => (
        {
            modules: state.module,
            projects: state.project,
            topics: state.topic.items
        }
    ),
    dispatch => (
        {
            onUpdateMetadata: (project, metadata) => dispatch(updateMetadata(project, metadata))
        }
    )
)
@data(

    props => [
        fetchProject(props.project),
        fetchModule(props.module),
        fetchTopics(),
        fetchNextModules(props.project, props.module)
    ]
)
export class ViewModulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.loadData(props)
            .then( () => this.setState({ready: true}) );
    }

    //TODO, remove old style from here

    onModuleClick(next) {
        API.finishedModule(this.props.project, this.props.module);
        API.transition(this.props.module, next._id.$oid);
    }

    componentDidMount() {

    }



    isEditable() {
        return false;
    }

    // Antipattern yo
    getMetadata() {
        return this.props.projects[this.props.project].metadata;
    }

    getNextModules() {
        return this.props.projects[this.props.project].nextModules;
    }

    getContents() {
        return this.props.modules[this.props.module].contents;
    }

    getModule() {
        return this.props.modules[this.props.module].data;
    }

    getTopics() {
        return this.props.modules[this.props.module].topics.map( id => this.props.topics[id] );
    }

    metadataChange(content) {
        try {
            var metadata = JSON.parse(content);

            this.props.onUpdateMetadata(this.props.project, metadata);
        } catch(err) {
            console.log("invalid metadata");
        }

    }

    render() {

        if (!this.state.ready) return null;

        var contentTypeLookup = {
            "MarkdownContent": ctx => <MarkdownContent comments={ctx.comments} module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "CodeContent": ctx => <CodeContent comments={ctx.comments} module={this.props.module} id={ctx.id} value={ctx.body} language={ctx.language} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "MathContent": ctx => <MathContent comments={ctx.comments} module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "ImageContent": ctx => <ImageContent comments={ctx.comments} module={this.props.module} id={ctx.id} value="" editable={this.isEditable} metadata={this.getMetadata.bind(this)} />
        };

        return (
            <div className="main-content">
                <div className="">
                    <h2>{this.getModule().title}</h2>
                    {
                        this.getTopics().map(topic => {
                            return <TopicPill topic={topic} />;
                        })
                    }
                    {/*<div className="box">
                        <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
                    </div>*/}
                    {
                        this.getContents().map(block => {
                            return contentTypeLookup[block.type](block);
                        })
                    }
                </div>
                <h2>What's Next?</h2>
                <div className="row">
                    {
                        this.getNextModules().map(module => {
                            return <div className="col-xs-4"><Module module={module} project={this.props.project} topics={module.topic_ids.map( id => this.props.topics[id.$oid])} onClick={this.onModuleClick.bind(this, module)} /></div>;
                        })
                    }
                </div>
                <LearningGraph module={this.props.module} project={this.props.project} />
            </div>
        );
    }
}
