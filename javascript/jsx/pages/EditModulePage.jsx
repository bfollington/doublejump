import { getCSRFFormField, transformMongoId } from 'Util.jsx';
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

import {GridRow, Row, Column} from "components/Layout.jsx";

var Select = require('react-select');
var React = require("react");

var page = require("page");

import { apply } from "react-es7-mixin";
import data from "mixins/data";
import connect from "mixins/connect";
import mapping from "mixins/mapping";
import { fetchModules, saveModule } from "actions/Module";
import { getNotification } from "actions/Notification";
import { fetchContents } from "actions/Content";
import { fetchTopics } from "actions/Topic";

import clone from "reducers/Util.js";

@connect(
    state => (
        {
            modules: state.module.items,
            contents: state.content.items,
            topics: Object.keys(state.topic.items).map( topic => ({value: topic, label: state.topic.items[topic].name}) ),
            topicLookup: state.topic.items
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
        fetchModules(),
        props.module ? fetchContents(props.module) : () => {},
        fetchTopics()
    ]
)
@mapping({
    "currentModule": (props, state) => props.module ? props.modules[props.module].data : {}
})
export class EditModulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentBlocks: [],
            title: this.props.title,
            slug: this.props.slug,
            url: this.props.url,
            external: this.props.external,
            ready: false,
            selectedTopics: [],
            selectedModules: [],
            numberOfSavingModules: 0
        };

        Mixin.apply(this, Store, {stores: ["module", "topic"]});

        var contentTypeLookup = {
            "MarkdownContent": ctx => <MarkdownContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "CodeContent": ctx => <CodeContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} module={this.props.module} id={ctx.id} value={ctx.body} language={ctx.language} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "MathContent": ctx => <MathContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} module={this.props.module} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "ImageContent": ctx => <ImageContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} module={this.props.module} id={ctx.id} value={ctx.src} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />
        };


        this.loadData(props)
            .then( () => {

                if (this.props.module) {
                    this.setState({
                        ready: true,
                        selectedTopics: this.props.module ? this.$currentModule().topics.map( topic => ({label: this.props.topicLookup[topic].name, value: topic}) ) : [],
                        selectedModules: this.props.module ? this.$currentModule().prereqs.map( prereq => ({label: this.props.modules[prereq].data.title, value: prereq}) ) : [],
                        title: this.$currentModule().title,
                        slug: this.$currentModule().slug,
                        url: this.$currentModule().url,
                        external: this.$currentModule().external,
                        contentBlocks: this.$currentModule().contents.map(id => {
                            return contentTypeLookup[this.getContent(id).type](this.getContent(id));
                        })
                    });
                } else {
                    this.setState({ready: true});
                }

            }
        );

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

    externalUpdate(e) {
        this.setState({external: e.target.checked});
    }

    onTopicChange(latest, list) {
        console.log(this);
        this.setState({selectedTopics: list});
    }

    onModuleChange(latest, list) {
        console.log(this);
        this.setState({selectedModules: list});
    }

    onModuleSave(module) {
        this.setState({
            numberOfSavingModules: this.state.numberOfSavingModules + 1
        });

        console.log("num saving", this.state.numberOfSavingModules);
    }

    onModuleFinishedSaving(module) {
        this.setState({
            numberOfSavingModules: this.state.numberOfSavingModules - 1
        });

        console.log("num saving", this.state.numberOfSavingModules);
    }

    allContentTypesDidSave() {
        var contents = [];

        $(React.findDOMNode(this)).find("[data-id]").each( function() {
            contents.push($(this).attr("data-id"));
        });

        var id = "";
        if (this.props.module !== undefined) {
            id = this.props.module;
        }

        var module = clone(this.$currentModule(), {
            contents: contents,
            title: this.state.title,
            slug: this.state.slug,
            url: this.state.url,
            external: this.state.external,
            topics: this.state.selectedTopics.map( topic => topic.value ),
            prereqs: this.state.selectedModules.map(mod => mod.value)
        });

        saveModule(module)
            .then( data => {
                this.props.sendNotification("Module Saved!");
                setTimeout( () => page(`/concepts/edit/${data.id}`), 1000 );
            });
    }

    moduleSaveRepsonse(data) {
        if (data.success) {
            page(`/concepts/edit/${data.learning_module["_id"]["$oid"]}`);
        }
    }





    onDelete(block) {
        if (confirm("Delete content block?")) {
            var blocks = this.state.contentBlocks.slice();
            blocks.splice(blocks.indexOf(block), 1);

            this.setState({contentBlocks: blocks});
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

        return <MarkdownContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)}/>;
    }

    newCodeSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <CodeContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} id={ctx.id} value={ctx.body} language={ctx.language} editable={this.isEditable} />;
    }

    newMathSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <MathContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} id={ctx.id} value={ctx.body} editable={this.isEditable} />;
    }

    newImageSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <ImageContent onSave={this.onModuleSave.bind(this)} onSaveComplete={this.onModuleFinishedSaving.bind(this)} onDelete={this.onDelete.bind(this)} id={ctx.id} value="" editable={this.isEditable} />;
    }


    areModulesSaving() {
        return this.state.numberOfSavingModules != 0;
    }



    save(e) {
        // if (this.state.contentBlocks.length > 0) {
        //     Events.emitRoot(SaveModuleFormEvent, this);
        // } else {
        //     this.allContentTypesDidSave();
        // }

        if (this.areModulesSaving()) {
            setTimeout(this.save.bind(this), 100);
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
                                    <Row>
                                        <Column sizes={{xs: 8}}>
                                            <p>
                                                <label htmlFor="learning_module_url">Reference URL (Optional)</label>
                                                <input onChange={this.urlUpdate.bind(this)} value={this.state.url} type="text" name="learning_module[url]" id="learning_module_url" className="form-control" />
                                            </p>
                                        </Column>
                                        <Column sizes={{xs: 4}}>
                                            <p>
                                                <label htmlFor="learning_module_external">
                                                    Is Reference URL External Activity?
                                                    <input onChange={this.externalUpdate.bind(this)} checked={this.state.external} type="checkbox" name="learning_module[external]" id="learning_module_external" className="form-control" />
                                                </label>
                                            </p>
                                        </Column>
                                    </Row>
                                    <GridRow sizes={{xs: 12}}>
                                        <p>
                                            <label htmlFor="learning_module_url">Prerequisites</label>
                                            <Select
                                                name="form-field-name"
                                                options={Object.keys(this.props.modules).map( mod => ({value: mod, label: this.props.modules[mod].data.title}) )}
                                                value={this.state.selectedModules}
                                                onChange={this.onModuleChange.bind(this)}
                                                multi={true}
                                            />
                                        </p>
                                        <p>
                                            <label htmlFor="learning_module_url">Topics</label>
                                            <Select
                                                name="form-field-name"
                                                options={this.props.topics}
                                                value={this.state.selectedTopics}
                                                onChange={this.onTopicChange.bind(this)}
                                                multi={true}
                                            />
                                        </p>
                                    </GridRow>
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
