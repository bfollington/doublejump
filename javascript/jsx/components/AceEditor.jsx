// var ace = require('brace');
var React = require("react");
var langs = ["abap","abc","actionscript","ada","apache_conf","applescript","asciidoc","assembly_x86","autohotkey","batchfile","c9search","c_cpp","cirru","clojure","cobol","coffee","coldfusion","csharp","css","curly","d","dart","diff","django","dockerfile","dot","eiffel","ejs","elixir","elm","erlang","forth","ftl","gcode","gherkin","gitignore","glsl","golang","groovy","haml","handlebars","haskell","haxe","html","html_ruby","ini","io","jack","jade","java","javascript","json","jsoniq","jsp","jsx","julia","latex","lean","less","liquid","lisp","live_script","livescript","logiql","lsl","lua","luapage","lucene","makefile","markdown","mask","matlab","mel","mips_assembler","mipsassembler","mushcode","mysql","nix","objectivec","ocaml","pascal","perl","pgsql","php","plain_text","powershell","praat","prolog","properties","protobuf","python","r","rdoc","rhtml","ruby","rust","sass","scad","scala","scheme","scss","sh","sjs","smarty","snippets","soy_template","space","sql","stylus","svg","tcl","tex","text","textile","toml","twig","typescript","vala","vbscript","velocity","verilog","vhdl","xml","xquery","yaml"];

// require("brace/mode/actionscript"), require("brace/mode/c_cpp"), require("brace/mode/clojure"), require("brace/mode/coffee"), require("brace/mode/csharp"), require("brace/mode/css"), require("brace/mode/handlebars"), require("brace/mode/html"), require("brace/mode/java"), require("brace/mode/javascript"), require("brace/mode/json"), require("brace/mode/latex"), require("brace/mode/lua"), require("brace/mode/markdown"), require("brace/mode/mysql"), require("brace/mode/objectivec"), require("brace/mode/php"), require("brace/mode/plain_text"), require("brace/mode/python"), require("brace/mode/ruby"), require("brace/mode/xml");
// require('brace/theme/terminal');

export class AceEditor extends React.Component {
    constructor(props) {

        super(props);

        this.language = this.props.language;
        this.editor = null;
    }

    componentDidMount() {

        ace.config.set('basePath', '//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/');

        $(React.findDOMNode(this)).find('[data-editor]').each( (function (key, value) {
            var el = $(value);

            if (el.prev().is(".ace_editor"))
            {
                console.log("Already an ace editor");
                return;
            }

            var mode = el.data('editor');

            var editDiv = $('<div>', {
                position: 'absolute',
                width: el.width(),
                height: this.props.readOnly ? el[0].scrollHeight : Math.max(this.props.height, el[0].scrollHeight),
                'class': el.attr('class')
            }).insertBefore(el);

            el.css('display', 'none');

            this.editor = ace.edit(editDiv[0]);
            this.editor.$blockScrolling = Infinity;

            this.editor.getSession().setValue(el.text());
            this.editor.getSession().setMode("ace/mode/" + mode);
            this.editor.getSession().setUseSoftTabs(true);
            this.editor.getSession().setUseWrapMode(true);
            this.editor.getSession().setUseWorker(false);
            this.editor.setTheme("ace/theme/terminal");

            this.editor.setReadOnly(this.props.readOnly)

            // Keep original form field in sync
            if (this.props.keepTextAreaInSync) {
                this.editor.getSession().on('change', ( function(e) {
                    el.text(this.editor.getSession().getValue());
                    if (this.props.onContentChange) {
                        this.props.onContentChange(this.editor.getSession().getValue());
                    }
                }).bind(this) );
            }

        }).bind(this) );
    }

    languageChangeHandler(e) {
        this.language = e.target.value;
        this.editor.getSession().setMode("ace/mode/" + this.language);

        if (this.props.onLanguageChange) {
            this.props.onLanguageChange(e.target.value);
        }
    }

    render() {

        var languageSelection;

        if (this.props.showLanguageSelection) {
            languageSelection = [
                <label htmlFor="language"></label>,
                <select id="language" defaultValue={this.props.language} onChange={this.languageChangeHandler.bind(this)}>
                    {
                        langs.map( function(lang) {
                            return <option value={lang}>{lang}</option>;
                        } )
                    }
                </select>
            ];
        }

        return (
            <div className="AceEditor">
                {languageSelection}
                <textarea className="form-control" data-editor={this.props.language} defaultValue={this.props.value} />
            </div>
        );
    }
}

AceEditor.defaultProps = {
    language: 'markdown',
    height: 64,
    value: "",
    keepTextAreaInSync: true,
    showLanguageSelection: false,
    readOnly: false
};
