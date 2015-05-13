import {Util} from 'Util.jsx';
import {Events, SaveModuleFormEvent} from 'Events.jsx';
import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import {ImageContent} from 'components/editing/ImageContent.jsx';
import {Sortable} from 'components/Sortable.jsx';
import {FloatingButton} from 'components/FloatingButton.jsx';

export class EditModulePage extends React.Component {
    constructor() {
        this.state = {
            modules: [{}],
            currentModule: null,
            contentBlocks: []
        }
    }

    handleEditConcept(e) {

    }

    newSection(data) {
        var blocks = this.state.contentBlocks;
        blocks.push(data);

        this.setState({contentBlocks: blocks});
    }

    newMarkdownSection(e) {
        this.newSection(<MarkdownContent value="" editable={this.isEditable} />);
    }

    newCodeSection(e) {
        this.newSection(<CodeContent value="" editable={this.isEditable} />);
    }

    newMathSection(e) {
        this.newSection(<MathContent value="" editable={this.isEditable} />);
    }

    newImageSection(e) {
        this.newSection(<ImageContent value="" editable={this.isEditable} />);
    }

    save(e) {
        Events.emitRoot(SaveModuleFormEvent, this);
    }

    isEditable() {
        return true;
    }

    render() {

        return (
            <div className="main-content">
                <div className="create-step-form">
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
                                                <input type="text" name="learning_module[title]" id="learning_module_title" className="js-slug form-control" data-object="learning_module" data-target="slug" />
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p>
                                                <label htmlFor="learning_module_slug">Concept Slug (For URL)</label><input type="text" name="learning_module[slug]" id="learning_module_slug" className="form-control" />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="content-ids"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Sortable>
                        { this.state.contentBlocks.map(block => block) }
                    </Sortable>
                    <div className="floating-tools">
                        <FloatingButton icon="file-text" onClick={this.newMarkdownSection.bind(this)}>Add New Markdown Content</FloatingButton>
                        <FloatingButton icon="code" onClick={this.newCodeSection.bind(this)}>Add Code Snippet</FloatingButton>
                        <FloatingButton icon="plus" onClick={this.newMathSection.bind(this)}>Add Math Content</FloatingButton>
                        <FloatingButton icon="picture-o" onClick={this.newImageSection.bind(this)}>Add Image</FloatingButton>
                        <FloatingButton icon="save" size="big" onClick={this.save.bind(this)}>Save Concept</FloatingButton>
                    </div>
                </div>
            </div>
        );
    }
}
