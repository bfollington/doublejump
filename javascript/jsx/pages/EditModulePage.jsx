import { getCSRFFormField, transformMongoId } from 'Util.jsx';
import {Events, SaveModuleFormEvent, ContentTypeSubmissionSuccessEvent} from 'Events.jsx';
import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import {ImageContent} from 'components/editing/ImageContent.jsx';
import {Sortable} from 'components/Sortable.jsx';
import {FloatingToolbar} from 'components/FloatingToolbar.jsx';
import {FloatingButton} from 'components/FloatingButton.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
import {Mixin} from 'Mixin';
import {Print} from 'mixins/Print';
import {Store} from 'mixins/Store';
import {Slug} from 'Slug.js';

var Select = require('react-select');
var React = require("react");

var page = require("page");

import { apply } from "react-es7-mixin";
import data from "mixins/data";
import query from "mixins/query";
import connect from "mixins/connect";
import mapping from "mixins/mapping";
import { fetchModule, saveModule } from "actions/Module";
import { getNotification } from "actions/Notification";
import { fetchContents } from "actions/Content";
import { fetchTopics } from "actions/Topic";

import clone from "reducers/Util.js";

@connect(
    state => (
        {
            modules: state.module.items,
            contents: state.content.items,
            topics: Object.keys(state.topic.items).map( topic => ({value: topic, label: state.topic.items[topic].name}) )
        }
    ),
    dispatch => (
        {
            sendNotification: (data) => dispatch(getNotification(data))
        }
    )
)
@data(

    props => [
        props.module ? fetchModule(props.module) : () => {},
        props.module ? fetchContents(props.module) : () => {},
        fetchTopics()
    ]
)
@mapping({
    "currentModule": (props, state) => props.modules[props.module].data
})
export class EditModulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentBlocks: [],
            title: this.props.title,
            slug: this.props.slug,
            url: this.props.url,
            ready: false,
            selectedTopics: []
        };

        window.sendNotification = this.props.sendNotification;


        Mixin.apply(this, Store, {stores: ["module", "topic"]});

        var contentTypeLookup = {
            "MarkdownContent": ctx => <MarkdownContent module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "CodeContent": ctx => <CodeContent module={this.props.module} id={ctx.id} value={ctx.body} language={ctx.language} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "MathContent": ctx => <MathContent module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "ImageContent": ctx => <ImageContent module={this.props.module} id={ctx.id} value="" editable={this.isEditable} metadata={this.getMetadata.bind(this)} />
        };

        this.loadData(props)
            .then( () => this.setState({
                ready: true,
                selectedTopics: this.props.module ? this.$currentModule().topics : [],
                title: this.$currentModule().title,
                slug: this.$currentModule().slug,
                contentBlocks: this.$currentModule().contents.map(id => {
                    return contentTypeLookup[this.getContent(id).type](this.getContent(id));
                })
            }) );

        this.submitCount = 0;
    }

    getContent(id) {
        return this.props.contents[id].data;
    }

    titleUpdate(e) {
        this.setState({title: e.target.value});
        this.setState({slug: Slug.convertToSlug(e.target.value)});
    }

    slugUpdate(e) {
        this.setState({slug: e.target.value});
    }

    urlUpdate(e) {
        this.setState({url: e.target.value});
    }

    onTopicChange(latest, list) {
        console.log(this);
        this.setState({selectedTopics: list});
    }




    componentDidMount() {

        console.log("Hello from component");

        Events.subscribeRoot( ContentTypeSubmissionSuccessEvent, this.contentTypeDidSave.bind(this) );
    }


    componentDidUnmount() {
        Events.unsubscribeRoot( ContentTypeSubmissionSuccessEvent, this.contentTypeDidSave.bind(this) );
    }

    contentTypeDidSave() {
        this.submitCount++;

        if (this.submitCount == this.state.contentBlocks.length) {
            console.log("All saved correctly", this.state.contentBlocks.length);
            this.allContentTypesDidSave();
        }
    }

    allContentTypesDidSave() {
        var contents = [];

        $(React.findDOMNode(this)).find("[data-id]").each( function() {
            contents.push($(this).attr("data-id"));
        });

        var topics = this.state.selectedTopics.map(topic => {
            return topic.value;
        });

        var id = "";
        if (this.props.module !== undefined) {
            id = this.props.module;
        }

        var module = clone(this.query("module").data, {
            contents: contents,
            title: this.state.title,
            slug: this.state.slug,
            topics: topics
        });

        saveModule(module)
            .then( data => {
                console.log("Response", data);
            });
    }

    moduleSaveRepsonse(data) {
        console.log("module response", data);

        if (data.success) {
            page(`/concepts/edit/${data.learning_module["_id"]["$oid"]}`);
        }
    }







    newSection(provider) {
        var blocks = this.state.contentBlocks;
        blocks.push(provider());

        this.setState({contentBlocks: blocks});
    }

    newMarkdownSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <MarkdownContent id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)}/>;
    }

    newCodeSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <CodeContent id={ctx.id} value={ctx.body} language={ctx.language} editable={this.isEditable} />;
    }

    newMathSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <MathContent id={ctx.id} value={ctx.body} editable={this.isEditable} />;
    }

    newImageSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <ImageContent id={ctx.id} value="" editable={this.isEditable} />;
    }






    save(e) {
        if (this.state.contentBlocks.length > 0) {
            Events.emitRoot(SaveModuleFormEvent, this);
        } else {
            this.allContentTypesDidSave();
        }


        this.submitCount = 0;
    }






    isEditable() {
        return true;
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





    render() {

        return (
            <div className="main-content">
                <div className="create-step-form">

                    <div className="box">
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Edit Concept</h2>
                                <form action="/concepts/make/" acceptCharset="UTF-8" id="addStepForm" method="post">
                                    { getCSRFFormField() }
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p>
                                                <label htmlFor="learning_module_title">Concept Title</label>
                                                <input onChange={this.titleUpdate.bind(this)} value={this.state.title} type="text" name="learning_module[title]" id="learning_module_title" className="form-control" />
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p>
                                                <label htmlFor="learning_module_slug">Concept Slug (For URL)</label>
                                                <input onChange={this.slugUpdate.bind(this)} value={this.state.slug} type="text" name="learning_module[slug]" id="learning_module_slug" className="form-control" />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p>
                                                <label htmlFor="learning_module_url">External URL (Optional)</label>
                                                <input onChange={this.urlUpdate.bind(this)} value={this.state.url} type="text" name="learning_module[url]" id="learning_module_url" className="form-control" />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <Select
                                            name="form-field-name"
                                            options={this.props.topics}
                                            value={this.state.selectedTopics}
                                            onChange={this.onTopicChange.bind(this)}
                                            multi={true}
                                        />
                                    </div>
                                    <div className="content-ids"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
                    </div>
                    <Sortable>
                        {
                            this.state.contentBlocks.map(block => {
                                console.log(block);
                                return block;
                            })
                        }
                    </Sortable>
                    <FloatingToolbar>
                        <FloatingButton icon="file-text" onClick={this.newSection.bind(this, this.newMarkdownSection.bind(this))}>Add New Markdown Content</FloatingButton>
                        <FloatingButton icon="code" onClick={this.newSection.bind(this, this.newCodeSection.bind(this))}>Add Code Snippet</FloatingButton>
                        <FloatingButton icon="plus" onClick={this.newSection.bind(this, this.newMathSection.bind(this))}>Add Math Content</FloatingButton>
                        <FloatingButton icon="picture-o" onClick={this.newSection.bind(this, this.newImageSection.bind(this))}>Add Image</FloatingButton>
                        <FloatingButton icon="save" size="big" onClick={this.save.bind(this)}>Save Concept</FloatingButton>
                    </FloatingToolbar>
                </div>
            </div>
        );
    }
}

EditModulePage.defaultProps = {

}
