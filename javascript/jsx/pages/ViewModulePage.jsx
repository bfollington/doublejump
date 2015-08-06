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

import API from "API";

var React = require("react");

var page = require("page");

export class ViewModulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: [],
            metadata: {},
            topics: [],
            topic_entities: [],
            title: "",
            slug: "",
            nextModules: []
        };

        Mixin.apply(this, Store, {stores: ["module", "topic", "project"]});
    }

    onChange(data) {
        this.stores.module.get(this.props.module, this.fetchedData.bind(this));
    }

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

        if (this.props.project) {

            this.stores.project.setCurrentProject(this.props.project);

            this.stores.project.getMetadata(this.props.project, (data) => {
                this.setState({metadata: data});
            });

            this.stores.project.getNextModules(this.props.project, this.props.module, this.fetchedNextModules.bind(this));
        }
    }

    fetchedNextModules(data) {
        console.log(data, typeof data);

        this.setState({
            nextModules: data
        });
    }

    fetchedData(data) {
        console.log(data);

        data.contents.forEach(content => {
            Util.transformMongoId(content);
        });

        this.setState({
            title: data.learning_module.title,
            slug: data.learning_module.slug,
            contents: data.contents,
            topics: data.learning_module.topic_ids.map(id => id.$oid)
        });

        this.stores.topic.getList(data.learning_module.topic_ids.map(topic_id => topic_id["$oid"]), (topics) => {
            this.setState({
                topic_entities: topics
            });
        });
    }

    isEditable() {
        return false;
    }

    getMetadata() {
        return this.state.metadata;
    }

    metadataChange(content) {
        try {
            var metadata = JSON.parse(content);

            this.setState({metadata: metadata});
            console.log("Updated metadata", content, metadata);
        } catch(err) {

        }

    }

    finish() {
        this.stores.module.markComplete(this.props.project, this.props.module);
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
                    <h2>{this.state.title}</h2>
                    {
                        this.state.topic_entities.map(topic => {
                            return <TopicPill topic={topic} />;
                        })
                    }
                    {/*<div className="box">
                        <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
                    </div>*/}
                    {
                        this.state.contents.map(block => {
                            console.log("render", block);
                            return content_type_lookup[block.type](block)
                        })
                    }
                </div>
                <h2>What's Next?</h2>
                <div className="row">
                    {
                        this.state.nextModules.map(module => {
                            return <div className="col-xs-4"><Module module={module} onClick={this.onModuleClick.bind(this, module)} /></div>;
                        })
                    }
                </div>
            </div>
        );
    }
}
