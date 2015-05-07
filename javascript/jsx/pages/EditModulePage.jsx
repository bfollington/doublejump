import {Util} from 'Util.jsx';
import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';

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

    newMarkdownSection(e) {
        var blocks = this.state.contentBlocks;
        blocks.push({type: "markdown", content: ""});

        this.setState({contentBlocks: blocks});
    }

    newCodeSection(e) {
        var blocks = this.state.contentBlocks;
        blocks.push({type: "code", content: "", language: ""});

        this.setState({contentBlocks: blocks});
    }

    newMathSection(e) {
        var blocks = this.state.contentBlocks;
        blocks.push({type: "math"});

        this.setState({contentBlocks: blocks});
    }

    render() {

        return (

            <div className="create-step-form">
                <div className="box">
                    <div className="row">
                        <div className="col-md-10">
                            <select id="learning_module" name="learning_module" className="select2" defaultValue={this.state.currentModule}>
                                {
                                    this.state.modules.map( function(module) {
                                        return <option value={module.id}>{module.title}</option>;
                                    })
                                }
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
                <section className="contents js-sortable-blocks">
                    {
                        this.state.contentBlocks.map( function(block) {
                            switch(block.type) {
                                case "markdown":
                                    return <MarkdownContent value={block.content} editable={true} />
                                    break;
                                case "code":
                                    return <CodeContent value={block.content} language={block.language} editable={true} />
                                    break;
                                case "math":
                                    return <MathContent value={block.content} editable={true} />
                                    break;
                            }
                        }.bind(this) )
                    }
                </section>
                <div className="box">
                    <button className="create-button button" onClick={this.newMarkdownSection.bind(this)}>
                        <i className="fa fa-file-text"></i> Add Markdown Content
                    </button>
                    <button className="create-button button" onClick={this.newCodeSection.bind(this)}>
                        <i className="fa fa-code"></i> Add Code Snippet
                    </button>
                    <button className="create-button button" onClick={this.newMathSection.bind(this)}>
                        <i className="fa fa-code"></i> Add Math Content
                    </button>
                </div>
            </div>
        );
    }
}
