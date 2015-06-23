import {Util} from 'Util.jsx';
import {CodeContent} from 'components/editing/CodeContent.jsx';
import {MathContent} from 'components/editing/MathContent.jsx';
import {MarkdownContent} from 'components/editing/MarkdownContent.jsx';
import {ImageContent} from 'components/editing/ImageContent.jsx';
import {Sortable} from 'components/Sortable.jsx';
import {FloatingButton} from 'components/FloatingButton.jsx';
import {AceEditor} from 'components/AceEditor.jsx';
import {Mixin} from 'Mixin';
import {Print} from 'mixins/Print';
import {Store} from 'mixins/Store';

var React = require("react");

var page = require("page");

export class ViewModulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: [],
            metadata: {},
            topics: [],
            title: "",
            slug: ""
        };

        Mixin.apply(this, Store, {stores: ["module", "topic"]});
    }

    componentDidMount() {

        if (this.props.module) {
            this.stores.module.get(this.props.module, this.fetchedData.bind(this));
        }
    }

    fetchedData(data) {
        console.log(data);

        this.setState({
            title: data.learning_module.title,
            slug: data.learning_module.slug,
            contents: data.contents,
            topics: data.learning_module.topic_ids.map(id => id.$oid)
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


    render() {

        var content_type_lookup = {
            "MarkdownContent": ctx => <MarkdownContent id={ctx.id} value={ctx.body} editable={this.isEditable} metadata={this.getMetadata.bind(this)} />,
            "CodeContent": ctx => <CodeContent id={ctx.id} value={ctx.body} language={ctx.language} editable={this.isEditable} />,
            "MathContent": ctx => <MathContent id={ctx.id} value={ctx.body} editable={this.isEditable} />,
            "ImageContent": ctx => <ImageContent id={ctx.id} value="" editable={this.isEditable} />
        };

        return (
            <div className="main-content">
                <div className="">

                    <div className="box">
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>{this.state.title}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
                    </div>
                    {
                        this.state.contents.map(block => {
                            return content_type_lookup[block.type](block)
                        })
                    }
                </div>
            </div>
        );
    }
}
