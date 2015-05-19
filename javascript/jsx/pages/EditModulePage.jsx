import {Util} from 'Util.jsx';
import {Events, SaveModuleFormEvent, ContentTypeSubmissionSuccessEvent} from 'Events.jsx';
import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import {ImageContent} from 'components/editing/ImageContent.jsx';
import {Sortable} from 'components/Sortable.jsx';
import {FloatingButton} from 'components/FloatingButton.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
import {Slug} from 'Slug.js';

var page = require("page");

export class EditModulePage extends React.Component {
    constructor(props) {
        super.constructor(props);

        this.state = {
            modules: [{}],
            currentModule: null,
            contentBlocks: [],
            metadata: {},
            title: this.props.title,
            slug: this.props.slug
        }

        this.submitCount = 0;
    }

    titleUpdate(e) {
        this.setState({title: e.target.value});
        this.setState({slug: Slug.convertToSlug(e.target.value)});
    }

    slugUpdate(e) {
        this.setState({slug: e.target.value});
    }




    componentDidMount() {
        Events.subscribeRoot( ContentTypeSubmissionSuccessEvent, this.contentTypeDidSave.bind(this) );

        if (this.props.module) {
            $.get(`/concepts/concept/${this.props.module}`, this.fetchedData.bind(this));
        }
    }

    fetchedData(data) {
        console.log(data);


        var blocks = [];

        for (var i = 0; i < data.contents.length; i++) {
            Util.transformMongoId(data.contents[i]);
            console.log(data.contents[i]);
            switch(data.contents[i]["type"]) {
                case "MarkdownContent":
                    blocks.push(this.newMarkdownSection(data.contents[i]));
                    break;
                case "CodeContent":
                    blocks.push(this.newCodeSection(data.contents[i]));
                    break;
                case "MathContent":
                    blocks.push(this.newMathSection(data.contents[i]));
                    break;
                case "ImageContent":
                    blocks.push(this.newImageSection(data.contents[i]));
                    break;
            }
        }

        this.setState({
            title: data["learning_module"].title,
            slug: data["learning_module"].slug,
            contentBlocks: blocks
        });
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
        var content_type_ids = [];

        $(React.findDOMNode(this)).find("[data-id]").each( function() {
            content_type_ids.push($(this).attr("data-id"));
        });

        console.log(content_type_ids);

        var id = "";
        if (this.props.module !== undefined) {
            id = this.props.module;
        }

        var data = {
            "contents": content_type_ids,
            "learning_module": {
                title: this.state.title,
                slug: this.state.slug
            },
            "id": this.props.module
        };

        $.post(`/concepts/make`, data, this.moduleSaveRepsonse.bind(this));
    }

    moduleSaveRepsonse(data) {
        console.log("module response", data);

        if (data.success) {
            page(`/concepts/edit/${data.id}`);
        }
    }




    handleEditConcept(e) {

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

        return <MarkdownContent id={ctx["id"]} value={ctx["body"]} editable={this.isEditable} metadata={this.getMetadata.bind(this)}/>;
    }

    newCodeSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <CodeContent id={ctx["id"]} value={ctx["body"]} language={ctx["language"]} editable={this.isEditable} />;
    }

    newMathSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <MathContent id={ctx["id"]} value={ctx["body"]} editable={this.isEditable} />;
    }

    newImageSection(ctx) {
        if (ctx === undefined) {
            ctx = {}
        }

        return <ImageContent id={ctx["id"]} value="" editable={this.isEditable} />;
    }






    save(e) {
        Events.emitRoot(SaveModuleFormEvent, this);

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

        var editModuleSelect = (
            <div className="box">
                <div className="row">
                    <div className="col-md-10">
                        <select id="learning_module" name="learning_module" className="select2" defaultValue={this.state.currentModule}>
                            { this.state.modules.map( module => <option value={module.id}>{module.title}</option> ) }
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="create-button button" onClick={this.handleEditConcept.bind(this)}>Edit Concept</button>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="main-content">
                <div className="create-step-form">

                    <div className="box">
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Edit Concept</h2>
                                <form action="/concepts/make/" acceptCharset="UTF-8" id="addStepForm" method="post">
                                    { Util.getCSRFFormField() }
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
                                    <div className="content-ids"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
                    </div>
                    <Sortable>
                        { this.state.contentBlocks.map(block => block) }
                    </Sortable>
                    <div className="floating-tools">
                        <FloatingButton icon="file-text" onClick={this.newSection.bind(this, this.newMarkdownSection.bind(this))}>Add New Markdown Content</FloatingButton>
                        <FloatingButton icon="code" onClick={this.newSection.bind(this, this.newCodeSection.bind(this))}>Add Code Snippet</FloatingButton>
                        <FloatingButton icon="plus" onClick={this.newSection.bind(this, this.newMathSection.bind(this))}>Add Math Content</FloatingButton>
                        <FloatingButton icon="picture-o" onClick={this.newSection.bind(this, this.newImageSection.bind(this))}>Add Image</FloatingButton>
                        <FloatingButton icon="save" size="big" onClick={this.save.bind(this)}>Save Concept</FloatingButton>
                    </div>
                </div>
            </div>
        );
    }
}

EditModulePage.defaultProps = {
    title: "",
    slug: ""
}
