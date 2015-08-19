var React = require("react");

import {Util} from 'Util.jsx';
import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import {ImageContent} from 'components/editing/ImageContent.jsx';
import {Sortable} from 'components/Sortable.jsx';
import {FloatingButton} from 'components/FloatingButton.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
import {Module} from 'components/Module.jsx';
import {TopicPill} from 'components/TopicPill.jsx';
import {Mixin} from 'Mixin';
import {Print} from 'mixins/Print';
import {Store} from 'mixins/Store';
import {LearningGraph} from 'components/LearningGraph.jsx';

import API from "API";

import { apply } from "react-es7-mixin";
import data from "mixins/data";
import { fetchProject, updateMetadata, fetchNextModules } from "actions/Project";
import { fetchModule } from "actions/Module";

/**
 * TODO: rewrite this file using redux
 *
 * We want a global store of projects, modules, next_modules, metadata etc indexed by sane ids
 *
 * This data needs to be fetched before render ideally? Perhaps a system where pages declare their data requirements?
 *
 * Basically my own GraphQL rip off listing what actions need to be run to fetch data
 *
 * initialLoad => [
 *     {"action": "LOAD_PROJECT", "id": <id>},
 *     {"action": "LOAD_METADATA", "id": <id>}
 * ]
 *
 * How do we support dynamic data though?
 *
 *
 * The components need to stop caring about $oid shit basically and need to stop storing data internally
 * The editor is probably too far gone on that front, but we can do better here
 *
 *
 *
 *
 */

@data( (props) => {

    fetchProject(props.project);
    fetchModule(props.module);
    fetchNextModules(props.project, props.module);

} )
export class ViewModulePage extends React.Component {
    constructor(props) {
        super(props);
        this.loadData(props);

        this.state = {
            topic_entities: []
        };


        Mixin.apply(this, Store, {stores: ["module", "topic", "project"]});
    }

    //TODO, remove old style from here

    onModuleClick(next) {
        if (this.props.project) {
            this.stores.module.finishedModule(this.props.project, this.props.module);
        }

        API.transition(this.props.module, next["_id"]["$oid"]);
    }

    componentDidMount() {

        if (this.props.module) {
            this.stores.module.get(this.props.module, this.fetchedData.bind(this));
        }
    }

    fetchedData(data) {
        console.log(data);

        this.stores.topic.getList(data.learning_module.topic_ids.map(topic_id => topic_id["$oid"]), (topics) => {
            this.setState({
                topic_entities: topics
            });
        });
    }

    finish() {
        this.stores.module.markComplete(this.props.project, this.props.module);
    }


    isEditable() {
        return false;
    }

    // Antipattern yo
    getMetadata() {
        return this.props.store.getState().project[this.props.project].metadata;
    }

    getNextModules() {
        return this.props.store.getState().project[this.props.project].nextModules;
    }

    getContents() {
        return this.props.store.getState().module[this.props.module].contents;
    }

    getModule() {
        return this.props.store.getState().module[this.props.module].data;
    }

    metadataChange(content) {
        try {
            var metadata = JSON.parse(content);

            this.props.store.dispatch(updateMetadata(this.props.project, metadata));
        } catch(err) {
            console.log("invalid metadata");
        }

    }



    render() {


        var content_type_lookup = {
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
                        this.state.topic_entities.map(topic => {
                            return <TopicPill topic={topic} />;
                        })
                    }
                    {/*<div className="box">
                        <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
                    </div>*/}
                    {
                        this.getContents().map(block => {
                            console.log("render", block);
                            return content_type_lookup[block.type](block)
                        })
                    }
                </div>
                <h2>What's Next?</h2>
                <div className="row">
                    {
                        this.getNextModules().map(module => {
                            return <div className="col-xs-4"><Module module={module} onClick={this.onModuleClick.bind(this, module)} /></div>;
                        })
                    }
                </div>
                <LearningGraph module={this.props.module} project={this.props.project} />
            </div>
        );
    }
}
