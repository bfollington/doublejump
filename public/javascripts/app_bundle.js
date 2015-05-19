(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./javascript/jsx/app.jsx":[function(require,module,exports){
"use strict";

var Router = require("./router.jsx").Router;

window.app = { domRoot: document.getElementById("content") };

$.ajaxPrefilter(function (options, originalOptions, xhr) {
    if (!options.crossDomain) {
        var token = $("meta[name=\"csrf-token\"]").attr("content");
        if (token) xhr.setRequestHeader("X-CSRF-Token", token);
    }
});

React.initializeTouchEvents(true);

var router = new Router();
router.start();

},{"./router.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/router.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Component.jsx":[function(require,module,exports){
"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Mixin = exports.Mixin = (function () {
    function Mixin() {
        _classCallCheck(this, Mixin);
    }

    _createClass(Mixin, {
        componentWillMount: {
            value: function componentWillMount() {}
        },
        componentDidMount: {
            value: function componentDidMount() {}
        },
        componentWillReceiveProps: {
            value: function componentWillReceiveProps(nextProps) {}
        },
        componentWillUpdate: {
            value: function componentWillUpdate(nextProps, nextState) {}
        },
        componentDidUpdate: {
            value: function componentDidUpdate(prevProps, prevState) {}
        },
        componentWillUnmount: {
            value: function componentWillUnmount() {}
        }
    });

    return Mixin;
})();

var Component = exports.Component = (function (_React$Component) {
    function Component(props) {
        _classCallCheck(this, Component);

        this.mixins = [];
    }

    _inherits(Component, _React$Component);

    _createClass(Component, {
        addMixin: {
            value: function addMixin(mixin) {
                this.mixins.push(mixin);
                mixin.component = this;
            }
        },
        componentWillMount: {
            value: function componentWillMount() {
                this.mixins.forEach(function (mixin) {
                    mixin.componentWillMount();
                });
            }
        },
        componentDidMount: {
            value: function componentDidMount() {
                this.mixins.forEach(function (mixin) {
                    mixin.componentDidMount();
                });
            }
        },
        componentWillReceiveProps: {
            value: function componentWillReceiveProps(nextProps) {
                this.mixins.forEach(function (mixin) {
                    mixin.componentWillReceiveProps(nextProps);
                });
            }
        },
        componentWillUpdate: {
            value: function componentWillUpdate(nextProps, nextState) {
                this.mixins.forEach(function (mixin) {
                    mixin.componentWillUpdate(nextProps, nextState);
                });
            }
        },
        componentDidUpdate: {
            value: function componentDidUpdate(prevProps, prevState) {
                this.mixins.forEach(function (mixin) {
                    mixin.componentDidUpdate(prevProps, prevState);
                });
            }
        },
        componentWillUnmount: {
            value: function componentWillUnmount() {
                this.mixins.forEach(function (mixin) {
                    mixin.componentWillUnmount();
                });
            }
        }
    });

    return Component;
})(React.Component);

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Events = exports.Events = (function () {
    function Events() {
        _classCallCheck(this, Events);
    }

    _createClass(Events, null, {
        emit: {
            value: function emit(el, ev, data) {
                $(el).trigger(ev, data);
            }
        },
        subscribe: {
            value: function subscribe(el, ev, handler) {
                $(el).on(ev, handler);
            }
        },
        subscribeRoot: {
            value: function subscribeRoot(ev, handler) {
                $(window.app.domRoot).on(ev, handler);
            }
        },
        unsubscribe: {
            value: function unsubscribe(el, ev) {
                $(el).off(ev);
            }
        },
        unsubscribeRoot: {
            value: function unsubscribeRoot(ev, fn) {
                $(window.app.domRoot).off(ev, fn);
            }
        },
        unsubscribeAll: {
            value: function unsubscribeAll(el) {
                $(el).off();
            }
        },
        emitRoot: {
            value: function emitRoot(ev, data) {
                Events.emit(window.app.domRoot, ev, data);
            }
        }
    });

    return Events;
})();

var SaveModuleFormEvent = "event_save_module_form";
exports.SaveModuleFormEvent = SaveModuleFormEvent;
var ContentTypeSubmissionSuccessEvent = "event_content_type_submission_success";
exports.ContentTypeSubmissionSuccessEvent = ContentTypeSubmissionSuccessEvent;

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Slug.js":[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Slug = exports.Slug = function Slug() {
    _classCallCheck(this, Slug);
};

Slug.convertToSlug = function (text) {
    return text.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
};

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx":[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Util = exports.Util = function Util() {
    _classCallCheck(this, Util);
};

Util.setTransform = function (el, style) {
    $(el).css("transform", style);
    $(el).css("-webkit-transform", style);
    $(el).css("-moz-transform", style);
    $(el).css("-ms-transform", style);
    $(el).css("-o-transform", style);
};

Util.getCSRF = function () {
    return {
        param: $("meta[name=csrf-param]").attr("content"),
        token: $("meta[name=csrf-token]").attr("content")
    };
};

Util.getCSRFFormField = function () {
    var csrf = Util.getCSRF();
    return React.createElement("input", { type: "hidden", name: csrf.param, value: csrf.token });
};

Util.transformMongoId = function (obj) {
    if (obj._id) {
        if (obj._id.$oid) {
            obj.id = obj._id.$oid;
        }
    }
};

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
// var ace = require('brace');

var langs = ["abap", "abc", "actionscript", "ada", "apache_conf", "applescript", "asciidoc", "assembly_x86", "autohotkey", "batchfile", "c9search", "c_cpp", "cirru", "clojure", "cobol", "coffee", "coldfusion", "csharp", "css", "curly", "d", "dart", "diff", "django", "dockerfile", "dot", "eiffel", "ejs", "elixir", "elm", "erlang", "forth", "ftl", "gcode", "gherkin", "gitignore", "glsl", "golang", "groovy", "haml", "handlebars", "haskell", "haxe", "html", "html_ruby", "ini", "io", "jack", "jade", "java", "javascript", "json", "jsoniq", "jsp", "jsx", "julia", "latex", "lean", "less", "liquid", "lisp", "live_script", "livescript", "logiql", "lsl", "lua", "luapage", "lucene", "makefile", "markdown", "mask", "matlab", "mel", "mips_assembler", "mipsassembler", "mushcode", "mysql", "nix", "objectivec", "ocaml", "pascal", "perl", "pgsql", "php", "plain_text", "powershell", "praat", "prolog", "properties", "protobuf", "python", "r", "rdoc", "rhtml", "ruby", "rust", "sass", "scad", "scala", "scheme", "scss", "sh", "sjs", "smarty", "snippets", "soy_template", "space", "sql", "stylus", "svg", "tcl", "tex", "text", "textile", "toml", "twig", "typescript", "vala", "vbscript", "velocity", "verilog", "vhdl", "xml", "xquery", "yaml"];

// require("brace/mode/actionscript"), require("brace/mode/c_cpp"), require("brace/mode/clojure"), require("brace/mode/coffee"), require("brace/mode/csharp"), require("brace/mode/css"), require("brace/mode/handlebars"), require("brace/mode/html"), require("brace/mode/java"), require("brace/mode/javascript"), require("brace/mode/json"), require("brace/mode/latex"), require("brace/mode/lua"), require("brace/mode/markdown"), require("brace/mode/mysql"), require("brace/mode/objectivec"), require("brace/mode/php"), require("brace/mode/plain_text"), require("brace/mode/python"), require("brace/mode/ruby"), require("brace/mode/xml");
// require('brace/theme/terminal');

var AceEditor = exports.AceEditor = (function (_React$Component) {
    function AceEditor(props) {
        _classCallCheck(this, AceEditor);

        _get(Object.getPrototypeOf(AceEditor.prototype), "constructor", this).call(this, props);

        this.language = this.props.language;
        this.editor = null;
    }

    _inherits(AceEditor, _React$Component);

    _createClass(AceEditor, {
        componentDidMount: {
            value: function componentDidMount() {

                ace.config.set("basePath", "//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/");

                $(React.findDOMNode(this)).find("[data-editor]").each((function (key, value) {
                    var el = $(value);

                    if (el.prev().is(".ace_editor")) {
                        console.log("Already an ace editor");
                        return;
                    }

                    var mode = el.data("editor");

                    var editDiv = $("<div>", {
                        position: "absolute",
                        width: el.width(),
                        height: Math.max(this.props.height, el[0].scrollHeight),
                        "class": el.attr("class")
                    }).insertBefore(el);

                    el.css("display", "none");

                    this.editor = ace.edit(editDiv[0]);

                    this.editor.getSession().setValue(el.text());
                    this.editor.getSession().setMode("ace/mode/" + mode);
                    this.editor.getSession().setUseSoftTabs(true);
                    this.editor.getSession().setUseWrapMode(true);
                    this.editor.getSession().setUseWorker(false);
                    this.editor.setTheme("ace/theme/terminal");

                    // Keep original form field in sync
                    if (this.props.keepTextAreaInSync) {
                        this.editor.getSession().on("change", (function (e) {
                            el.text(this.editor.getSession().getValue());
                            if (this.props.onContentChange) {
                                this.props.onContentChange(this.editor.getSession().getValue());
                            }
                        }).bind(this));
                    }
                }).bind(this));
            }
        },
        languageChangeHandler: {
            value: function languageChangeHandler(e) {
                this.language = e.target.value;
                this.editor.getSession().setMode("ace/mode/" + this.language);

                if (this.props.onLanguageChange) {
                    this.props.onLanguageChange(e.target.value);
                }
            }
        },
        render: {
            value: function render() {

                var languageSelection;

                if (this.props.showLanguageSelection) {
                    languageSelection = [React.createElement("label", { htmlFor: "language" }), React.createElement(
                        "select",
                        { id: "language", defaultValue: this.props.language, onChange: this.languageChangeHandler.bind(this) },
                        langs.map(function (lang) {
                            return React.createElement(
                                "option",
                                { value: lang },
                                lang
                            );
                        })
                    )];
                }

                return React.createElement(
                    "div",
                    null,
                    languageSelection,
                    React.createElement("textarea", { className: "form-control", "data-editor": this.props.language, defaultValue: this.props.value })
                );
            }
        }
    });

    return AceEditor;
})(React.Component);

AceEditor.defaultProps = {
    language: "markdown",
    height: 64,
    value: "",
    keepTextAreaInSync: true,
    showLanguageSelection: false
};

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/FloatingButton.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var FloatingButton = exports.FloatingButton = (function (_React$Component) {
    function FloatingButton() {
        _classCallCheck(this, FloatingButton);
    }

    _inherits(FloatingButton, _React$Component);

    _createClass(FloatingButton, {
        componentDidMount: {
            value: function componentDidMount() {
                var el = React.findDOMNode(this);

                $(el).find("[rel=tooltip]").tooltip();
            }
        },
        render: {
            value: function render() {

                var iconClass = this.props.className;
                if (typeof iconClass == "undefined") {
                    iconClass = "";
                }

                return React.createElement(
                    "div",
                    { className: "round-icon " + this.props.size, onClick: this.props.onClick },
                    React.createElement("i", { className: "fa fa-" + this.props.icon + " " + iconClass, rel: "tooltip", title: this.props.children })
                );
            }
        }
    });

    return FloatingButton;
})(React.Component);

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/ProjectStart.react.jsx":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Component = require("../Component.jsx").Component;

var CodeContent = require("./editing/CodeContent.jsx").CodeContent;

var MathContent = require("./editing/MathContent.jsx").MathContent;

var MarkdownContent = require("./editing/MarkdownContent.jsx").MarkdownContent;

var page = _interopRequire(require("page"));

var ProjectStart = exports.ProjectStart = (function (_Component) {
    function ProjectStart(props) {
        _classCallCheck(this, ProjectStart);

        _get(Object.getPrototypeOf(ProjectStart.prototype), "constructor", this).call(this, props);
        this.state = this.getState();
    }

    _inherits(ProjectStart, _Component);

    _createClass(ProjectStart, {
        getState: {
            value: function getState() {
                return {
                    field: "value",
                    name: "Bob",
                    editField: false
                };
            }
        },
        navigate: {
            value: function navigate(e) {
                console.log("Navigated");
                page("/concepts/test");
            }
        },
        edit: {
            value: function edit(e) {
                this.setState({ editField: !this.state.editField });
            }
        },
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "box" },
                    React.createElement(
                        "h2",
                        null,
                        "Start a New Project"
                    ),
                    React.createElement(
                        "a",
                        { href: "/concepts/test" },
                        "Go to test"
                    ),
                    React.createElement(CodeContent, { editContent: this.state.editField, value: "console.log(test);" }),
                    React.createElement(MathContent, { editContent: this.state.editField, value: "\\alpha\\beta\\gamma" }),
                    React.createElement(MarkdownContent, { editContent: this.state.editField, value: "Hello _You_" }),
                    React.createElement(
                        "button",
                        { className: "btn btn-default", onClick: this.edit.bind(this) },
                        "Edit Field"
                    ),
                    React.createElement(
                        "div",
                        { className: "btn-group", role: "group", onClick: this.navigate.bind(this) },
                        React.createElement(
                            "button",
                            { className: "btn btn-default" },
                            "Click me to Add Data"
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-default" },
                            "Click me to Replay Data"
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-default" },
                            "Click me to Reset Data"
                        )
                    )
                );
            }
        }
    });

    return ProjectStart;
})(Component);

},{"../Component.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Component.jsx","./editing/CodeContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx","./editing/MarkdownContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx","./editing/MathContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx","page":"page"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Sortable.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dragula = require("dragula");

var Sortable = exports.Sortable = (function (_React$Component) {
    function Sortable() {
        _classCallCheck(this, Sortable);

        if (_React$Component != null) {
            _React$Component.apply(this, arguments);
        }
    }

    _inherits(Sortable, _React$Component);

    _createClass(Sortable, {
        componentDidMount: {
            value: function componentDidMount() {
                var el = React.findDOMNode(this);
                var $el = $(el);

                dragula(el, {
                    moves: function moves(el, container, handle) {
                        return $(handle).hasClass("handle");
                    }
                });
            }
        },
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "sortable" },
                    this.props.children
                );
            }
        }
    });

    return Sortable;
})(React.Component);

},{"dragula":"dragula"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Test.react.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Component = require("../Component.jsx").Component;

var Test = exports.Test = (function (_Component) {
    function Test(props) {
        _classCallCheck(this, Test);

        _get(Object.getPrototypeOf(Test.prototype), "constructor", this).call(this, props);
    }

    _inherits(Test, _Component);

    _createClass(Test, {
        render: {
            value: function render() {
                return React.createElement(
                    "h1",
                    null,
                    "Test"
                );
            }
        }
    });

    return Test;
})(Component);

},{"../Component.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Component.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EventsJsx = require("Events.jsx");

var Events = _EventsJsx.Events;
var SaveModuleFormEvent = _EventsJsx.SaveModuleFormEvent;
var ContentTypeSubmissionSuccessEvent = _EventsJsx.ContentTypeSubmissionSuccessEvent;

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var CodeContent = exports.CodeContent = (function (_React$Component) {
    function CodeContent(props) {
        _classCallCheck(this, CodeContent);

        _get(Object.getPrototypeOf(CodeContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value,
            language: this.props.language,
            id: this.props.id
        };
    }

    _inherits(CodeContent, _React$Component);

    _createClass(CodeContent, {
        componentDidMount: {
            value: function componentDidMount() {
                Events.subscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
            }
        },
        componentDidUnmount: {
            value: function componentDidUnmount() {
                Events.unsubscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
            }
        },
        saveToServer: {
            value: function saveToServer(e) {
                var data = {
                    code_content: {
                        body: this.state.content,
                        language: this.state.language,
                        id: this.state.id
                    }
                };
                $.post("/content/code/add", data, this.saveCallback.bind(this));
            }
        },
        saveCallback: {
            value: function saveCallback(data) {
                if (data.success) {
                    this.setState({ id: data.id });
                }

                Events.emitRoot(ContentTypeSubmissionSuccessEvent, this);
            }
        },
        languageChange: {
            value: function languageChange(lang) {
                this.setState({ language: lang });
            }
        },
        contentChange: {
            value: function contentChange(content) {
                this.contentBuffer = content;
            }
        },
        edit: {
            value: function edit(e) {
                if (this.props.editable()) {
                    this.contentBuffer = this.state.content;
                    this.setState({ editing: true });
                }
            }
        },
        save: {
            value: function save(e) {
                this.setState({ content: this.contentBuffer });
                this.setState({ editing: false });
            }
        },
        cancel: {
            value: function cancel(e) {
                this.setState({ editing: false });
            }
        },
        render: {
            value: function render() {

                var edit = React.createElement(
                    ContentType,
                    { title: "Code Content", editable: this.props.editable },
                    React.createElement(AceEditor, { showLanguageSelection: true, onLanguageChange: this.languageChange.bind(this), onContentChange: this.contentChange.bind(this), language: this.state.language, value: this.state.content }),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.save.bind(this) },
                        "Save"
                    ),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.cancel.bind(this) },
                        "Cancel"
                    )
                );

                var view = React.createElement(
                    "pre",
                    { "data-id": this.state.id },
                    React.createElement(
                        "code",
                        { className: this.state.language },
                        this.state.content
                    )
                );

                var content = this.state.editing ? edit : view;

                return ContentType.wrapContentType(this, content, this.edit.bind(this));
            }
        }
    });

    return CodeContent;
})(React.Component);

CodeContent.defaultProps = {
    language: "javascript",
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var ContentTypeToolbar = require("./ContentTypeToolbar.jsx").ContentTypeToolbar;

var FloatingButton = require("components/FloatingButton.jsx").FloatingButton;

var ContentType = exports.ContentType = (function (_React$Component) {
    function ContentType() {
        _classCallCheck(this, ContentType);

        if (_React$Component != null) {
            _React$Component.apply(this, arguments);
        }
    }

    _inherits(ContentType, _React$Component);

    _createClass(ContentType, {
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "content-type " + this.props.editable() ? "editable" : "" },
                    React.createElement(
                        ContentTypeToolbar,
                        { icon: this.props.titleIcon },
                        this.props.title
                    ),
                    this.props.children
                );
            }
        }
    });

    return ContentType;
})(React.Component);

ContentType.wrapContentType = function (ctx, content, editHandler) {

    var inner = [React.createElement(
        "div",
        { className: "edit-content-type-tools float-right" },
        React.createElement(
            FloatingButton,
            { icon: "arrows", className: "handle" },
            "Move"
        ),
        React.createElement(
            FloatingButton,
            { icon: "pencil", onClick: editHandler },
            "Edit"
        )
    ), { content: content }];

    if (!ctx.props.editable()) {
        inner = content;
    }

    return React.createElement(
        "div",
        { className: "box content-type " + (ctx.props.editable() ? "editable" : "") },
        inner
    );
};

},{"./ContentTypeToolbar.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentTypeToolbar.jsx","components/FloatingButton.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/FloatingButton.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentTypeToolbar.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var ContentTypeToolbar = exports.ContentTypeToolbar = (function (_React$Component) {
    function ContentTypeToolbar() {
        _classCallCheck(this, ContentTypeToolbar);

        if (_React$Component != null) {
            _React$Component.apply(this, arguments);
        }
    }

    _inherits(ContentTypeToolbar, _React$Component);

    _createClass(ContentTypeToolbar, {
        render: {
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "content-type-toolbar" },
                    React.createElement(
                        "h4",
                        null,
                        React.createElement("i", { className: "fa margin-right" + this.props.icon }),
                        this.props.children
                    )
                );
            }
        }
    });

    return ContentTypeToolbar;
})(React.Component);

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ImageContent.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EventsJsx = require("Events.jsx");

var Events = _EventsJsx.Events;
var SaveModuleFormEvent = _EventsJsx.SaveModuleFormEvent;
var ContentTypeSubmissionSuccessEvent = _EventsJsx.ContentTypeSubmissionSuccessEvent;

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var marked = require("marked");

var ImageContent = exports.ImageContent = (function (_React$Component) {
    function ImageContent(props) {
        _classCallCheck(this, ImageContent);

        _get(Object.getPrototypeOf(ImageContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value,
            id: this.props.id
        };
    }

    _inherits(ImageContent, _React$Component);

    _createClass(ImageContent, {
        componentDidMount: {
            value: function componentDidMount() {
                Events.subscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
            }
        },
        componentDidUnmount: {
            value: function componentDidUnmount() {
                Events.unsubscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
            }
        },
        saveToServer: {
            value: function saveToServer(e) {
                var data = {
                    image_content: {
                        src: this.state.content,
                        id: this.state.id
                    }
                };
                $.post("/content/image/add", data, this.saveCallback.bind(this));
            }
        },
        saveCallback: {
            value: function saveCallback(data) {
                if (data.success) {
                    this.setState({ id: data.id });
                }

                Events.emitRoot(ContentTypeSubmissionSuccessEvent, this);
            }
        },
        contentChange: {
            value: function contentChange(content) {
                this.contentBuffer = content;
            }
        },
        edit: {
            value: function edit(e) {
                if (this.props.editable()) {
                    this.contentBuffer = this.state.content;
                    this.setState({ editing: true });
                }
            }
        },
        save: {
            value: function save(e) {
                this.setState({ content: this.contentBuffer });
                this.setState({ editing: false });
            }
        },
        cancel: {
            value: function cancel(e) {
                this.setState({ editing: false });
            }
        },
        render: {
            value: function render() {

                var edit = React.createElement(
                    ContentType,
                    { title: "Image Content", editable: this.props.editable },
                    React.createElement(AceEditor, { onContentChange: this.contentChange.bind(this), language: "markdown", value: this.state.content }),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.save.bind(this) },
                        "Save"
                    ),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.cancel.bind(this) },
                        "Cancel"
                    )
                );

                var view = React.createElement(
                    "div",
                    { "data-id": this.state.id },
                    React.createElement("img", { src: this.state.content })
                );

                var content = this.state.editing ? edit : view;

                return ContentType.wrapContentType(this, content, this.edit.bind(this));
            }
        }
    });

    return ImageContent;
})(React.Component);

ImageContent.defaultProps = {
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","marked":"marked"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EventsJsx = require("Events.jsx");

var Events = _EventsJsx.Events;
var SaveModuleFormEvent = _EventsJsx.SaveModuleFormEvent;
var ContentTypeSubmissionSuccessEvent = _EventsJsx.ContentTypeSubmissionSuccessEvent;

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var marked = require("marked");
var handlebars = require("handlebars");

var MarkdownContent = exports.MarkdownContent = (function (_React$Component) {
    function MarkdownContent(props) {
        _classCallCheck(this, MarkdownContent);

        _get(Object.getPrototypeOf(MarkdownContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value,
            id: this.props.id
        };
    }

    _inherits(MarkdownContent, _React$Component);

    _createClass(MarkdownContent, {
        componentDidMount: {
            value: function componentDidMount() {
                Events.subscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
                this.renderMath();
            }
        },
        componentDidUnmount: {
            value: function componentDidUnmount() {
                Events.unsubscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
            }
        },
        componentDidUpdate: {
            value: function componentDidUpdate() {
                this.renderMath();
            }
        },
        saveToServer: {
            value: function saveToServer(e) {
                var data = {
                    markdown_content: {
                        body: this.state.content,
                        id: this.state.id
                    }
                };
                $.post("/content/markdown/add", data, this.saveCallback.bind(this));
            }
        },
        saveCallback: {
            value: function saveCallback(data) {
                if (data.success) {
                    this.setState({ id: data.id });
                }

                Events.emitRoot(ContentTypeSubmissionSuccessEvent, this);
            }
        },
        contentChange: {
            value: function contentChange(content) {
                this.contentBuffer = content;
            }
        },
        renderMath: {
            value: function renderMath() {
                if (!this.state.editing) {
                    var $el = $(React.findDOMNode(this));

                    var renderTarget = $el.find(".markdown-content")[0];
                    var html = marked(this.state.content);
                    var template = handlebars.compile(html);

                    renderTarget.innerHTML = template(this.props.metadata());
                }
            }
        },
        edit: {
            value: function edit(e) {
                if (this.props.editable()) {
                    this.contentBuffer = this.state.content;
                    this.setState({ editing: true });
                }
            }
        },
        save: {
            value: function save(e) {
                this.setState({ content: this.contentBuffer });
                this.setState({ editing: false });
            }
        },
        cancel: {
            value: function cancel(e) {
                this.setState({ editing: false });
            }
        },
        render: {
            value: function render() {

                var edit = React.createElement(
                    ContentType,
                    { title: "Markdown Content", editable: this.props.editable },
                    React.createElement(AceEditor, { onContentChange: this.contentChange.bind(this), language: "markdown", value: this.state.content }),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.save.bind(this) },
                        "Save"
                    ),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.cancel.bind(this) },
                        "Cancel"
                    )
                );

                var view = React.createElement(
                    "div",
                    { "data-id": this.state.id },
                    React.createElement("div", { className: "markdown-content" })
                );

                var content = this.state.editing ? edit : view;

                return ContentType.wrapContentType(this, content, this.edit.bind(this));
            }
        }
    });

    return MarkdownContent;
})(React.Component);

MarkdownContent.defaultProps = {
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","handlebars":"handlebars","marked":"marked"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EventsJsx = require("Events.jsx");

var Events = _EventsJsx.Events;
var SaveModuleFormEvent = _EventsJsx.SaveModuleFormEvent;
var ContentTypeSubmissionSuccessEvent = _EventsJsx.ContentTypeSubmissionSuccessEvent;

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var katex = require("katex");

var MathContent = exports.MathContent = (function (_React$Component) {
    function MathContent(props) {
        _classCallCheck(this, MathContent);

        _get(Object.getPrototypeOf(MathContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value,
            editing: this.props.editContent,
            id: this.props.id
        };
    }

    _inherits(MathContent, _React$Component);

    _createClass(MathContent, {
        componentDidMount: {
            value: function componentDidMount() {
                Events.subscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
                this.renderMath();
            }
        },
        componentDidUnmount: {
            value: function componentDidUnmount() {
                Events.unsubscribeRoot(SaveModuleFormEvent, this.saveToServer.bind(this));
            }
        },
        componentDidUpdate: {
            value: function componentDidUpdate() {
                this.renderMath();
            }
        },
        saveToServer: {
            value: function saveToServer(e) {
                var data = {
                    math_content: {
                        body: this.state.content,
                        id: this.state.id
                    }
                };
                $.post("/content/math/add", data, this.saveCallback.bind(this));
            }
        },
        saveCallback: {
            value: function saveCallback(data) {
                if (data.success) {
                    this.setState({ id: data.id });
                }

                Events.emitRoot(ContentTypeSubmissionSuccessEvent, this);
            }
        },
        contentChange: {
            value: function contentChange(content) {
                this.contentBuffer = content;
            }
        },
        renderMath: {
            value: function renderMath() {
                if (!this.state.editing) {
                    console.log("Rendering math");
                    var $el = $(React.findDOMNode(this));

                    var renderTarget = $el.find(".math-content")[0];
                    try {
                        katex.render(this.state.content, renderTarget, { displayMode: true });
                    } catch (err) {
                        renderTarget.innerHTML = "Math Render Error: " + err;
                    }
                }
            }
        },
        edit: {
            value: function edit(e) {
                if (this.props.editable()) {
                    this.contentBuffer = this.state.content;
                    this.setState({ editing: true });
                }
            }
        },
        save: {
            value: function save(e) {
                this.setState({ content: this.contentBuffer });
                this.setState({ editing: false });
            }
        },
        cancel: {
            value: function cancel(e) {
                this.setState({ editing: false });
            }
        },
        render: {
            value: function render() {

                var edit = React.createElement(
                    ContentType,
                    { title: "Math Content", editable: this.props.editable },
                    React.createElement(AceEditor, { onContentChange: this.contentChange.bind(this), language: "latex", value: this.state.content }),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.save.bind(this) },
                        "Save"
                    ),
                    React.createElement(
                        "button",
                        { className: "button create-button", onClick: this.cancel.bind(this) },
                        "Cancel"
                    )
                );

                var view = React.createElement(
                    "div",
                    { "data-id": this.state.id },
                    React.createElement("div", { className: "math-content" })
                );

                var content = this.state.editing ? edit : view;

                return ContentType.wrapContentType(this, content, this.edit.bind(this));
            }
        }
    });

    return MathContent;
})(React.Component);

MathContent.defaultProps = {
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","katex":"katex"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePage.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Util = require("Util.jsx").Util;

var _EventsJsx = require("Events.jsx");

var Events = _EventsJsx.Events;
var SaveModuleFormEvent = _EventsJsx.SaveModuleFormEvent;
var ContentTypeSubmissionSuccessEvent = _EventsJsx.ContentTypeSubmissionSuccessEvent;

var CodeContent = require("components/editing/CodeContent.jsx").CodeContent;

var MathContent = require("components/editing/MathContent.jsx").MathContent;

var MarkdownContent = require("components/editing/MarkdownContent.jsx").MarkdownContent;

var ImageContent = require("components/editing/ImageContent.jsx").ImageContent;

var Sortable = require("components/Sortable.jsx").Sortable;

var FloatingButton = require("components/FloatingButton.jsx").FloatingButton;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var Slug = require("Slug.js").Slug;

var page = require("page");

var EditModulePage = exports.EditModulePage = (function (_React$Component) {
    function EditModulePage(props) {
        _classCallCheck(this, EditModulePage);

        _get(Object.getPrototypeOf(EditModulePage.prototype), "constructor", this).call(this, props);

        this.state = {
            modules: [{}],
            currentModule: null,
            contentBlocks: [],
            metadata: {},
            title: this.props.title,
            slug: this.props.slug
        };

        this.submitCount = 0;
    }

    _inherits(EditModulePage, _React$Component);

    _createClass(EditModulePage, {
        titleUpdate: {
            value: function titleUpdate(e) {
                this.setState({ title: e.target.value });
                this.setState({ slug: Slug.convertToSlug(e.target.value) });
            }
        },
        slugUpdate: {
            value: function slugUpdate(e) {
                this.setState({ slug: e.target.value });
            }
        },
        componentDidMount: {
            value: function componentDidMount() {
                Events.subscribeRoot(ContentTypeSubmissionSuccessEvent, this.contentTypeDidSave.bind(this));

                if (this.props.module) {
                    $.get("/concepts/concept/" + this.props.module, this.fetchedData.bind(this));
                }
            }
        },
        fetchedData: {
            value: function fetchedData(data) {
                console.log(data);

                var blocks = [];

                for (var i = 0; i < data.contents.length; i++) {
                    Util.transformMongoId(data.contents[i]);
                    console.log(data.contents[i]);
                    switch (data.contents[i].type) {
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
                    title: data.learning_module.title,
                    slug: data.learning_module.slug,
                    contentBlocks: blocks
                });
            }
        },
        componentDidUnmount: {
            value: function componentDidUnmount() {
                Events.unsubscribeRoot(ContentTypeSubmissionSuccessEvent, this.contentTypeDidSave.bind(this));
            }
        },
        contentTypeDidSave: {
            value: function contentTypeDidSave() {
                this.submitCount++;

                if (this.submitCount == this.state.contentBlocks.length) {
                    console.log("All saved correctly", this.state.contentBlocks.length);
                    this.allContentTypesDidSave();
                }
            }
        },
        allContentTypesDidSave: {
            value: function allContentTypesDidSave() {
                var content_type_ids = [];

                $(React.findDOMNode(this)).find("[data-id]").each(function () {
                    content_type_ids.push($(this).attr("data-id"));
                });

                console.log(content_type_ids);

                var id = "";
                if (this.props.module !== undefined) {
                    id = this.props.module;
                }

                var data = {
                    contents: content_type_ids,
                    learning_module: {
                        title: this.state.title,
                        slug: this.state.slug
                    },
                    id: this.props.module
                };

                $.post("/concepts/make", data, this.moduleSaveRepsonse.bind(this));
            }
        },
        moduleSaveRepsonse: {
            value: function moduleSaveRepsonse(data) {
                console.log("module response", data);

                if (data.success) {
                    page("/concepts/edit/" + data.id);
                }
            }
        },
        handleEditConcept: {
            value: function handleEditConcept(e) {}
        },
        newSection: {
            value: function newSection(provider) {
                var blocks = this.state.contentBlocks;
                blocks.push(provider());

                this.setState({ contentBlocks: blocks });
            }
        },
        newMarkdownSection: {
            value: function newMarkdownSection(ctx) {
                if (ctx === undefined) {
                    ctx = {};
                }

                return React.createElement(MarkdownContent, { id: ctx.id, value: ctx.body, editable: this.isEditable, metadata: this.getMetadata.bind(this) });
            }
        },
        newCodeSection: {
            value: function newCodeSection(ctx) {
                if (ctx === undefined) {
                    ctx = {};
                }

                return React.createElement(CodeContent, { id: ctx.id, value: ctx.body, language: ctx.language, editable: this.isEditable });
            }
        },
        newMathSection: {
            value: function newMathSection(ctx) {
                if (ctx === undefined) {
                    ctx = {};
                }

                return React.createElement(MathContent, { id: ctx.id, value: ctx.body, editable: this.isEditable });
            }
        },
        newImageSection: {
            value: function newImageSection(ctx) {
                if (ctx === undefined) {
                    ctx = {};
                }

                return React.createElement(ImageContent, { id: ctx.id, value: "", editable: this.isEditable });
            }
        },
        save: {
            value: function save(e) {
                Events.emitRoot(SaveModuleFormEvent, this);

                this.submitCount = 0;
            }
        },
        isEditable: {
            value: function isEditable() {
                return true;
            }
        },
        getMetadata: {
            value: function getMetadata() {
                return this.state.metadata;
            }
        },
        metadataChange: {
            value: function metadataChange(content) {
                try {
                    var metadata = JSON.parse(content);

                    this.setState({ metadata: metadata });
                    console.log("Updated metadata", content, metadata);
                } catch (err) {}
            }
        },
        render: {
            value: function render() {

                var editModuleSelect = React.createElement(
                    "div",
                    { className: "box" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-10" },
                            React.createElement(
                                "select",
                                { id: "learning_module", name: "learning_module", className: "select2", defaultValue: this.state.currentModule },
                                this.state.modules.map(function (module) {
                                    return React.createElement(
                                        "option",
                                        { value: module.id },
                                        module.title
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-2" },
                            React.createElement(
                                "button",
                                { className: "create-button button", onClick: this.handleEditConcept.bind(this) },
                                "Edit Concept"
                            )
                        )
                    )
                );

                return React.createElement(
                    "div",
                    { className: "main-content" },
                    React.createElement(
                        "div",
                        { className: "create-step-form" },
                        React.createElement(
                            "div",
                            { className: "box" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12" },
                                    React.createElement(
                                        "h2",
                                        null,
                                        "Edit Concept"
                                    ),
                                    React.createElement(
                                        "form",
                                        { action: "/concepts/make/", acceptCharset: "UTF-8", id: "addStepForm", method: "post" },
                                        Util.getCSRFFormField(),
                                        React.createElement(
                                            "div",
                                            { className: "row" },
                                            React.createElement(
                                                "div",
                                                { className: "col-sm-6" },
                                                React.createElement(
                                                    "p",
                                                    null,
                                                    React.createElement(
                                                        "label",
                                                        { htmlFor: "learning_module_title" },
                                                        "Concept Title"
                                                    ),
                                                    React.createElement("input", { onChange: this.titleUpdate.bind(this), value: this.state.title, type: "text", name: "learning_module[title]", id: "learning_module_title", className: "form-control" })
                                                )
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "col-sm-6" },
                                                React.createElement(
                                                    "p",
                                                    null,
                                                    React.createElement(
                                                        "label",
                                                        { htmlFor: "learning_module_slug" },
                                                        "Concept Slug (For URL)"
                                                    ),
                                                    React.createElement("input", { onChange: this.slugUpdate.bind(this), value: this.state.slug, type: "text", name: "learning_module[slug]", id: "learning_module_slug", className: "form-control" })
                                                )
                                            )
                                        ),
                                        React.createElement("div", { className: "content-ids" })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "box" },
                            React.createElement(AceEditor, { onContentChange: this.metadataChange.bind(this), language: "javascript", value: "{}" })
                        ),
                        React.createElement(
                            Sortable,
                            null,
                            this.state.contentBlocks.map(function (block) {
                                return block;
                            })
                        ),
                        React.createElement(
                            "div",
                            { className: "floating-tools" },
                            React.createElement(
                                FloatingButton,
                                { icon: "file-text", onClick: this.newSection.bind(this, this.newMarkdownSection.bind(this)) },
                                "Add New Markdown Content"
                            ),
                            React.createElement(
                                FloatingButton,
                                { icon: "code", onClick: this.newSection.bind(this, this.newCodeSection.bind(this)) },
                                "Add Code Snippet"
                            ),
                            React.createElement(
                                FloatingButton,
                                { icon: "plus", onClick: this.newSection.bind(this, this.newMathSection.bind(this)) },
                                "Add Math Content"
                            ),
                            React.createElement(
                                FloatingButton,
                                { icon: "picture-o", onClick: this.newSection.bind(this, this.newImageSection.bind(this)) },
                                "Add Image"
                            ),
                            React.createElement(
                                FloatingButton,
                                { icon: "save", size: "big", onClick: this.save.bind(this) },
                                "Save Concept"
                            )
                        )
                    )
                );
            }
        }
    });

    return EditModulePage;
})(React.Component);

EditModulePage.defaultProps = {
    title: "",
    slug: ""
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","Slug.js":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Slug.js","Util.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/FloatingButton.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/FloatingButton.jsx","components/Sortable.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Sortable.jsx","components/editing/CodeContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx","components/editing/ImageContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ImageContent.jsx","components/editing/MarkdownContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx","components/editing/MathContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx","page":"page"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePageController.jsx":[function(require,module,exports){
"use strict";

exports.EditModulePageController = EditModulePageController;
Object.defineProperty(exports, "__esModule", {
    value: true
});

var EditModulePage = require("./EditModulePage.jsx").EditModulePage;

function EditModulePageController(ctx, next) {
    React.render(React.createElement(EditModulePage, { context: ctx, module: ctx.params.module }), window.app.domRoot);
}

},{"./EditModulePage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePage.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleViewPage.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var ModuleViewPage = exports.ModuleViewPage = (function (_React$Component) {
    function ModuleViewPage() {
        _classCallCheck(this, ModuleViewPage);

        this.state = {
            loaded: false
        };
    }

    _inherits(ModuleViewPage, _React$Component);

    _createClass(ModuleViewPage, {
        componentDidMount: {
            value: function componentDidMount() {
                $.get("/concepts/concept/" + this.props.context.params.module, (function (data) {
                    this.setState({ learningModule: data.learning_module, contents: data.contents, loaded: true });
                }).bind(this));
            }
        },
        render: {
            value: function render() {
                console.log(this.props.context);

                var body;

                if (this.state.loaded) {
                    body = React.createElement(
                        "div",
                        { className: "box" },
                        React.createElement(
                            "h3",
                            null,
                            this.props.context.params.project
                        ),
                        React.createElement(
                            "h2",
                            null,
                            this.state.learningModule.title
                        ),
                        React.createElement(
                            "ul",
                            null,
                            this.state.contents.map(function (concept) {
                                return React.createElement(
                                    "li",
                                    null,
                                    concept
                                );
                            })
                        )
                    );
                }

                return React.createElement(
                    "div",
                    null,
                    body
                );
            }
        }
    });

    return ModuleViewPage;
})(React.Component);

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleViewPageController.jsx":[function(require,module,exports){
"use strict";

exports.ModuleViewPageController = ModuleViewPageController;
Object.defineProperty(exports, "__esModule", {
    value: true
});

var ModuleViewPage = require("./ModuleViewPage.jsx").ModuleViewPage;

function ModuleViewPageController(ctx, next) {
    React.render(React.createElement(ModuleViewPage, { context: ctx }), window.app.domRoot);
}

},{"./ModuleViewPage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleViewPage.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectPageController.jsx":[function(require,module,exports){
"use strict";

exports.ProjectPageController = ProjectPageController;
Object.defineProperty(exports, "__esModule", {
    value: true
});

var ProjectStart = require("../components/ProjectStart.react.jsx").ProjectStart;

function ProjectPageController(ctx, next) {
    React.render(React.createElement(ProjectStart, { context: ctx }), window.app.domRoot);
}

},{"../components/ProjectStart.react.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/ProjectStart.react.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/router.jsx":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var page = _interopRequire(require("page"));

var ProjectPageController = require("./pages/ProjectPageController.jsx").ProjectPageController;

var ModuleViewPageController = require("./pages/ModuleViewPageController.jsx").ModuleViewPageController;

var EditModulePageController = require("./pages/EditModulePageController.jsx").EditModulePageController;

var Test = require("./components/Test.react.jsx").Test;

var render = function (component) {
    return React.render(component, window.app.domRoot);
};

var baseRoute = "/concepts";

var routes = {};

routes["/"] = ProjectPageController;

routes["/test"] = function () {
    render(React.createElement(Test, null));
};

routes["/project/:project/:module"] = ModuleViewPageController;
routes["/edit"] = EditModulePageController;
routes["/edit/:module"] = EditModulePageController;

var Router = exports.Router = (function () {
    function Router() {
        _classCallCheck(this, Router);

        this.baseRoute = "/concepts";
    }

    _createClass(Router, {
        start: {
            value: function start() {

                page("*", function (ctx, next) {
                    if (ctx.init) {
                        next();
                    } else {
                        window.app.domRoot.classList.add("transition");
                        setTimeout(function () {
                            window.app.domRoot.classList.remove("transition");
                            next();
                        }, 300);
                    }
                });

                for (var i in routes) {
                    page(baseRoute + i, routes[i]);
                }

                page(this.baseRoute + "/*", function () {});

                page();
            }
        }
    });

    return Router;
})();

},{"./components/Test.react.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Test.react.jsx","./pages/EditModulePageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePageController.jsx","./pages/ModuleViewPageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleViewPageController.jsx","./pages/ProjectPageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectPageController.jsx","page":"page"}]},{},["./javascript/jsx/app.jsx"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9hcHAuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvQ29tcG9uZW50LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L0V2ZW50cy5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9TbHVnLmpzIiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvVXRpbC5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9jb21wb25lbnRzL0FjZUVkaXRvci5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9jb21wb25lbnRzL0Zsb2F0aW5nQnV0dG9uLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvUHJvamVjdFN0YXJ0LnJlYWN0LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvU29ydGFibGUuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvY29tcG9uZW50cy9UZXN0LnJlYWN0LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvZWRpdGluZy9Db2RlQ29udGVudC5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9jb21wb25lbnRzL2VkaXRpbmcvQ29udGVudFR5cGUuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvY29tcG9uZW50cy9lZGl0aW5nL0NvbnRlbnRUeXBlVG9vbGJhci5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9jb21wb25lbnRzL2VkaXRpbmcvSW1hZ2VDb250ZW50LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvZWRpdGluZy9NYXJrZG93bkNvbnRlbnQuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvY29tcG9uZW50cy9lZGl0aW5nL01hdGhDb250ZW50LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L3BhZ2VzL0VkaXRNb2R1bGVQYWdlLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L3BhZ2VzL0VkaXRNb2R1bGVQYWdlQ29udHJvbGxlci5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9wYWdlcy9Nb2R1bGVWaWV3UGFnZS5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9wYWdlcy9Nb2R1bGVWaWV3UGFnZUNvbnRyb2xsZXIuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvcGFnZXMvUHJvamVjdFBhZ2VDb250cm9sbGVyLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1w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QUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxnQkFBZ0IsRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OztJQUsza0MsU0FBUyxXQUFULFNBQVM7QUFDUCxhQURGLFNBQVMsQ0FDTixLQUFLLEVBQUU7OEJBRFYsU0FBUzs7QUFHZCxtQ0FISyxTQUFTLDZDQUdSLEtBQUssRUFBRTs7QUFFYixZQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQ3BDLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ3RCOztjQVBRLFNBQVM7O2lCQUFULFNBQVM7QUFTbEIseUJBQWlCO21CQUFBLDZCQUFHOztBQUVoQixtQkFBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLDZDQUE2QyxDQUFDLENBQUM7O0FBRTFFLGlCQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDMUUsd0JBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFbEIsd0JBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFDL0I7QUFDSSwrQkFBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3JDLCtCQUFPO3FCQUNWOztBQUVELHdCQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUU3Qix3QkFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRTtBQUNyQixnQ0FBUSxFQUFFLFVBQVU7QUFDcEIsNkJBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFO0FBQ2pCLDhCQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0FBQ3ZELCtCQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQzVCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRXBCLHNCQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFMUIsd0JBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbkMsd0JBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLHdCQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDckQsd0JBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlDLHdCQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5Qyx3QkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0Msd0JBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7OztBQUczQyx3QkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFO0FBQy9CLDRCQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBRSxVQUFTLENBQUMsRUFBRTtBQUNoRCw4QkFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDN0MsZ0NBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7QUFDNUIsb0NBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs2QkFDbkU7eUJBQ0osQ0FBQSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO3FCQUNuQjtpQkFFSixDQUFBLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7YUFDbkI7O0FBRUQsNkJBQXFCO21CQUFBLCtCQUFDLENBQUMsRUFBRTtBQUNyQixvQkFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMvQixvQkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFOUQsb0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtBQUM3Qix3QkFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQzthQUNKOztBQUVELGNBQU07bUJBQUEsa0JBQUc7O0FBRUwsb0JBQUksaUJBQWlCLENBQUM7O0FBRXRCLG9CQUFJLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUU7QUFDbEMscUNBQWlCLEdBQUcsQ0FDaEIsK0JBQU8sT0FBTyxFQUFDLFVBQVUsR0FBUyxFQUNsQzs7MEJBQVEsRUFBRSxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQzt3QkFFakcsS0FBSyxDQUFDLEdBQUcsQ0FBRSxVQUFTLElBQUksRUFBRTtBQUN0QixtQ0FBTzs7a0NBQVEsS0FBSyxFQUFFLElBQUksQUFBQztnQ0FBRSxJQUFJOzZCQUFVLENBQUM7eUJBQy9DLENBQUU7cUJBRUYsQ0FDWixDQUFDO2lCQUNMOztBQUVELHVCQUNJOzs7b0JBQ0ssaUJBQWlCO29CQUNsQixrQ0FBVSxTQUFTLEVBQUMsY0FBYyxFQUFDLGVBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUMsRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEFBQUMsR0FBRztpQkFDckcsQ0FDUjthQUNMOzs7O1dBdkZRLFNBQVM7R0FBUyxLQUFLLENBQUMsU0FBUzs7QUEwRjlDLFNBQVMsQ0FBQyxZQUFZLEdBQUc7QUFDckIsWUFBUSxFQUFFLFVBQVU7QUFDcEIsVUFBTSxFQUFFLEVBQUU7QUFDVixTQUFLLEVBQUUsRUFBRTtBQUNULHNCQUFrQixFQUFFLElBQUk7QUFDeEIseUJBQXFCLEVBQUUsS0FBSztDQUMvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUN2R1csY0FBYyxXQUFkLGNBQWM7QUFFWixhQUZGLGNBQWMsR0FFVDs4QkFGTCxjQUFjO0tBSXRCOztjQUpRLGNBQWM7O2lCQUFkLGNBQWM7QUFNdkIseUJBQWlCO21CQUFBLDZCQUFHO0FBQ2hCLG9CQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVqQyxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6Qzs7QUFFRCxjQUFNO21CQUFBLGtCQUFHOztBQUVMLG9CQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUNyQyxvQkFBSSxPQUFPLFNBQVMsSUFBSSxXQUFXLEVBQUU7QUFDakMsNkJBQVMsR0FBRyxFQUFFLENBQUM7aUJBQ2xCOztBQUVELHVCQUFPOztzQkFBSyxTQUFTLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxBQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxBQUFDO29CQUFDLDJCQUFHLFNBQVMsRUFBRSxXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFNLFNBQVMsQUFBQyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDLEdBQUc7aUJBQU0sQ0FBQzthQUVsTTs7OztXQXJCUSxjQUFjO0dBQVMsS0FBSyxDQUFDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBM0MsU0FBUyxXQUFPLGtCQUFrQixFQUFsQyxTQUFTOztJQUNULFdBQVcsV0FBTywyQkFBMkIsRUFBN0MsV0FBVzs7SUFDWCxXQUFXLFdBQU8sMkJBQTJCLEVBQTdDLFdBQVc7O0lBQ1gsZUFBZSxXQUFPLCtCQUErQixFQUFyRCxlQUFlOztJQUNoQixJQUFJLDJCQUFNLE1BQU07O0lBRVYsWUFBWSxXQUFaLFlBQVk7QUFFVixhQUZGLFlBQVksQ0FFVCxLQUFLLEVBQ2pCOzhCQUhTLFlBQVk7O0FBSWpCLG1DQUpLLFlBQVksNkNBSVgsS0FBSyxFQUFFO0FBQ2IsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDaEM7O2NBTlEsWUFBWTs7aUJBQVosWUFBWTtBQVFyQixnQkFBUTttQkFBQSxvQkFDUjtBQUNJLHVCQUFPO0FBQ0gseUJBQUssRUFBRSxPQUFPO0FBQ2Qsd0JBQUksRUFBRSxLQUFLO0FBQ1gsNkJBQVMsRUFBRSxLQUFLO2lCQUNuQixDQUFDO2FBQ0w7O0FBRUQsZ0JBQVE7bUJBQUEsa0JBQUMsQ0FBQyxFQUNWO0FBQ0ksdUJBQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekIsb0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQzFCOztBQUVELFlBQUk7bUJBQUEsY0FBQyxDQUFDLEVBQUU7QUFDSixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQzthQUNyRDs7QUFFRCxjQUFNO21CQUFBLGtCQUFHO0FBQ0wsdUJBQ0k7O3NCQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQjs7OztxQkFBNEI7b0JBQzVCOzswQkFBRyxJQUFJLEVBQUMsZ0JBQWdCOztxQkFBZTtvQkFDdkMsb0JBQUMsV0FBVyxJQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQyxFQUFDLEtBQUssRUFBQyxvQkFBb0IsR0FBRztvQkFDN0Usb0JBQUMsV0FBVyxJQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQyxFQUFDLEtBQUssRUFBQyxzQkFBbUIsR0FBRztvQkFDNUUsb0JBQUMsZUFBZSxJQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQyxFQUFDLEtBQUssRUFBQyxhQUFhLEdBQUc7b0JBRTFFOzswQkFBUSxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDOztxQkFFekQ7b0JBRVQ7OzBCQUFLLFNBQVMsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7d0JBQ3RFOzs4QkFBUSxTQUFTLEVBQUMsaUJBQWlCOzt5QkFFMUI7d0JBRVQ7OzhCQUFRLFNBQVMsRUFBQyxpQkFBaUI7O3lCQUUxQjt3QkFFVDs7OEJBQVEsU0FBUyxFQUFDLGlCQUFpQjs7eUJBRTFCO3FCQUNQO2lCQUNKLENBQ1I7YUFDTDs7OztXQXZEUSxZQUFZO0dBQVMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7QUNOM0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUVwQixRQUFRLFdBQVIsUUFBUTthQUFSLFFBQVE7OEJBQVIsUUFBUTs7Ozs7OztjQUFSLFFBQVE7O2lCQUFSLFFBQVE7QUFFakIseUJBQWlCO21CQUFBLDZCQUFHO0FBQ2hCLG9CQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLG9CQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRWhCLHVCQUFPLENBQUMsRUFBRSxFQUFFO0FBQ1IseUJBQUssRUFBRSxlQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0FBQ3BDLCtCQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3ZDO2lCQUNKLENBQUMsQ0FBQzthQUNOOztBQUdELGNBQU07bUJBQUEsa0JBQUc7QUFDTCx1QkFBUTs7c0JBQUssU0FBUyxFQUFDLFVBQVU7b0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2lCQUFPLENBQUU7YUFDbEU7Ozs7V0FoQlEsUUFBUTtHQUFTLEtBQUssQ0FBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0ZyQyxTQUFTLFdBQU8sa0JBQWtCLEVBQWxDLFNBQVM7O0lBRUosSUFBSSxXQUFKLElBQUk7QUFDRixhQURGLElBQUksQ0FDRCxLQUFLLEVBQ2pCOzhCQUZTLElBQUk7O0FBR1QsbUNBSEssSUFBSSw2Q0FHSCxLQUFLLEVBQUU7S0FDaEI7O2NBSlEsSUFBSTs7aUJBQUosSUFBSTtBQU1iLGNBQU07bUJBQUEsa0JBQ047QUFDSSx1QkFDSTs7OztpQkFBYSxDQUNYO2FBQ1Q7Ozs7V0FYUSxJQUFJO0dBQVMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJDRjBDLFlBQVk7O0lBQWpGLE1BQU0sY0FBTixNQUFNO0lBQUUsbUJBQW1CLGNBQW5CLG1CQUFtQjtJQUFFLGlDQUFpQyxjQUFqQyxpQ0FBaUM7O0lBQzlELFdBQVcsV0FBTyxvQ0FBb0MsRUFBdEQsV0FBVzs7SUFDWCxTQUFTLFdBQU8sMEJBQTBCLEVBQTFDLFNBQVM7O0lBRUosV0FBVyxXQUFYLFdBQVc7QUFFVCxhQUZGLFdBQVcsQ0FFUixLQUFLLEVBQUU7OEJBRlYsV0FBVzs7QUFHaEIsbUNBSEssV0FBVyw2Q0FHRSxLQUFLLEVBQUU7O0FBRXpCLFlBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCxtQkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztBQUN6QixvQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUM3QixjQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1NBQ3BCLENBQUM7S0FDTDs7Y0FWUSxXQUFXOztpQkFBWCxXQUFXO0FBWXBCLHlCQUFpQjttQkFBQSw2QkFBRztBQUNoQixzQkFBTSxDQUFDLGFBQWEsQ0FBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO2FBQzdFOztBQUVELDJCQUFtQjttQkFBQSwrQkFBRztBQUNsQixzQkFBTSxDQUFDLGVBQWUsQ0FBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO2FBQy9FOztBQUVELG9CQUFZO21CQUFBLHNCQUFDLENBQUMsRUFBRTtBQUNaLG9CQUFJLElBQUksR0FBRztBQUNQLGdDQUFZLEVBQUU7QUFDViw0QkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztBQUN4QixnQ0FBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUM3QiwwQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtxQkFDcEI7aUJBQ0osQ0FBQztBQUNGLGlCQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25FOztBQUVELG9CQUFZO21CQUFBLHNCQUFDLElBQUksRUFBRTtBQUNmLG9CQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZCx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztpQkFDaEM7O0FBRUQsc0JBQU0sQ0FBQyxRQUFRLENBQUMsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUQ7O0FBRUQsc0JBQWM7bUJBQUEsd0JBQUMsSUFBSSxFQUFFO0FBQ2pCLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7YUFDbkM7O0FBRUQscUJBQWE7bUJBQUEsdUJBQUMsT0FBTyxFQUFFO0FBQ25CLG9CQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQzthQUNoQzs7QUFFRCxZQUFJO21CQUFBLGNBQUMsQ0FBQyxFQUFFO0FBQ0osb0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN2Qix3QkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN4Qyx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNsQzthQUNKOztBQUVELFlBQUk7bUJBQUEsY0FBQyxDQUFDLEVBQUU7QUFDSixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQztBQUM3QyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ25DOztBQUVELGNBQU07bUJBQUEsZ0JBQUMsQ0FBQyxFQUFFO0FBQ04sb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUNuQzs7QUFFRCxjQUFNO21CQUFBLGtCQUFHOztBQUVMLG9CQUFJLElBQUksR0FDSjtBQUFDLCtCQUFXO3NCQUFDLEtBQUssRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO29CQUM1RCxvQkFBQyxTQUFTLElBQUMscUJBQXFCLEVBQUUsSUFBSSxBQUFDLEVBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsRUFBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUMsR0FBRztvQkFDdE07OzBCQUFRLFNBQVMsRUFBQyxzQkFBc0IsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7O3FCQUFjO29CQUNyRjs7MEJBQVEsU0FBUyxFQUFDLHNCQUFzQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQzs7cUJBQWdCO2lCQUMvRSxBQUNqQixDQUFDOztBQUVGLG9CQUFJLElBQUksR0FDSjs7c0JBQUssV0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQUFBQztvQkFDeEI7OzBCQUFNLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQzt3QkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO3FCQUNoQjtpQkFDTCxBQUNULENBQUM7O0FBRUYsb0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRS9DLHVCQUFPLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzNFOzs7O1dBcEZRLFdBQVc7R0FBUyxLQUFLLENBQUMsU0FBUzs7QUF1RmhELFdBQVcsQ0FBQyxZQUFZLEdBQUc7QUFDdkIsWUFBUSxFQUFFLFlBQVk7QUFDdEIsU0FBSyxFQUFFLEVBQUU7QUFDVCxNQUFFLEVBQUUsSUFBSTtDQUNYLENBQUE7Ozs7Ozs7Ozs7Ozs7OztJQy9GTyxrQkFBa0IsV0FBTywwQkFBMEIsRUFBbkQsa0JBQWtCOztJQUNsQixjQUFjLFdBQU8sK0JBQStCLEVBQXBELGNBQWM7O0lBRVQsV0FBVyxXQUFYLFdBQVc7YUFBWCxXQUFXOzhCQUFYLFdBQVc7Ozs7Ozs7Y0FBWCxXQUFXOztpQkFBWCxXQUFXO0FBQ3BCLGNBQU07bUJBQUEsa0JBQUc7QUFDTCx1QkFDSTs7c0JBQUssU0FBUyxFQUFFLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLFVBQVUsR0FBRyxFQUFFLEFBQUM7b0JBQ3RFO0FBQUMsMENBQWtCOzBCQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQzt3QkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7cUJBQXNCO29CQUN0RixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7aUJBQ2xCLENBQ1I7YUFDTDs7OztXQVJRLFdBQVc7R0FBUyxLQUFLLENBQUMsU0FBUzs7QUFXaEQsV0FBVyxDQUFDLGVBQWUsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFOztBQUU5RCxRQUFJLEtBQUssR0FBRyxDQUNSOztVQUFLLFNBQVMsRUFBQyxxQ0FBcUM7UUFDaEQ7QUFBQywwQkFBYztjQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVE7O1NBQXNCO1FBQ3RFO0FBQUMsMEJBQWM7Y0FBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBRSxXQUFXLEFBQUM7O1NBQXNCO0tBQ3ZFLEVBQ04sRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFDLENBQ1osQ0FBQzs7QUFFRixRQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN2QixhQUFLLEdBQUcsT0FBTyxDQUFDO0tBQ25COztBQUVELFdBQ0k7O1VBQUssU0FBUyxFQUFFLG1CQUFtQixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQSxBQUFDLEFBQUM7UUFDMUUsS0FBSztLQUNKLENBQ1I7Q0FDTCxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNqQ1ksa0JBQWtCLFdBQWxCLGtCQUFrQjthQUFsQixrQkFBa0I7OEJBQWxCLGtCQUFrQjs7Ozs7OztjQUFsQixrQkFBa0I7O2lCQUFsQixrQkFBa0I7QUFDM0IsY0FBTTttQkFBQSxrQkFBRztBQUNMLHVCQUNJOztzQkFBSyxTQUFTLEVBQUMsc0JBQXNCO29CQUNqQzs7O3dCQUNJLDJCQUFHLFNBQVMsRUFBRSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQyxHQUFHO3dCQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7cUJBQ25CO2lCQUNILENBQ1I7YUFDTDs7OztXQVZRLGtCQUFrQjtHQUFTLEtBQUssQ0FBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozt5QkNBc0IsWUFBWTs7SUFBakYsTUFBTSxjQUFOLE1BQU07SUFBRSxtQkFBbUIsY0FBbkIsbUJBQW1CO0lBQUUsaUNBQWlDLGNBQWpDLGlDQUFpQzs7SUFDOUQsV0FBVyxXQUFPLG9DQUFvQyxFQUF0RCxXQUFXOztJQUNYLFNBQVMsV0FBTywwQkFBMEIsRUFBMUMsU0FBUzs7QUFDakIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUVsQixZQUFZLFdBQVosWUFBWTtBQUVWLGFBRkYsWUFBWSxDQUVULEtBQUssRUFBRTs4QkFGVixZQUFZOztBQUdqQixtQ0FISyxZQUFZLDZDQUdDLEtBQUssRUFBRTs7QUFFekIsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULG1CQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQ3pCLGNBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7U0FDcEIsQ0FBQztLQUNMOztjQVRRLFlBQVk7O2lCQUFaLFlBQVk7QUFXckIseUJBQWlCO21CQUFBLDZCQUFHO0FBQ2hCLHNCQUFNLENBQUMsYUFBYSxDQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7YUFDN0U7O0FBRUQsMkJBQW1CO21CQUFBLCtCQUFHO0FBQ2xCLHNCQUFNLENBQUMsZUFBZSxDQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7YUFDL0U7O0FBRUQsb0JBQVk7bUJBQUEsc0JBQUMsQ0FBQyxFQUFFO0FBQ1osb0JBQUksSUFBSSxHQUFHO0FBQ1AsaUNBQWEsRUFBRTtBQUNYLDJCQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO0FBQ3ZCLDBCQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO3FCQUNwQjtpQkFDSixDQUFDO0FBQ0YsaUJBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDcEU7O0FBRUQsb0JBQVk7bUJBQUEsc0JBQUMsSUFBSSxFQUFFO0FBQ2Ysb0JBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNkLHdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO2lCQUNoQzs7QUFFRCxzQkFBTSxDQUFDLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM1RDs7QUFFRCxxQkFBYTttQkFBQSx1QkFBQyxPQUFPLEVBQUU7QUFDcEIsb0JBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2FBQy9COztBQUVELFlBQUk7bUJBQUEsY0FBQyxDQUFDLEVBQUU7QUFDSixvQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFO0FBQ3ZCLHdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ3hDLHdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ2xDO2FBQ0o7O0FBRUQsWUFBSTttQkFBQSxjQUFDLENBQUMsRUFBRTtBQUNKLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDO0FBQzdDLG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDbkM7O0FBRUQsY0FBTTttQkFBQSxnQkFBQyxDQUFDLEVBQUU7QUFDTixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ25DOztBQUVELGNBQU07bUJBQUEsa0JBQUc7O0FBRUwsb0JBQUksSUFBSSxHQUNKO0FBQUMsK0JBQVc7c0JBQUMsS0FBSyxFQUFDLGVBQWUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUM7b0JBQzdELG9CQUFDLFNBQVMsSUFBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQUFBQyxHQUFHO29CQUM1Rzs7MEJBQVEsU0FBUyxFQUFDLHNCQUFzQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQzs7cUJBQWM7b0JBQ3JGOzswQkFBUSxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDOztxQkFBZ0I7aUJBQy9FLEFBQ2pCLENBQUM7O0FBRUYsb0JBQUksSUFBSSxHQUNKOztzQkFBSyxXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxBQUFDO29CQUN4Qiw2QkFBSyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUMsR0FBRztpQkFDOUIsQUFDVCxDQUFDOztBQUVGLG9CQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUUvQyx1QkFBTyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUMzRTs7OztXQTVFUSxZQUFZO0dBQVMsS0FBSyxDQUFDLFNBQVM7O0FBK0VqRCxZQUFZLENBQUMsWUFBWSxHQUFHO0FBQ3hCLFNBQUssRUFBRSxFQUFFO0FBQ1QsTUFBRSxFQUFFLElBQUk7Q0FDWCxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozt5QkN2RjRFLFlBQVk7O0lBQWpGLE1BQU0sY0FBTixNQUFNO0lBQUUsbUJBQW1CLGNBQW5CLG1CQUFtQjtJQUFFLGlDQUFpQyxjQUFqQyxpQ0FBaUM7O0lBQzlELFdBQVcsV0FBTyxvQ0FBb0MsRUFBdEQsV0FBVzs7SUFDWCxTQUFTLFdBQU8sMEJBQTBCLEVBQTFDLFNBQVM7O0FBQ2pCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBRTFCLGVBQWUsV0FBZixlQUFlO0FBRWIsYUFGRixlQUFlLENBRVosS0FBSyxFQUFFOzhCQUZWLGVBQWU7O0FBR3BCLG1DQUhLLGVBQWUsNkNBR0YsS0FBSyxFQUFFOztBQUV6QixZQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1QsbUJBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDekIsY0FBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUNwQixDQUFDO0tBQ0w7O2NBVFEsZUFBZTs7aUJBQWYsZUFBZTtBQVd4Qix5QkFBaUI7bUJBQUEsNkJBQUc7QUFDaEIsc0JBQU0sQ0FBQyxhQUFhLENBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztBQUMxRSxvQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCOztBQUVELDJCQUFtQjttQkFBQSwrQkFBRztBQUNsQixzQkFBTSxDQUFDLGVBQWUsQ0FBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO2FBQy9FOztBQUVELDBCQUFrQjttQkFBQSw4QkFBRztBQUNqQixvQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCOztBQUVELG9CQUFZO21CQUFBLHNCQUFDLENBQUMsRUFBRTtBQUNaLG9CQUFJLElBQUksR0FBRztBQUNQLG9DQUFnQixFQUFFO0FBQ2QsNEJBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87QUFDeEIsMEJBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7cUJBQ3BCO2lCQUNKLENBQUM7QUFDRixpQkFBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN2RTs7QUFFRCxvQkFBWTttQkFBQSxzQkFBQyxJQUFJLEVBQUU7QUFDZixvQkFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2Qsd0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7aUJBQ2hDOztBQUVELHNCQUFNLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVEOztBQUVELHFCQUFhO21CQUFBLHVCQUFDLE9BQU8sRUFBRTtBQUNwQixvQkFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7YUFDL0I7O0FBRUQsa0JBQVU7bUJBQUEsc0JBQUc7QUFDVCxvQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ3JCLHdCQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUVyQyx3QkFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELHdCQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0Qyx3QkFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFeEMsZ0NBQVksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztpQkFDNUQ7YUFDSjs7QUFJRCxZQUFJO21CQUFBLGNBQUMsQ0FBQyxFQUFFO0FBQ0osb0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN2Qix3QkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN4Qyx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNsQzthQUNKOztBQUVELFlBQUk7bUJBQUEsY0FBQyxDQUFDLEVBQUU7QUFDSixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQztBQUM3QyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ25DOztBQUVELGNBQU07bUJBQUEsZ0JBQUMsQ0FBQyxFQUFFO0FBQ04sb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUNuQzs7QUFFRCxjQUFNO21CQUFBLGtCQUFHOztBQUVMLG9CQUFJLElBQUksR0FDSjtBQUFDLCtCQUFXO3NCQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUM7b0JBQ2hFLG9CQUFDLFNBQVMsSUFBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQUFBQyxHQUFHO29CQUM1Rzs7MEJBQVEsU0FBUyxFQUFDLHNCQUFzQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQzs7cUJBQWM7b0JBQ3JGOzswQkFBUSxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDOztxQkFBZ0I7aUJBQy9FLEFBQ2pCLENBQUM7O0FBRUYsb0JBQUksSUFBSSxHQUNKOztzQkFBSyxXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxBQUFDO29CQUN4Qiw2QkFBSyxTQUFTLEVBQUMsa0JBQWtCLEdBQU87aUJBQ3RDLEFBQ1QsQ0FBQzs7QUFFRixvQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFL0MsdUJBQU8sV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDM0U7Ozs7V0EvRlEsZUFBZTtHQUFTLEtBQUssQ0FBQyxTQUFTOztBQWtHcEQsZUFBZSxDQUFDLFlBQVksR0FBRztBQUMzQixTQUFLLEVBQUUsRUFBRTtBQUNULE1BQUUsRUFBRSxJQUFJO0NBQ1gsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJDM0c0RSxZQUFZOztJQUFqRixNQUFNLGNBQU4sTUFBTTtJQUFFLG1CQUFtQixjQUFuQixtQkFBbUI7SUFBRSxpQ0FBaUMsY0FBakMsaUNBQWlDOztJQUM5RCxXQUFXLFdBQU8sb0NBQW9DLEVBQXRELFdBQVc7O0lBQ1gsU0FBUyxXQUFPLDBCQUEwQixFQUExQyxTQUFTOztBQUNqQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0lBRWhCLFdBQVcsV0FBWCxXQUFXO0FBRVQsYUFGRixXQUFXLENBRVIsS0FBSyxFQUFFOzhCQUZWLFdBQVc7O0FBR2hCLG1DQUhLLFdBQVcsNkNBR0UsS0FBSyxFQUFFOztBQUV6QixZQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1QsbUJBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDekIsbUJBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7QUFDL0IsY0FBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUNwQixDQUFDO0tBQ0w7O2NBVlEsV0FBVzs7aUJBQVgsV0FBVztBQVlwQix5QkFBaUI7bUJBQUEsNkJBQUc7QUFDaEIsc0JBQU0sQ0FBQyxhQUFhLENBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztBQUMxRSxvQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCOztBQUVELDJCQUFtQjttQkFBQSwrQkFBRztBQUNsQixzQkFBTSxDQUFDLGVBQWUsQ0FBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO2FBQy9FOztBQUVELDBCQUFrQjttQkFBQSw4QkFBRztBQUNqQixvQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCOztBQUVELG9CQUFZO21CQUFBLHNCQUFDLENBQUMsRUFBRTtBQUNaLG9CQUFJLElBQUksR0FBRztBQUNQLGdDQUFZLEVBQUU7QUFDViw0QkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztBQUN4QiwwQkFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtxQkFDcEI7aUJBQ0osQ0FBQztBQUNGLGlCQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25FOztBQUVELG9CQUFZO21CQUFBLHNCQUFDLElBQUksRUFBRTtBQUNmLG9CQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZCx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztpQkFDaEM7O0FBRUQsc0JBQU0sQ0FBQyxRQUFRLENBQUMsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUQ7O0FBRUQscUJBQWE7bUJBQUEsdUJBQUMsT0FBTyxFQUFFO0FBQ25CLG9CQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQzthQUNoQzs7QUFFRCxrQkFBVTttQkFBQSxzQkFBRztBQUNULG9CQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDckIsMkJBQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM5Qix3QkFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFckMsd0JBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEQsd0JBQUk7QUFDQSw2QkFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztxQkFDekUsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNWLG9DQUFZLENBQUMsU0FBUyxHQUFHLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztxQkFDeEQ7aUJBQ0o7YUFDSjs7QUFFRCxZQUFJO21CQUFBLGNBQUMsQ0FBQyxFQUFFO0FBQ0osb0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN2Qix3QkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN4Qyx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNsQzthQUNKOztBQUVELFlBQUk7bUJBQUEsY0FBQyxDQUFDLEVBQUU7QUFDSixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQztBQUM3QyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ25DOztBQUVELGNBQU07bUJBQUEsZ0JBQUMsQ0FBQyxFQUFFO0FBQ04sb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUNuQzs7QUFFRCxjQUFNO21CQUFBLGtCQUFHOztBQUVMLG9CQUFJLElBQUksR0FDSjtBQUFDLCtCQUFXO3NCQUFDLEtBQUssRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO29CQUM1RCxvQkFBQyxTQUFTLElBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEFBQUMsR0FBRztvQkFDekc7OzBCQUFRLFNBQVMsRUFBQyxzQkFBc0IsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7O3FCQUFjO29CQUNyRjs7MEJBQVEsU0FBUyxFQUFDLHNCQUFzQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQzs7cUJBQWdCO2lCQUMvRSxBQUNqQixDQUFDOztBQUVGLG9CQUFJLElBQUksR0FDSjs7c0JBQUssV0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQUFBQztvQkFDeEIsNkJBQUssU0FBUyxFQUFDLGNBQWMsR0FBTztpQkFDbEMsQUFDVCxDQUFDOztBQUVGLG9CQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUUvQyx1QkFBTyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUMzRTs7OztXQWhHUSxXQUFXO0dBQVMsS0FBSyxDQUFDLFNBQVM7O0FBbUdoRCxXQUFXLENBQUMsWUFBWSxHQUFHO0FBQ3ZCLFNBQUssRUFBRSxFQUFFO0FBQ1QsTUFBRSxFQUFFLElBQUk7Q0FDWCxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztJQzNHTyxJQUFJLFdBQU8sVUFBVSxFQUFyQixJQUFJOzt5QkFDaUUsWUFBWTs7SUFBakYsTUFBTSxjQUFOLE1BQU07SUFBRSxtQkFBbUIsY0FBbkIsbUJBQW1CO0lBQUUsaUNBQWlDLGNBQWpDLGlDQUFpQzs7SUFDOUQsV0FBVyxXQUFPLG9DQUFvQyxFQUF0RCxXQUFXOztJQUNYLFdBQVcsV0FBTyxvQ0FBb0MsRUFBdEQsV0FBVzs7SUFDWCxlQUFlLFdBQU8sd0NBQXdDLEVBQTlELGVBQWU7O0lBQ2YsWUFBWSxXQUFPLHFDQUFxQyxFQUF4RCxZQUFZOztJQUNaLFFBQVEsV0FBTyx5QkFBeUIsRUFBeEMsUUFBUTs7SUFDUixjQUFjLFdBQU8sK0JBQStCLEVBQXBELGNBQWM7O0lBQ2QsU0FBUyxXQUFPLDBCQUEwQixFQUExQyxTQUFTOztJQUNULElBQUksV0FBTyxTQUFTLEVBQXBCLElBQUk7O0FBRVosSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUVkLGNBQWMsV0FBZCxjQUFjO0FBQ1osYUFERixjQUFjLENBQ1gsS0FBSyxFQUFFOzhCQURWLGNBQWM7O0FBRW5CLG1DQUZLLGNBQWMsNkNBRUQsS0FBSyxFQUFFOztBQUV6QixZQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1QsbUJBQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNiLHlCQUFhLEVBQUUsSUFBSTtBQUNuQix5QkFBYSxFQUFFLEVBQUU7QUFDakIsb0JBQVEsRUFBRSxFQUFFO0FBQ1osaUJBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDdkIsZ0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7U0FDeEIsQ0FBQTs7QUFFRCxZQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztLQUN4Qjs7Y0FkUSxjQUFjOztpQkFBZCxjQUFjO0FBZ0J2QixtQkFBVzttQkFBQSxxQkFBQyxDQUFDLEVBQUU7QUFDWCxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDdkMsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUM3RDs7QUFFRCxrQkFBVTttQkFBQSxvQkFBQyxDQUFDLEVBQUU7QUFDVixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDekM7O0FBS0QseUJBQWlCO21CQUFBLDZCQUFHO0FBQ2hCLHNCQUFNLENBQUMsYUFBYSxDQUFFLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQzs7QUFFOUYsb0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDbkIscUJBQUMsQ0FBQyxHQUFHLHdCQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNoRjthQUNKOztBQUVELG1CQUFXO21CQUFBLHFCQUFDLElBQUksRUFBRTtBQUNkLHVCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUdsQixvQkFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUVoQixxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLHdCQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLDJCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5Qiw0QkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFRO0FBQzNCLDZCQUFLLGlCQUFpQjtBQUNsQixrQ0FBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQsa0NBQU07QUFBQSxBQUNWLDZCQUFLLGFBQWE7QUFDZCxrQ0FBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELGtDQUFNO0FBQUEsQUFDViw2QkFBSyxhQUFhO0FBQ2Qsa0NBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRCxrQ0FBTTtBQUFBLEFBQ1YsNkJBQUssY0FBYztBQUNmLGtDQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsa0NBQU07QUFBQSxxQkFDYjtpQkFDSjs7QUFFRCxvQkFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLHlCQUFLLEVBQUUsSUFBSSxnQkFBbUIsQ0FBQyxLQUFLO0FBQ3BDLHdCQUFJLEVBQUUsSUFBSSxnQkFBbUIsQ0FBQyxJQUFJO0FBQ2xDLGlDQUFhLEVBQUUsTUFBTTtpQkFDeEIsQ0FBQyxDQUFDO2FBQ047O0FBRUQsMkJBQW1CO21CQUFBLCtCQUFHO0FBQ2xCLHNCQUFNLENBQUMsZUFBZSxDQUFFLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQzthQUNuRzs7QUFFRCwwQkFBa0I7bUJBQUEsOEJBQUc7QUFDakIsb0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7QUFFbkIsb0JBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7QUFDckQsMkJBQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEUsd0JBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2lCQUNqQzthQUNKOztBQUVELDhCQUFzQjttQkFBQSxrQ0FBRztBQUNyQixvQkFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7O0FBRTFCLGlCQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUUsWUFBVztBQUMxRCxvQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUNsRCxDQUFDLENBQUM7O0FBRUgsdUJBQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFOUIsb0JBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNaLG9CQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUNqQyxzQkFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2lCQUMxQjs7QUFFRCxvQkFBSSxJQUFJLEdBQUc7QUFDUCw4QkFBWSxnQkFBZ0I7QUFDNUIscUNBQW1CO0FBQ2YsNkJBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDdkIsNEJBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7cUJBQ3hCO0FBQ0Qsd0JBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUMxQixDQUFDOztBQUVGLGlCQUFDLENBQUMsSUFBSSxtQkFBbUIsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN0RTs7QUFFRCwwQkFBa0I7bUJBQUEsNEJBQUMsSUFBSSxFQUFFO0FBQ3JCLHVCQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVyQyxvQkFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2Qsd0JBQUkscUJBQW1CLElBQUksQ0FBQyxFQUFFLENBQUcsQ0FBQztpQkFDckM7YUFDSjs7QUFLRCx5QkFBaUI7bUJBQUEsMkJBQUMsQ0FBQyxFQUFFLEVBRXBCOztBQU9ELGtCQUFVO21CQUFBLG9CQUFDLFFBQVEsRUFBRTtBQUNqQixvQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDdEMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs7QUFFeEIsb0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxhQUFhLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQzthQUMxQzs7QUFFRCwwQkFBa0I7bUJBQUEsNEJBQUMsR0FBRyxFQUFFO0FBQ3BCLG9CQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDbkIsdUJBQUcsR0FBRyxFQUFFLENBQUE7aUJBQ1g7O0FBRUQsdUJBQU8sb0JBQUMsZUFBZSxJQUFDLEVBQUUsRUFBRSxHQUFHLEdBQU0sQUFBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEtBQVEsQUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxBQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDLEdBQUUsQ0FBQzthQUNsSTs7QUFFRCxzQkFBYzttQkFBQSx3QkFBQyxHQUFHLEVBQUU7QUFDaEIsb0JBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtBQUNuQix1QkFBRyxHQUFHLEVBQUUsQ0FBQTtpQkFDWDs7QUFFRCx1QkFBTyxvQkFBQyxXQUFXLElBQUMsRUFBRSxFQUFFLEdBQUcsR0FBTSxBQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsS0FBUSxBQUFDLEVBQUMsUUFBUSxFQUFFLEdBQUcsU0FBWSxBQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUMsR0FBRyxDQUFDO2FBQ25IOztBQUVELHNCQUFjO21CQUFBLHdCQUFDLEdBQUcsRUFBRTtBQUNoQixvQkFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ25CLHVCQUFHLEdBQUcsRUFBRSxDQUFBO2lCQUNYOztBQUVELHVCQUFPLG9CQUFDLFdBQVcsSUFBQyxFQUFFLEVBQUUsR0FBRyxHQUFNLEFBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxLQUFRLEFBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQUFBQyxHQUFHLENBQUM7YUFDeEY7O0FBRUQsdUJBQWU7bUJBQUEseUJBQUMsR0FBRyxFQUFFO0FBQ2pCLG9CQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDbkIsdUJBQUcsR0FBRyxFQUFFLENBQUE7aUJBQ1g7O0FBRUQsdUJBQU8sb0JBQUMsWUFBWSxJQUFDLEVBQUUsRUFBRSxHQUFHLEdBQU0sQUFBQyxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUMsR0FBRyxDQUFDO2FBQzlFOztBQU9ELFlBQUk7bUJBQUEsY0FBQyxDQUFDLEVBQUU7QUFDSixzQkFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFM0Msb0JBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCOztBQU9ELGtCQUFVO21CQUFBLHNCQUFHO0FBQ1QsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7O0FBT0QsbUJBQVc7bUJBQUEsdUJBQUc7QUFDVix1QkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUM5Qjs7QUFFRCxzQkFBYzttQkFBQSx3QkFBQyxPQUFPLEVBQUU7QUFDcEIsb0JBQUk7QUFDQSx3QkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFbkMsd0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUNwQywyQkFBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3RELENBQUMsT0FBTSxHQUFHLEVBQUUsRUFFWjthQUVKOztBQU1ELGNBQU07bUJBQUEsa0JBQUc7O0FBRUwsb0JBQUksZ0JBQWdCLEdBQ2hCOztzQkFBSyxTQUFTLEVBQUMsS0FBSztvQkFDaEI7OzBCQUFLLFNBQVMsRUFBQyxLQUFLO3dCQUNoQjs7OEJBQUssU0FBUyxFQUFDLFdBQVc7NEJBQ3RCOztrQ0FBUSxFQUFFLEVBQUMsaUJBQWlCLEVBQUMsSUFBSSxFQUFDLGlCQUFpQixFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxBQUFDO2dDQUN6RyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUUsVUFBQSxNQUFNOzJDQUFJOzswQ0FBUSxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQUFBQzt3Q0FBRSxNQUFNLENBQUMsS0FBSztxQ0FBVTtpQ0FBQSxDQUFFOzZCQUNsRjt5QkFDUDt3QkFDTjs7OEJBQUssU0FBUyxFQUFDLFVBQVU7NEJBQ3JCOztrQ0FBUSxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7OzZCQUFzQjt5QkFDeEc7cUJBQ0o7aUJBQ0osQUFDVCxDQUFDOztBQUVGLHVCQUNJOztzQkFBSyxTQUFTLEVBQUMsY0FBYztvQkFDekI7OzBCQUFLLFNBQVMsRUFBQyxrQkFBa0I7d0JBRTdCOzs4QkFBSyxTQUFTLEVBQUMsS0FBSzs0QkFDaEI7O2tDQUFLLFNBQVMsRUFBQyxLQUFLO2dDQUNoQjs7c0NBQUssU0FBUyxFQUFDLFdBQVc7b0NBQ3RCOzs7O3FDQUFxQjtvQ0FDckI7OzBDQUFNLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxhQUFhLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLE1BQU07d0NBQzdFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3Q0FDekI7OzhDQUFLLFNBQVMsRUFBQyxLQUFLOzRDQUNoQjs7a0RBQUssU0FBUyxFQUFDLFVBQVU7Z0RBQ3JCOzs7b0RBQ0k7OzBEQUFPLE9BQU8sRUFBQyx1QkFBdUI7O3FEQUFzQjtvREFDNUQsK0JBQU8sUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsd0JBQXdCLEVBQUMsRUFBRSxFQUFDLHVCQUF1QixFQUFDLFNBQVMsRUFBQyxjQUFjLEdBQUc7aURBQ3ZLOzZDQUNGOzRDQUNOOztrREFBSyxTQUFTLEVBQUMsVUFBVTtnREFDckI7OztvREFDSTs7MERBQU8sT0FBTyxFQUFDLHNCQUFzQjs7cURBQStCO29EQUNwRSwrQkFBTyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyx1QkFBdUIsRUFBQyxFQUFFLEVBQUMsc0JBQXNCLEVBQUMsU0FBUyxFQUFDLGNBQWMsR0FBRztpREFDbks7NkNBQ0Y7eUNBQ0o7d0NBQ04sNkJBQUssU0FBUyxFQUFDLGFBQWEsR0FBTztxQ0FDaEM7aUNBQ0w7NkJBQ0o7eUJBQ0o7d0JBQ047OzhCQUFLLFNBQVMsRUFBQyxLQUFLOzRCQUNoQixvQkFBQyxTQUFTLElBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUUsSUFBSSxBQUFDLEdBQUc7eUJBQy9GO3dCQUNOO0FBQUMsb0NBQVE7OzRCQUNILElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7dUNBQUksS0FBSzs2QkFBQSxDQUFDO3lCQUN2Qzt3QkFDWDs7OEJBQUssU0FBUyxFQUFDLGdCQUFnQjs0QkFDM0I7QUFBQyw4Q0FBYztrQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxBQUFDOzs2QkFBMEM7NEJBQ25KO0FBQUMsOENBQWM7a0NBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEFBQUM7OzZCQUFrQzs0QkFDbEk7QUFBQyw4Q0FBYztrQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQUFBQzs7NkJBQWtDOzRCQUNsSTtBQUFDLDhDQUFjO2tDQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxBQUFDOzs2QkFBMkI7NEJBQ2pJO0FBQUMsOENBQWM7a0NBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQzs7NkJBQThCO3lCQUNqRztxQkFDSjtpQkFDSixDQUNSO2FBQ0w7Ozs7V0FqUlEsY0FBYztHQUFTLEtBQUssQ0FBQyxTQUFTOztBQW9SbkQsY0FBYyxDQUFDLFlBQVksR0FBRztBQUMxQixTQUFLLEVBQUUsRUFBRTtBQUNULFFBQUksRUFBRSxFQUFFO0NBQ1gsQ0FBQTs7Ozs7UUNsU2Usd0JBQXdCLEdBQXhCLHdCQUF3Qjs7Ozs7SUFGaEMsY0FBYyxXQUFPLHNCQUFzQixFQUEzQyxjQUFjOztBQUVmLFNBQVMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNoRCxTQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLGNBQWMsSUFBQyxPQUFPLEVBQUUsR0FBRyxBQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxBQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2pHOzs7Ozs7Ozs7Ozs7Ozs7SUNKWSxjQUFjLFdBQWQsY0FBYztBQUVaLGFBRkYsY0FBYyxHQUVUOzhCQUZMLGNBQWM7O0FBR25CLFlBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCxrQkFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQTtLQUNKOztjQU5RLGNBQWM7O2lCQUFkLGNBQWM7QUFRdkIseUJBQWlCO21CQUFBLDZCQUFHO0FBQ2hCLGlCQUFDLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQ3pELENBQUMsVUFBUyxJQUFJLEVBQUU7QUFDWix3QkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLGdCQUFtQixFQUFFLFFBQVEsRUFBRSxJQUFJLFNBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtpQkFDdEcsQ0FBQSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDaEIsQ0FBQzthQUNMOztBQUVELGNBQU07bUJBQUEsa0JBQUc7QUFDTCx1QkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVoQyxvQkFBSSxJQUFJLENBQUM7O0FBRVQsb0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDbkIsd0JBQUksR0FDQTs7MEJBQUssU0FBUyxFQUFDLEtBQUs7d0JBQ2hCOzs7NEJBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87eUJBQU07d0JBQzVDOzs7NEJBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSzt5QkFBTTt3QkFDMUM7Ozs0QkFFSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsVUFBVSxPQUFPLEVBQUc7QUFDekMsdUNBQU87OztvQ0FBSyxPQUFPO2lDQUFNLENBQUM7NkJBQzdCLENBQUM7eUJBRUQ7cUJBQ0gsQUFDVCxDQUFDO2lCQUNMOztBQUVELHVCQUNJOzs7b0JBQ0ssSUFBSTtpQkFDSCxDQUNSO2FBQ0w7Ozs7V0ExQ1EsY0FBYztHQUFTLEtBQUssQ0FBQyxTQUFTOzs7OztRQ0VuQyx3QkFBd0IsR0FBeEIsd0JBQXdCOzs7OztJQUZoQyxjQUFjLFdBQU8sc0JBQXNCLEVBQTNDLGNBQWM7O0FBRWYsU0FBUyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ2hELFNBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsY0FBYyxJQUFDLE9BQU8sRUFBRSxHQUFHLEFBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDdEU7Ozs7O1FDRmUscUJBQXFCLEdBQXJCLHFCQUFxQjs7Ozs7SUFGN0IsWUFBWSxXQUFPLHNDQUFzQyxFQUF6RCxZQUFZOztBQUViLFNBQVMscUJBQXFCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUM3QyxTQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLFlBQVksSUFBQyxPQUFPLEVBQUUsR0FBRyxBQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3BFOzs7Ozs7Ozs7Ozs7Ozs7SUNKTSxJQUFJLDJCQUFNLE1BQU07O0lBQ2YscUJBQXFCLFdBQU8sbUNBQW1DLEVBQS9ELHFCQUFxQjs7SUFDckIsd0JBQXdCLFdBQU8sc0NBQXNDLEVBQXJFLHdCQUF3Qjs7SUFDeEIsd0JBQXdCLFdBQU8sc0NBQXNDLEVBQXJFLHdCQUF3Qjs7SUFDeEIsSUFBSSxXQUFPLDZCQUE2QixFQUF4QyxJQUFJOztBQUdaLElBQU0sTUFBTSxHQUFHLFVBQUMsU0FBUztXQUFLLEtBQUssQ0FBQyxNQUFNLENBQ3RDLFNBQVMsRUFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDckI7Q0FBQSxDQUFDOztBQUVGLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQzs7QUFFNUIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUVoQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcscUJBQXFCLENBQUM7O0FBRXBDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxZQUFXO0FBQ3pCLFVBQU0sQ0FBQyxvQkFBQyxJQUFJLE9BQUcsQ0FBQyxDQUFDO0NBQ3BCLENBQUM7O0FBRUYsTUFBTSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsd0JBQXdCLENBQUM7QUFDL0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyx3QkFBd0IsQ0FBQzs7SUFFdEMsTUFBTSxXQUFOLE1BQU07QUFDSixhQURGLE1BQU0sR0FFZjs4QkFGUyxNQUFNOztBQUdYLFlBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO0tBQ2hDOztpQkFKUSxNQUFNO0FBTWYsYUFBSzttQkFBQSxpQkFDTDs7QUFFSSxvQkFBSSxDQUFDLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBRyxJQUFJLEVBQUU7QUFDM0Isd0JBQUksR0FBRyxDQUFDLElBQUksRUFBRTtBQUNWLDRCQUFJLEVBQUUsQ0FBQztxQkFDVixNQUFNO0FBQ0gsOEJBQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0Msa0NBQVUsQ0FBQyxZQUFVO0FBQ2pCLGtDQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xELGdDQUFJLEVBQUUsQ0FBQzt5QkFDVixFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUNYO2lCQUNKLENBQUMsQ0FBQzs7QUFFSCxxQkFBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQ3BCO0FBQ0ksd0JBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQzs7QUFFRCxvQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLFlBQVcsRUFFdEMsQ0FBQyxDQUFDOztBQUVILG9CQUFJLEVBQUUsQ0FBQzthQUNWOzs7O1dBL0JRLE1BQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJy4vcm91dGVyLmpzeCc7XG5cbndpbmRvdy5hcHAgPSB7IGRvbVJvb3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykgfTtcblxuJC5hamF4UHJlZmlsdGVyKGZ1bmN0aW9uKG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywgeGhyKSB7XG4gICAgaWYgKCAhb3B0aW9ucy5jcm9zc0RvbWFpbiApIHtcbiAgICAgICAgdmFyIHRva2VuID0gJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKTtcbiAgICAgICAgaWYgKHRva2VuKSB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1DU1JGLVRva2VuJywgdG9rZW4pO1xuICAgIH1cbn0pO1xuXG5SZWFjdC5pbml0aWFsaXplVG91Y2hFdmVudHModHJ1ZSk7XG5cbnZhciByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5yb3V0ZXIuc3RhcnQoKTtcbiIsImV4cG9ydCBjbGFzcyBNaXhpbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KClcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSlcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKVxuICAgIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICAgIHRoaXMubWl4aW5zID0gW107XG4gICAgfVxuXG4gICAgYWRkTWl4aW4obWl4aW4pXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5wdXNoKG1peGluKTtcbiAgICAgICAgbWl4aW4uY29tcG9uZW50ID0gdGhpcztcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5taXhpbnMuZm9yRWFjaCggZnVuY3Rpb24obWl4aW4pIHtcbiAgICAgICAgICAgIG1peGluLmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKVxuICAgIHtcbiAgICAgICAgdGhpcy5taXhpbnMuZm9yRWFjaCggZnVuY3Rpb24obWl4aW4pIHtcbiAgICAgICAgICAgIG1peGluLmNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5taXhpbnMuZm9yRWFjaCggZnVuY3Rpb24obWl4aW4pIHtcbiAgICAgICAgICAgIG1peGluLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFdmVudHMge1xuXG4gICAgc3RhdGljIGVtaXQoZWwsIGV2LCBkYXRhKSB7XG4gICAgICAgICQoZWwpLnRyaWdnZXIoZXYsIGRhdGEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdWJzY3JpYmUoZWwsIGV2LCBoYW5kbGVyKSB7XG4gICAgICAgICQoZWwpLm9uKGV2LCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3Vic2NyaWJlUm9vdChldiwgaGFuZGxlcikge1xuICAgICAgICAkKHdpbmRvdy5hcHAuZG9tUm9vdCkub24oZXYsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyB1bnN1YnNjcmliZShlbCwgZXYpIHtcbiAgICAgICAgJChlbCkub2ZmKGV2KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdW5zdWJzY3JpYmVSb290KGV2LCBmbikge1xuICAgICAgICAkKHdpbmRvdy5hcHAuZG9tUm9vdCkub2ZmKGV2LCBmbik7XG4gICAgfVxuXG4gICAgc3RhdGljIHVuc3Vic2NyaWJlQWxsKGVsKSB7XG4gICAgICAgICQoZWwpLm9mZigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlbWl0Um9vdChldiwgZGF0YSkge1xuICAgICAgICBFdmVudHMuZW1pdCh3aW5kb3cuYXBwLmRvbVJvb3QsIGV2LCBkYXRhKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IHZhciBTYXZlTW9kdWxlRm9ybUV2ZW50ID0gXCJldmVudF9zYXZlX21vZHVsZV9mb3JtXCI7XG5leHBvcnQgdmFyIENvbnRlbnRUeXBlU3VibWlzc2lvblN1Y2Nlc3NFdmVudCA9IFwiZXZlbnRfY29udGVudF90eXBlX3N1Ym1pc3Npb25fc3VjY2Vzc1wiO1xuIiwiZXhwb3J0IGNsYXNzIFNsdWcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxufVxuXG5TbHVnLmNvbnZlcnRUb1NsdWcgPSBmdW5jdGlvbih0ZXh0KVxue1xuICAgIHJldHVybiB0ZXh0XG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKC9bXlxcdyBdKy9nLCcnKVxuICAgICAgICAucmVwbGFjZSgvICsvZywnLScpO1xufTtcbiIsImV4cG9ydCBjbGFzcyBVdGlsIHtcblxufVxuXG5VdGlsLnNldFRyYW5zZm9ybSA9IGZ1bmN0aW9uKGVsLCBzdHlsZSlcbntcbiAgICAkKGVsKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgc3R5bGUpO1xuICAgICQoZWwpLmNzcyhcIi13ZWJraXQtdHJhbnNmb3JtXCIsIHN0eWxlKTtcbiAgICAkKGVsKS5jc3MoXCItbW96LXRyYW5zZm9ybVwiLCBzdHlsZSk7XG4gICAgJChlbCkuY3NzKFwiLW1zLXRyYW5zZm9ybVwiLCBzdHlsZSk7XG4gICAgJChlbCkuY3NzKFwiLW8tdHJhbnNmb3JtXCIsIHN0eWxlKTtcbn1cblxuVXRpbC5nZXRDU1JGID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgXCJwYXJhbVwiOiAkKFwibWV0YVtuYW1lPWNzcmYtcGFyYW1dXCIpLmF0dHIoXCJjb250ZW50XCIpLFxuICAgICAgICBcInRva2VuXCI6ICQoXCJtZXRhW25hbWU9Y3NyZi10b2tlbl1cIikuYXR0cihcImNvbnRlbnRcIilcbiAgICB9XG59XG5cblV0aWwuZ2V0Q1NSRkZvcm1GaWVsZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjc3JmID0gVXRpbC5nZXRDU1JGKCk7XG4gICAgcmV0dXJuIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT17Y3NyZi5wYXJhbX0gdmFsdWU9e2NzcmYudG9rZW59IC8+O1xufVxuXG5VdGlsLnRyYW5zZm9ybU1vbmdvSWQgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqW1wiX2lkXCJdKSB7XG4gICAgICAgIGlmIChvYmpbXCJfaWRcIl1bXCIkb2lkXCJdKSB7XG4gICAgICAgICAgICBvYmpbXCJpZFwiXSA9IG9ialtcIl9pZFwiXVtcIiRvaWRcIl07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyB2YXIgYWNlID0gcmVxdWlyZSgnYnJhY2UnKTtcblxudmFyIGxhbmdzID0gW1wiYWJhcFwiLFwiYWJjXCIsXCJhY3Rpb25zY3JpcHRcIixcImFkYVwiLFwiYXBhY2hlX2NvbmZcIixcImFwcGxlc2NyaXB0XCIsXCJhc2NpaWRvY1wiLFwiYXNzZW1ibHlfeDg2XCIsXCJhdXRvaG90a2V5XCIsXCJiYXRjaGZpbGVcIixcImM5c2VhcmNoXCIsXCJjX2NwcFwiLFwiY2lycnVcIixcImNsb2p1cmVcIixcImNvYm9sXCIsXCJjb2ZmZWVcIixcImNvbGRmdXNpb25cIixcImNzaGFycFwiLFwiY3NzXCIsXCJjdXJseVwiLFwiZFwiLFwiZGFydFwiLFwiZGlmZlwiLFwiZGphbmdvXCIsXCJkb2NrZXJmaWxlXCIsXCJkb3RcIixcImVpZmZlbFwiLFwiZWpzXCIsXCJlbGl4aXJcIixcImVsbVwiLFwiZXJsYW5nXCIsXCJmb3J0aFwiLFwiZnRsXCIsXCJnY29kZVwiLFwiZ2hlcmtpblwiLFwiZ2l0aWdub3JlXCIsXCJnbHNsXCIsXCJnb2xhbmdcIixcImdyb292eVwiLFwiaGFtbFwiLFwiaGFuZGxlYmFyc1wiLFwiaGFza2VsbFwiLFwiaGF4ZVwiLFwiaHRtbFwiLFwiaHRtbF9ydWJ5XCIsXCJpbmlcIixcImlvXCIsXCJqYWNrXCIsXCJqYWRlXCIsXCJqYXZhXCIsXCJqYXZhc2NyaXB0XCIsXCJqc29uXCIsXCJqc29uaXFcIixcImpzcFwiLFwianN4XCIsXCJqdWxpYVwiLFwibGF0ZXhcIixcImxlYW5cIixcImxlc3NcIixcImxpcXVpZFwiLFwibGlzcFwiLFwibGl2ZV9zY3JpcHRcIixcImxpdmVzY3JpcHRcIixcImxvZ2lxbFwiLFwibHNsXCIsXCJsdWFcIixcImx1YXBhZ2VcIixcImx1Y2VuZVwiLFwibWFrZWZpbGVcIixcIm1hcmtkb3duXCIsXCJtYXNrXCIsXCJtYXRsYWJcIixcIm1lbFwiLFwibWlwc19hc3NlbWJsZXJcIixcIm1pcHNhc3NlbWJsZXJcIixcIm11c2hjb2RlXCIsXCJteXNxbFwiLFwibml4XCIsXCJvYmplY3RpdmVjXCIsXCJvY2FtbFwiLFwicGFzY2FsXCIsXCJwZXJsXCIsXCJwZ3NxbFwiLFwicGhwXCIsXCJwbGFpbl90ZXh0XCIsXCJwb3dlcnNoZWxsXCIsXCJwcmFhdFwiLFwicHJvbG9nXCIsXCJwcm9wZXJ0aWVzXCIsXCJwcm90b2J1ZlwiLFwicHl0aG9uXCIsXCJyXCIsXCJyZG9jXCIsXCJyaHRtbFwiLFwicnVieVwiLFwicnVzdFwiLFwic2Fzc1wiLFwic2NhZFwiLFwic2NhbGFcIixcInNjaGVtZVwiLFwic2Nzc1wiLFwic2hcIixcInNqc1wiLFwic21hcnR5XCIsXCJzbmlwcGV0c1wiLFwic295X3RlbXBsYXRlXCIsXCJzcGFjZVwiLFwic3FsXCIsXCJzdHlsdXNcIixcInN2Z1wiLFwidGNsXCIsXCJ0ZXhcIixcInRleHRcIixcInRleHRpbGVcIixcInRvbWxcIixcInR3aWdcIixcInR5cGVzY3JpcHRcIixcInZhbGFcIixcInZic2NyaXB0XCIsXCJ2ZWxvY2l0eVwiLFwidmVyaWxvZ1wiLFwidmhkbFwiLFwieG1sXCIsXCJ4cXVlcnlcIixcInlhbWxcIl07XG5cbi8vIHJlcXVpcmUoXCJicmFjZS9tb2RlL2FjdGlvbnNjcmlwdFwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvY19jcHBcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2Nsb2p1cmVcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2NvZmZlZVwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvY3NoYXJwXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9jc3NcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2hhbmRsZWJhcnNcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2h0bWxcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2phdmFcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2phdmFzY3JpcHRcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2pzb25cIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2xhdGV4XCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9sdWFcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL21hcmtkb3duXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9teXNxbFwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvb2JqZWN0aXZlY1wiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvcGhwXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9wbGFpbl90ZXh0XCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9weXRob25cIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL3J1YnlcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL3htbFwiKTtcbi8vIHJlcXVpcmUoJ2JyYWNlL3RoZW1lL3Rlcm1pbmFsJyk7XG5cbmV4cG9ydCBjbGFzcyBBY2VFZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMubGFuZ3VhZ2UgPSB0aGlzLnByb3BzLmxhbmd1YWdlO1xuICAgICAgICB0aGlzLmVkaXRvciA9IG51bGw7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgICAgICAgYWNlLmNvbmZpZy5zZXQoJ2Jhc2VQYXRoJywgJy8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2FjZS8xLjEuMy8nKTtcblxuICAgICAgICAkKFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpKS5maW5kKCdbZGF0YS1lZGl0b3JdJykuZWFjaCggKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSAkKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKGVsLnByZXYoKS5pcyhcIi5hY2VfZWRpdG9yXCIpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWxyZWFkeSBhbiBhY2UgZWRpdG9yXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1vZGUgPSBlbC5kYXRhKCdlZGl0b3InKTtcblxuICAgICAgICAgICAgdmFyIGVkaXREaXYgPSAkKCc8ZGl2PicsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogZWwud2lkdGgoKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IE1hdGgubWF4KHRoaXMucHJvcHMuaGVpZ2h0LCBlbFswXS5zY3JvbGxIZWlnaHQpLFxuICAgICAgICAgICAgICAgICdjbGFzcyc6IGVsLmF0dHIoJ2NsYXNzJylcbiAgICAgICAgICAgIH0pLmluc2VydEJlZm9yZShlbCk7XG5cbiAgICAgICAgICAgIGVsLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yID0gYWNlLmVkaXQoZWRpdERpdlswXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRWYWx1ZShlbC50ZXh0KCkpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9cIiArIG1vZGUpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldFVzZVNvZnRUYWJzKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldFVzZVdyYXBNb2RlKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldFVzZVdvcmtlcihmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShcImFjZS90aGVtZS90ZXJtaW5hbFwiKTtcblxuICAgICAgICAgICAgLy8gS2VlcCBvcmlnaW5hbCBmb3JtIGZpZWxkIGluIHN5bmNcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmtlZXBUZXh0QXJlYUluU3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5vbignY2hhbmdlJywgKCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnRleHQodGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbnRlbnRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25Db250ZW50Q2hhbmdlKHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgbGFuZ3VhZ2VDaGFuZ2VIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL1wiICsgdGhpcy5sYW5ndWFnZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25MYW5ndWFnZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkxhbmd1YWdlQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgbGFuZ3VhZ2VTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2hvd0xhbmd1YWdlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBsYW5ndWFnZVNlbGVjdGlvbiA9IFtcbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImxhbmd1YWdlXCI+PC9sYWJlbD4sXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cImxhbmd1YWdlXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmxhbmd1YWdlfSBvbkNoYW5nZT17dGhpcy5sYW5ndWFnZUNoYW5nZUhhbmRsZXIuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmdzLm1hcCggZnVuY3Rpb24obGFuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXtsYW5nfT57bGFuZ308L29wdGlvbj47XG4gICAgICAgICAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtsYW5ndWFnZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgZGF0YS1lZGl0b3I9e3RoaXMucHJvcHMubGFuZ3VhZ2V9IGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQWNlRWRpdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBsYW5ndWFnZTogJ21hcmtkb3duJyxcbiAgICBoZWlnaHQ6IDY0LFxuICAgIHZhbHVlOiBcIlwiLFxuICAgIGtlZXBUZXh0QXJlYUluU3luYzogdHJ1ZSxcbiAgICBzaG93TGFuZ3VhZ2VTZWxlY3Rpb246IGZhbHNlXG59O1xuIiwiZXhwb3J0IGNsYXNzIEZsb2F0aW5nQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHZhciBlbCA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpO1xuXG4gICAgICAgICQoZWwpLmZpbmQoJ1tyZWw9dG9vbHRpcF0nKS50b29sdGlwKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciBpY29uQ2xhc3MgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBpY29uQ2xhc3MgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgaWNvbkNsYXNzID0gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJyb3VuZC1pY29uIFwiICsgdGhpcy5wcm9wcy5zaXplfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9PjxpIGNsYXNzTmFtZT17YGZhIGZhLSR7dGhpcy5wcm9wcy5pY29ufSBgICsgaWNvbkNsYXNzfSByZWw9XCJ0b29sdGlwXCIgdGl0bGU9e3RoaXMucHJvcHMuY2hpbGRyZW59IC8+PC9kaXY+O1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL0NvbXBvbmVudC5qc3gnO1xuaW1wb3J0IHtDb2RlQ29udGVudH0gZnJvbSAnLi9lZGl0aW5nL0NvZGVDb250ZW50LmpzeCc7XG5pbXBvcnQge01hdGhDb250ZW50fSBmcm9tICcuL2VkaXRpbmcvTWF0aENvbnRlbnQuanN4JztcbmltcG9ydCB7TWFya2Rvd25Db250ZW50fSBmcm9tICcuL2VkaXRpbmcvTWFya2Rvd25Db250ZW50LmpzeCc7XG5pbXBvcnQgcGFnZSBmcm9tICdwYWdlJztcblxuZXhwb3J0IGNsYXNzIFByb2plY3RTdGFydCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0ZSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmllbGQ6IFwidmFsdWVcIixcbiAgICAgICAgICAgIG5hbWU6IFwiQm9iXCIsXG4gICAgICAgICAgICBlZGl0RmllbGQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbmF2aWdhdGUoZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGVkXCIpO1xuICAgICAgICBwYWdlKFwiL2NvbmNlcHRzL3Rlc3RcIik7XG4gICAgfVxuXG4gICAgZWRpdChlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRGaWVsZDogIXRoaXMuc3RhdGUuZWRpdEZpZWxkfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cbiAgICAgICAgICAgICAgICA8aDI+U3RhcnQgYSBOZXcgUHJvamVjdDwvaDI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9jb25jZXB0cy90ZXN0XCI+R28gdG8gdGVzdDwvYT5cbiAgICAgICAgICAgICAgICA8Q29kZUNvbnRlbnQgZWRpdENvbnRlbnQ9e3RoaXMuc3RhdGUuZWRpdEZpZWxkfSB2YWx1ZT1cImNvbnNvbGUubG9nKHRlc3QpO1wiIC8+XG4gICAgICAgICAgICAgICAgPE1hdGhDb250ZW50IGVkaXRDb250ZW50PXt0aGlzLnN0YXRlLmVkaXRGaWVsZH0gdmFsdWU9XCJcXGFscGhhXFxiZXRhXFxnYW1tYVwiIC8+XG4gICAgICAgICAgICAgICAgPE1hcmtkb3duQ29udGVudCBlZGl0Q29udGVudD17dGhpcy5zdGF0ZS5lZGl0RmllbGR9IHZhbHVlPVwiSGVsbG8gX1lvdV9cIiAvPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmVkaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIEVkaXQgRmllbGRcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgb25DbGljaz17dGhpcy5uYXZpZ2F0ZS5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIENsaWNrIG1lIHRvIEFkZCBEYXRhXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBDbGljayBtZSB0byBSZXBsYXkgRGF0YVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xpY2sgbWUgdG8gUmVzZXQgRGF0YVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsInZhciBkcmFndWxhID0gcmVxdWlyZSgnZHJhZ3VsYScpO1xuXG5leHBvcnQgY2xhc3MgU29ydGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHZhciBlbCA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgICB2YXIgJGVsID0gJChlbCk7XG5cbiAgICAgICAgZHJhZ3VsYShlbCwge1xuICAgICAgICAgICAgbW92ZXM6IGZ1bmN0aW9uIChlbCwgY29udGFpbmVyLCBoYW5kbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChoYW5kbGUpLmhhc0NsYXNzKFwiaGFuZGxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInNvcnRhYmxlXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vQ29tcG9uZW50LmpzeCdcblxuZXhwb3J0IGNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxuICAgIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGgxPlRlc3Q8L2gxPlxuICAgICAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0V2ZW50cywgU2F2ZU1vZHVsZUZvcm1FdmVudCwgQ29udGVudFR5cGVTdWJtaXNzaW9uU3VjY2Vzc0V2ZW50fSBmcm9tICdFdmVudHMuanN4JztcbmltcG9ydCB7Q29udGVudFR5cGV9IGZyb20gJ2NvbXBvbmVudHMvZWRpdGluZy9Db250ZW50VHlwZS5qc3gnO1xuaW1wb3J0IHtBY2VFZGl0b3J9IGZyb20gJ2NvbXBvbmVudHMvQWNlRWRpdG9yLmpzeCc7XG5cbmV4cG9ydCBjbGFzcyBDb2RlQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlci5jb25zdHJ1Y3Rvcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMudmFsdWUsXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5wcm9wcy5sYW5ndWFnZSxcbiAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLmlkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmVSb290KCBTYXZlTW9kdWxlRm9ybUV2ZW50LCB0aGlzLnNhdmVUb1NlcnZlci5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVW5tb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlUm9vdCggU2F2ZU1vZHVsZUZvcm1FdmVudCwgdGhpcy5zYXZlVG9TZXJ2ZXIuYmluZCh0aGlzKSApO1xuICAgIH1cblxuICAgIHNhdmVUb1NlcnZlcihlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgY29kZV9jb250ZW50OiB7XG4gICAgICAgICAgICAgICAgYm9keTogdGhpcy5zdGF0ZS5jb250ZW50LFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLnN0YXRlLmxhbmd1YWdlLFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLnN0YXRlLmlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQucG9zdChcIi9jb250ZW50L2NvZGUvYWRkXCIsIGRhdGEsIHRoaXMuc2F2ZUNhbGxiYWNrLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHNhdmVDYWxsYmFjayhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lkOiBkYXRhLmlkfSk7XG4gICAgICAgIH1cblxuICAgICAgICBFdmVudHMuZW1pdFJvb3QoQ29udGVudFR5cGVTdWJtaXNzaW9uU3VjY2Vzc0V2ZW50LCB0aGlzKTtcbiAgICB9XG5cbiAgICBsYW5ndWFnZUNoYW5nZShsYW5nKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xhbmd1YWdlOiBsYW5nfSk7XG4gICAgfVxuXG4gICAgY29udGVudENoYW5nZShjb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgZWRpdChlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVkaXRhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IHRoaXMuc3RhdGUuY29udGVudDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250ZW50OiB0aGlzLmNvbnRlbnRCdWZmZXJ9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG5cbiAgICBjYW5jZWwoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgZWRpdCA9IChcbiAgICAgICAgICAgIDxDb250ZW50VHlwZSB0aXRsZT1cIkNvZGUgQ29udGVudFwiIGVkaXRhYmxlPXt0aGlzLnByb3BzLmVkaXRhYmxlfT5cbiAgICAgICAgICAgICAgICA8QWNlRWRpdG9yIHNob3dMYW5ndWFnZVNlbGVjdGlvbj17dHJ1ZX0gb25MYW5ndWFnZUNoYW5nZT17dGhpcy5sYW5ndWFnZUNoYW5nZS5iaW5kKHRoaXMpfSBvbkNvbnRlbnRDaGFuZ2U9e3RoaXMuY29udGVudENoYW5nZS5iaW5kKHRoaXMpfSBsYW5ndWFnZT17dGhpcy5zdGF0ZS5sYW5ndWFnZX0gdmFsdWU9e3RoaXMuc3RhdGUuY29udGVudH0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbiBjcmVhdGUtYnV0dG9uXCIgb25DbGljaz17dGhpcy5zYXZlLmJpbmQodGhpcyl9PlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbiBjcmVhdGUtYnV0dG9uXCIgb25DbGljaz17dGhpcy5jYW5jZWwuYmluZCh0aGlzKX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8L0NvbnRlbnRUeXBlPlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciB2aWV3ID0gKFxuICAgICAgICAgICAgPHByZSBkYXRhLWlkPXt0aGlzLnN0YXRlLmlkfT5cbiAgICAgICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9e3RoaXMuc3RhdGUubGFuZ3VhZ2V9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5jb250ZW50fVxuICAgICAgICAgICAgICAgIDwvY29kZT5cbiAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5zdGF0ZS5lZGl0aW5nID8gZWRpdCA6IHZpZXc7XG5cbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLndyYXBDb250ZW50VHlwZSh0aGlzLCBjb250ZW50LCB0aGlzLmVkaXQuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5Db2RlQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbGFuZ3VhZ2U6ICdqYXZhc2NyaXB0JyxcbiAgICB2YWx1ZTogXCJcIixcbiAgICBpZDogbnVsbFxufVxuIiwiaW1wb3J0IHtDb250ZW50VHlwZVRvb2xiYXJ9IGZyb20gXCIuL0NvbnRlbnRUeXBlVG9vbGJhci5qc3hcIjtcbmltcG9ydCB7RmxvYXRpbmdCdXR0b259IGZyb20gXCJjb21wb25lbnRzL0Zsb2F0aW5nQnV0dG9uLmpzeFwiO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudFR5cGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbnRlbnQtdHlwZSBcIiArIHRoaXMucHJvcHMuZWRpdGFibGUoKSA/IFwiZWRpdGFibGVcIiA6IFwiXCJ9PlxuICAgICAgICAgICAgICAgIDxDb250ZW50VHlwZVRvb2xiYXIgaWNvbj17dGhpcy5wcm9wcy50aXRsZUljb259Pnt0aGlzLnByb3BzLnRpdGxlfTwvQ29udGVudFR5cGVUb29sYmFyPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Db250ZW50VHlwZS53cmFwQ29udGVudFR5cGUgPSBmdW5jdGlvbihjdHgsIGNvbnRlbnQsIGVkaXRIYW5kbGVyKSB7XG5cbiAgICB2YXIgaW5uZXIgPSBbXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdC1jb250ZW50LXR5cGUtdG9vbHMgZmxvYXQtcmlnaHRcIj5cbiAgICAgICAgICAgIDxGbG9hdGluZ0J1dHRvbiBpY29uPVwiYXJyb3dzXCIgY2xhc3NOYW1lPVwiaGFuZGxlXCI+TW92ZTwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgICAgICA8RmxvYXRpbmdCdXR0b24gaWNvbj1cInBlbmNpbFwiIG9uQ2xpY2s9e2VkaXRIYW5kbGVyfT5FZGl0PC9GbG9hdGluZ0J1dHRvbj5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgICB7Y29udGVudH1cbiAgICBdO1xuXG4gICAgaWYgKCFjdHgucHJvcHMuZWRpdGFibGUoKSkge1xuICAgICAgICBpbm5lciA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYm94IGNvbnRlbnQtdHlwZSBcIiArIChjdHgucHJvcHMuZWRpdGFibGUoKSA/IFwiZWRpdGFibGVcIiA6IFwiXCIpfSA+XG4gICAgICAgICAgICB7aW5uZXJ9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJleHBvcnQgY2xhc3MgQ29udGVudFR5cGVUb29sYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtdHlwZS10b29sYmFyXCI+XG4gICAgICAgICAgICAgICAgPGg0PlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9e1wiZmEgbWFyZ2luLXJpZ2h0XCIgKyB0aGlzLnByb3BzLmljb259IC8+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0V2ZW50cywgU2F2ZU1vZHVsZUZvcm1FdmVudCwgQ29udGVudFR5cGVTdWJtaXNzaW9uU3VjY2Vzc0V2ZW50fSBmcm9tICdFdmVudHMuanN4JztcbmltcG9ydCB7Q29udGVudFR5cGV9IGZyb20gJ2NvbXBvbmVudHMvZWRpdGluZy9Db250ZW50VHlwZS5qc3gnO1xuaW1wb3J0IHtBY2VFZGl0b3J9IGZyb20gJ2NvbXBvbmVudHMvQWNlRWRpdG9yLmpzeCc7XG52YXIgbWFya2VkID0gcmVxdWlyZSgnbWFya2VkJyk7XG5cbmV4cG9ydCBjbGFzcyBJbWFnZUNvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29uc3RydWN0b3IocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZVJvb3QoIFNhdmVNb2R1bGVGb3JtRXZlbnQsIHRoaXMuc2F2ZVRvU2VydmVyLmJpbmQodGhpcykgKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVbm1vdW50KCkge1xuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmVSb290KCBTYXZlTW9kdWxlRm9ybUV2ZW50LCB0aGlzLnNhdmVUb1NlcnZlci5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgc2F2ZVRvU2VydmVyKGUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBpbWFnZV9jb250ZW50OiB7XG4gICAgICAgICAgICAgICAgc3JjOiB0aGlzLnN0YXRlLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuc3RhdGUuaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5wb3N0KFwiL2NvbnRlbnQvaW1hZ2UvYWRkXCIsIGRhdGEsIHRoaXMuc2F2ZUNhbGxiYWNrLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHNhdmVDYWxsYmFjayhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lkOiBkYXRhLmlkfSk7XG4gICAgICAgIH1cblxuICAgICAgICBFdmVudHMuZW1pdFJvb3QoQ29udGVudFR5cGVTdWJtaXNzaW9uU3VjY2Vzc0V2ZW50LCB0aGlzKTtcbiAgICB9XG5cbiAgICBjb250ZW50Q2hhbmdlKGNvbnRlbnQpIHtcbiAgICAgICB0aGlzLmNvbnRlbnRCdWZmZXIgPSBjb250ZW50O1xuICAgIH1cblxuICAgIGVkaXQoZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5lZGl0YWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRCdWZmZXIgPSB0aGlzLnN0YXRlLmNvbnRlbnQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGVudDogdGhpcy5jb250ZW50QnVmZmVyfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIGVkaXQgPSAoXG4gICAgICAgICAgICA8Q29udGVudFR5cGUgdGl0bGU9XCJJbWFnZSBDb250ZW50XCIgZWRpdGFibGU9e3RoaXMucHJvcHMuZWRpdGFibGV9PlxuICAgICAgICAgICAgICAgIDxBY2VFZGl0b3Igb25Db250ZW50Q2hhbmdlPXt0aGlzLmNvbnRlbnRDaGFuZ2UuYmluZCh0aGlzKX0gbGFuZ3VhZ2U9J21hcmtkb3duJyB2YWx1ZT17dGhpcy5zdGF0ZS5jb250ZW50fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIGNyZWF0ZS1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnNhdmUuYmluZCh0aGlzKX0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIGNyZWF0ZS1idXR0b25cIiBvbkNsaWNrPXt0aGlzLmNhbmNlbC5iaW5kKHRoaXMpfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvQ29udGVudFR5cGU+XG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHZpZXcgPSAoXG4gICAgICAgICAgICA8ZGl2IGRhdGEtaWQ9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt0aGlzLnN0YXRlLmNvbnRlbnR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuc3RhdGUuZWRpdGluZyA/IGVkaXQgOiB2aWV3O1xuXG4gICAgICAgIHJldHVybiBDb250ZW50VHlwZS53cmFwQ29udGVudFR5cGUodGhpcywgY29udGVudCwgdGhpcy5lZGl0LmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuSW1hZ2VDb250ZW50LmRlZmF1bHRQcm9wcyA9IHtcbiAgICB2YWx1ZTogXCJcIixcbiAgICBpZDogbnVsbFxufVxuIiwiaW1wb3J0IHtFdmVudHMsIFNhdmVNb2R1bGVGb3JtRXZlbnQsIENvbnRlbnRUeXBlU3VibWlzc2lvblN1Y2Nlc3NFdmVudH0gZnJvbSAnRXZlbnRzLmpzeCc7XG5pbXBvcnQge0NvbnRlbnRUeXBlfSBmcm9tICdjb21wb25lbnRzL2VkaXRpbmcvQ29udGVudFR5cGUuanN4JztcbmltcG9ydCB7QWNlRWRpdG9yfSBmcm9tICdjb21wb25lbnRzL0FjZUVkaXRvci5qc3gnO1xudmFyIG1hcmtlZCA9IHJlcXVpcmUoJ21hcmtlZCcpO1xudmFyIGhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5cbmV4cG9ydCBjbGFzcyBNYXJrZG93bkNvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29uc3RydWN0b3IocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZVJvb3QoIFNhdmVNb2R1bGVGb3JtRXZlbnQsIHRoaXMuc2F2ZVRvU2VydmVyLmJpbmQodGhpcykgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJNYXRoKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVW5tb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlUm9vdCggU2F2ZU1vZHVsZUZvcm1FdmVudCwgdGhpcy5zYXZlVG9TZXJ2ZXIuYmluZCh0aGlzKSApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJNYXRoKCk7XG4gICAgfVxuXG4gICAgc2F2ZVRvU2VydmVyKGUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBtYXJrZG93bl9jb250ZW50OiB7XG4gICAgICAgICAgICAgICAgYm9keTogdGhpcy5zdGF0ZS5jb250ZW50LFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLnN0YXRlLmlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQucG9zdChcIi9jb250ZW50L21hcmtkb3duL2FkZFwiLCBkYXRhLCB0aGlzLnNhdmVDYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBzYXZlQ2FsbGJhY2soZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpZDogZGF0YS5pZH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgRXZlbnRzLmVtaXRSb290KENvbnRlbnRUeXBlU3VibWlzc2lvblN1Y2Nlc3NFdmVudCwgdGhpcyk7XG4gICAgfVxuXG4gICAgY29udGVudENoYW5nZShjb250ZW50KSB7XG4gICAgICAgdGhpcy5jb250ZW50QnVmZmVyID0gY29udGVudDtcbiAgICB9XG5cbiAgICByZW5kZXJNYXRoKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuZWRpdGluZykge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoUmVhY3QuZmluZERPTU5vZGUodGhpcykpO1xuXG4gICAgICAgICAgICB2YXIgcmVuZGVyVGFyZ2V0ID0gJGVsLmZpbmQoXCIubWFya2Rvd24tY29udGVudFwiKVswXTtcbiAgICAgICAgICAgIHZhciBodG1sID0gbWFya2VkKHRoaXMuc3RhdGUuY29udGVudCk7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBoYW5kbGViYXJzLmNvbXBpbGUoaHRtbCk7XG5cbiAgICAgICAgICAgIHJlbmRlclRhcmdldC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzLnByb3BzLm1ldGFkYXRhKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIGVkaXQoZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5lZGl0YWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRCdWZmZXIgPSB0aGlzLnN0YXRlLmNvbnRlbnQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGVudDogdGhpcy5jb250ZW50QnVmZmVyfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIGVkaXQgPSAoXG4gICAgICAgICAgICA8Q29udGVudFR5cGUgdGl0bGU9XCJNYXJrZG93biBDb250ZW50XCIgZWRpdGFibGU9e3RoaXMucHJvcHMuZWRpdGFibGV9PlxuICAgICAgICAgICAgICAgIDxBY2VFZGl0b3Igb25Db250ZW50Q2hhbmdlPXt0aGlzLmNvbnRlbnRDaGFuZ2UuYmluZCh0aGlzKX0gbGFuZ3VhZ2U9J21hcmtkb3duJyB2YWx1ZT17dGhpcy5zdGF0ZS5jb250ZW50fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIGNyZWF0ZS1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnNhdmUuYmluZCh0aGlzKX0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIGNyZWF0ZS1idXR0b25cIiBvbkNsaWNrPXt0aGlzLmNhbmNlbC5iaW5kKHRoaXMpfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvQ29udGVudFR5cGU+XG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHZpZXcgPSAoXG4gICAgICAgICAgICA8ZGl2IGRhdGEtaWQ9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFya2Rvd24tY29udGVudFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLnN0YXRlLmVkaXRpbmcgPyBlZGl0IDogdmlldztcblxuICAgICAgICByZXR1cm4gQ29udGVudFR5cGUud3JhcENvbnRlbnRUeXBlKHRoaXMsIGNvbnRlbnQsIHRoaXMuZWRpdC5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbk1hcmtkb3duQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgdmFsdWU6IFwiXCIsXG4gICAgaWQ6IG51bGxcbn1cbiIsImltcG9ydCB7RXZlbnRzLCBTYXZlTW9kdWxlRm9ybUV2ZW50LCBDb250ZW50VHlwZVN1Ym1pc3Npb25TdWNjZXNzRXZlbnR9IGZyb20gJ0V2ZW50cy5qc3gnO1xuaW1wb3J0IHtDb250ZW50VHlwZX0gZnJvbSAnY29tcG9uZW50cy9lZGl0aW5nL0NvbnRlbnRUeXBlLmpzeCc7XG5pbXBvcnQge0FjZUVkaXRvcn0gZnJvbSAnY29tcG9uZW50cy9BY2VFZGl0b3IuanN4JztcbnZhciBrYXRleCA9IHJlcXVpcmUoJ2thdGV4Jyk7XG5cbmV4cG9ydCBjbGFzcyBNYXRoQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlci5jb25zdHJ1Y3Rvcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMudmFsdWUsXG4gICAgICAgICAgICBlZGl0aW5nOiB0aGlzLnByb3BzLmVkaXRDb250ZW50LFxuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMuaWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZVJvb3QoIFNhdmVNb2R1bGVGb3JtRXZlbnQsIHRoaXMuc2F2ZVRvU2VydmVyLmJpbmQodGhpcykgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJNYXRoKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVW5tb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlUm9vdCggU2F2ZU1vZHVsZUZvcm1FdmVudCwgdGhpcy5zYXZlVG9TZXJ2ZXIuYmluZCh0aGlzKSApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJNYXRoKCk7XG4gICAgfVxuXG4gICAgc2F2ZVRvU2VydmVyKGUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBtYXRoX2NvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICBib2R5OiB0aGlzLnN0YXRlLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuc3RhdGUuaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5wb3N0KFwiL2NvbnRlbnQvbWF0aC9hZGRcIiwgZGF0YSwgdGhpcy5zYXZlQ2FsbGJhY2suYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc2F2ZUNhbGxiYWNrKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aWQ6IGRhdGEuaWR9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEV2ZW50cy5lbWl0Um9vdChDb250ZW50VHlwZVN1Ym1pc3Npb25TdWNjZXNzRXZlbnQsIHRoaXMpO1xuICAgIH1cblxuICAgIGNvbnRlbnRDaGFuZ2UoY29udGVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRCdWZmZXIgPSBjb250ZW50O1xuICAgIH1cblxuICAgIHJlbmRlck1hdGgoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5lZGl0aW5nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbmRlcmluZyBtYXRoXCIpO1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoUmVhY3QuZmluZERPTU5vZGUodGhpcykpO1xuXG4gICAgICAgICAgICB2YXIgcmVuZGVyVGFyZ2V0ID0gJGVsLmZpbmQoXCIubWF0aC1jb250ZW50XCIpWzBdO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBrYXRleC5yZW5kZXIodGhpcy5zdGF0ZS5jb250ZW50LCByZW5kZXJUYXJnZXQsIHsgZGlzcGxheU1vZGU6IHRydWUgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJUYXJnZXQuaW5uZXJIVE1MID0gXCJNYXRoIFJlbmRlciBFcnJvcjogXCIgKyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0KGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZWRpdGFibGUoKSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50QnVmZmVyID0gdGhpcy5zdGF0ZS5jb250ZW50O1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRlbnQ6IHRoaXMuY29udGVudEJ1ZmZlcn0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIGNhbmNlbChlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciBlZGl0ID0gKFxuICAgICAgICAgICAgPENvbnRlbnRUeXBlIHRpdGxlPVwiTWF0aCBDb250ZW50XCIgZWRpdGFibGU9e3RoaXMucHJvcHMuZWRpdGFibGV9PlxuICAgICAgICAgICAgICAgIDxBY2VFZGl0b3Igb25Db250ZW50Q2hhbmdlPXt0aGlzLmNvbnRlbnRDaGFuZ2UuYmluZCh0aGlzKX0gbGFuZ3VhZ2U9J2xhdGV4JyB2YWx1ZT17dGhpcy5zdGF0ZS5jb250ZW50fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIGNyZWF0ZS1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnNhdmUuYmluZCh0aGlzKX0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIGNyZWF0ZS1idXR0b25cIiBvbkNsaWNrPXt0aGlzLmNhbmNlbC5iaW5kKHRoaXMpfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvQ29udGVudFR5cGU+XG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHZpZXcgPSAoXG4gICAgICAgICAgICA8ZGl2IGRhdGEtaWQ9e3RoaXMuc3RhdGUuaWR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0aC1jb250ZW50XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuc3RhdGUuZWRpdGluZyA/IGVkaXQgOiB2aWV3O1xuXG4gICAgICAgIHJldHVybiBDb250ZW50VHlwZS53cmFwQ29udGVudFR5cGUodGhpcywgY29udGVudCwgdGhpcy5lZGl0LmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuTWF0aENvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xuICAgIHZhbHVlOiBcIlwiLFxuICAgIGlkOiBudWxsXG59XG4iLCJpbXBvcnQge1V0aWx9IGZyb20gJ1V0aWwuanN4JztcbmltcG9ydCB7RXZlbnRzLCBTYXZlTW9kdWxlRm9ybUV2ZW50LCBDb250ZW50VHlwZVN1Ym1pc3Npb25TdWNjZXNzRXZlbnR9IGZyb20gJ0V2ZW50cy5qc3gnO1xuaW1wb3J0IHtDb2RlQ29udGVudH0gZnJvbSAnY29tcG9uZW50cy9lZGl0aW5nL0NvZGVDb250ZW50LmpzeCc7XG5pbXBvcnQge01hdGhDb250ZW50fSBmcm9tICdjb21wb25lbnRzL2VkaXRpbmcvTWF0aENvbnRlbnQuanN4JztcbmltcG9ydCB7TWFya2Rvd25Db250ZW50fSBmcm9tICdjb21wb25lbnRzL2VkaXRpbmcvTWFya2Rvd25Db250ZW50LmpzeCc7XG5pbXBvcnQge0ltYWdlQ29udGVudH0gZnJvbSAnY29tcG9uZW50cy9lZGl0aW5nL0ltYWdlQ29udGVudC5qc3gnO1xuaW1wb3J0IHtTb3J0YWJsZX0gZnJvbSAnY29tcG9uZW50cy9Tb3J0YWJsZS5qc3gnO1xuaW1wb3J0IHtGbG9hdGluZ0J1dHRvbn0gZnJvbSAnY29tcG9uZW50cy9GbG9hdGluZ0J1dHRvbi5qc3gnO1xuaW1wb3J0IHtBY2VFZGl0b3J9IGZyb20gJ2NvbXBvbmVudHMvQWNlRWRpdG9yLmpzeCc7XG5pbXBvcnQge1NsdWd9IGZyb20gJ1NsdWcuanMnO1xuXG52YXIgcGFnZSA9IHJlcXVpcmUoXCJwYWdlXCIpO1xuXG5leHBvcnQgY2xhc3MgRWRpdE1vZHVsZVBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbnN0cnVjdG9yKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbW9kdWxlczogW3t9XSxcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGU6IG51bGwsXG4gICAgICAgICAgICBjb250ZW50QmxvY2tzOiBbXSxcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7fSxcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICAgICAgc2x1ZzogdGhpcy5wcm9wcy5zbHVnXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1Ym1pdENvdW50ID0gMDtcbiAgICB9XG5cbiAgICB0aXRsZVVwZGF0ZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpdGxlOiBlLnRhcmdldC52YWx1ZX0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzbHVnOiBTbHVnLmNvbnZlcnRUb1NsdWcoZS50YXJnZXQudmFsdWUpfSk7XG4gICAgfVxuXG4gICAgc2x1Z1VwZGF0ZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NsdWc6IGUudGFyZ2V0LnZhbHVlfSk7XG4gICAgfVxuXG5cblxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmVSb290KCBDb250ZW50VHlwZVN1Ym1pc3Npb25TdWNjZXNzRXZlbnQsIHRoaXMuY29udGVudFR5cGVEaWRTYXZlLmJpbmQodGhpcykgKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5tb2R1bGUpIHtcbiAgICAgICAgICAgICQuZ2V0KGAvY29uY2VwdHMvY29uY2VwdC8ke3RoaXMucHJvcHMubW9kdWxlfWAsIHRoaXMuZmV0Y2hlZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmZXRjaGVkRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG5cbiAgICAgICAgdmFyIGJsb2NrcyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5jb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgVXRpbC50cmFuc2Zvcm1Nb25nb0lkKGRhdGEuY29udGVudHNbaV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5jb250ZW50c1tpXSk7XG4gICAgICAgICAgICBzd2l0Y2goZGF0YS5jb250ZW50c1tpXVtcInR5cGVcIl0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiTWFya2Rvd25Db250ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMubmV3TWFya2Rvd25TZWN0aW9uKGRhdGEuY29udGVudHNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkNvZGVDb250ZW50XCI6XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHRoaXMubmV3Q29kZVNlY3Rpb24oZGF0YS5jb250ZW50c1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiTWF0aENvbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2godGhpcy5uZXdNYXRoU2VjdGlvbihkYXRhLmNvbnRlbnRzW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJJbWFnZUNvbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzLnB1c2godGhpcy5uZXdJbWFnZVNlY3Rpb24oZGF0YS5jb250ZW50c1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGl0bGU6IGRhdGFbXCJsZWFybmluZ19tb2R1bGVcIl0udGl0bGUsXG4gICAgICAgICAgICBzbHVnOiBkYXRhW1wibGVhcm5pbmdfbW9kdWxlXCJdLnNsdWcsXG4gICAgICAgICAgICBjb250ZW50QmxvY2tzOiBibG9ja3NcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVW5tb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlUm9vdCggQ29udGVudFR5cGVTdWJtaXNzaW9uU3VjY2Vzc0V2ZW50LCB0aGlzLmNvbnRlbnRUeXBlRGlkU2F2ZS5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgY29udGVudFR5cGVEaWRTYXZlKCkge1xuICAgICAgICB0aGlzLnN1Ym1pdENvdW50Kys7XG5cbiAgICAgICAgaWYgKHRoaXMuc3VibWl0Q291bnQgPT0gdGhpcy5zdGF0ZS5jb250ZW50QmxvY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbGwgc2F2ZWQgY29ycmVjdGx5XCIsIHRoaXMuc3RhdGUuY29udGVudEJsb2Nrcy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5hbGxDb250ZW50VHlwZXNEaWRTYXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGxDb250ZW50VHlwZXNEaWRTYXZlKCkge1xuICAgICAgICB2YXIgY29udGVudF90eXBlX2lkcyA9IFtdO1xuXG4gICAgICAgICQoUmVhY3QuZmluZERPTU5vZGUodGhpcykpLmZpbmQoXCJbZGF0YS1pZF1cIikuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb250ZW50X3R5cGVfaWRzLnB1c2goJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnRfdHlwZV9pZHMpO1xuXG4gICAgICAgIHZhciBpZCA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZCA9IHRoaXMucHJvcHMubW9kdWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcImNvbnRlbnRzXCI6IGNvbnRlbnRfdHlwZV9pZHMsXG4gICAgICAgICAgICBcImxlYXJuaW5nX21vZHVsZVwiOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuc3RhdGUudGl0bGUsXG4gICAgICAgICAgICAgICAgc2x1ZzogdGhpcy5zdGF0ZS5zbHVnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJpZFwiOiB0aGlzLnByb3BzLm1vZHVsZVxuICAgICAgICB9O1xuXG4gICAgICAgICQucG9zdChgL2NvbmNlcHRzL21ha2VgLCBkYXRhLCB0aGlzLm1vZHVsZVNhdmVSZXBzb25zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBtb2R1bGVTYXZlUmVwc29uc2UoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm1vZHVsZSByZXNwb25zZVwiLCBkYXRhKTtcblxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBwYWdlKGAvY29uY2VwdHMvZWRpdC8ke2RhdGEuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICBoYW5kbGVFZGl0Q29uY2VwdChlKSB7XG5cbiAgICB9XG5cblxuXG5cblxuXG4gICAgbmV3U2VjdGlvbihwcm92aWRlcikge1xuICAgICAgICB2YXIgYmxvY2tzID0gdGhpcy5zdGF0ZS5jb250ZW50QmxvY2tzO1xuICAgICAgICBibG9ja3MucHVzaChwcm92aWRlcigpKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250ZW50QmxvY2tzOiBibG9ja3N9KTtcbiAgICB9XG5cbiAgICBuZXdNYXJrZG93blNlY3Rpb24oY3R4KSB7XG4gICAgICAgIGlmIChjdHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3R4ID0ge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8TWFya2Rvd25Db250ZW50IGlkPXtjdHhbXCJpZFwiXX0gdmFsdWU9e2N0eFtcImJvZHlcIl19IGVkaXRhYmxlPXt0aGlzLmlzRWRpdGFibGV9IG1ldGFkYXRhPXt0aGlzLmdldE1ldGFkYXRhLmJpbmQodGhpcyl9Lz47XG4gICAgfVxuXG4gICAgbmV3Q29kZVNlY3Rpb24oY3R4KSB7XG4gICAgICAgIGlmIChjdHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3R4ID0ge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8Q29kZUNvbnRlbnQgaWQ9e2N0eFtcImlkXCJdfSB2YWx1ZT17Y3R4W1wiYm9keVwiXX0gbGFuZ3VhZ2U9e2N0eFtcImxhbmd1YWdlXCJdfSBlZGl0YWJsZT17dGhpcy5pc0VkaXRhYmxlfSAvPjtcbiAgICB9XG5cbiAgICBuZXdNYXRoU2VjdGlvbihjdHgpIHtcbiAgICAgICAgaWYgKGN0eCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdHggPSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDxNYXRoQ29udGVudCBpZD17Y3R4W1wiaWRcIl19IHZhbHVlPXtjdHhbXCJib2R5XCJdfSBlZGl0YWJsZT17dGhpcy5pc0VkaXRhYmxlfSAvPjtcbiAgICB9XG5cbiAgICBuZXdJbWFnZVNlY3Rpb24oY3R4KSB7XG4gICAgICAgIGlmIChjdHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3R4ID0ge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8SW1hZ2VDb250ZW50IGlkPXtjdHhbXCJpZFwiXX0gdmFsdWU9XCJcIiBlZGl0YWJsZT17dGhpcy5pc0VkaXRhYmxlfSAvPjtcbiAgICB9XG5cblxuXG5cblxuXG4gICAgc2F2ZShlKSB7XG4gICAgICAgIEV2ZW50cy5lbWl0Um9vdChTYXZlTW9kdWxlRm9ybUV2ZW50LCB0aGlzKTtcblxuICAgICAgICB0aGlzLnN1Ym1pdENvdW50ID0gMDtcbiAgICB9XG5cblxuXG5cblxuXG4gICAgaXNFZGl0YWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cblxuXG5cblxuICAgIGdldE1ldGFkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5tZXRhZGF0YTtcbiAgICB9XG5cbiAgICBtZXRhZGF0YUNoYW5nZShjb250ZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHttZXRhZGF0YTogbWV0YWRhdGF9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBtZXRhZGF0YVwiLCBjb250ZW50LCBtZXRhZGF0YSk7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuXG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIGVkaXRNb2R1bGVTZWxlY3QgPSAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwibGVhcm5pbmdfbW9kdWxlXCIgbmFtZT1cImxlYXJuaW5nX21vZHVsZVwiIGNsYXNzTmFtZT1cInNlbGVjdDJcIiBkZWZhdWx0VmFsdWU9e3RoaXMuc3RhdGUuY3VycmVudE1vZHVsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLm1vZHVsZXMubWFwKCBtb2R1bGUgPT4gPG9wdGlvbiB2YWx1ZT17bW9kdWxlLmlkfT57bW9kdWxlLnRpdGxlfTwvb3B0aW9uPiApIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjcmVhdGUtYnV0dG9uIGJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRWRpdENvbmNlcHQuYmluZCh0aGlzKX0+RWRpdCBDb25jZXB0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjcmVhdGUtc3RlcC1mb3JtXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPkVkaXQgQ29uY2VwdDwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIi9jb25jZXB0cy9tYWtlL1wiIGFjY2VwdENoYXJzZXQ9XCJVVEYtOFwiIGlkPVwiYWRkU3RlcEZvcm1cIiBtZXRob2Q9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IFV0aWwuZ2V0Q1NSRkZvcm1GaWVsZCgpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibGVhcm5pbmdfbW9kdWxlX3RpdGxlXCI+Q29uY2VwdCBUaXRsZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgb25DaGFuZ2U9e3RoaXMudGl0bGVVcGRhdGUuYmluZCh0aGlzKX0gdmFsdWU9e3RoaXMuc3RhdGUudGl0bGV9IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxlYXJuaW5nX21vZHVsZVt0aXRsZV1cIiBpZD1cImxlYXJuaW5nX21vZHVsZV90aXRsZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJsZWFybmluZ19tb2R1bGVfc2x1Z1wiPkNvbmNlcHQgU2x1ZyAoRm9yIFVSTCk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG9uQ2hhbmdlPXt0aGlzLnNsdWdVcGRhdGUuYmluZCh0aGlzKX0gdmFsdWU9e3RoaXMuc3RhdGUuc2x1Z30gdHlwZT1cInRleHRcIiBuYW1lPVwibGVhcm5pbmdfbW9kdWxlW3NsdWddXCIgaWQ9XCJsZWFybmluZ19tb2R1bGVfc2x1Z1wiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWlkc1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QWNlRWRpdG9yIG9uQ29udGVudENoYW5nZT17dGhpcy5tZXRhZGF0YUNoYW5nZS5iaW5kKHRoaXMpfSBsYW5ndWFnZT0namF2YXNjcmlwdCcgdmFsdWU9e1wie31cIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxTb3J0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5jb250ZW50QmxvY2tzLm1hcChibG9jayA9PiBibG9jaykgfVxuICAgICAgICAgICAgICAgICAgICA8L1NvcnRhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsb2F0aW5nLXRvb2xzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdCdXR0b24gaWNvbj1cImZpbGUtdGV4dFwiIG9uQ2xpY2s9e3RoaXMubmV3U2VjdGlvbi5iaW5kKHRoaXMsIHRoaXMubmV3TWFya2Rvd25TZWN0aW9uLmJpbmQodGhpcykpfT5BZGQgTmV3IE1hcmtkb3duIENvbnRlbnQ8L0Zsb2F0aW5nQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nQnV0dG9uIGljb249XCJjb2RlXCIgb25DbGljaz17dGhpcy5uZXdTZWN0aW9uLmJpbmQodGhpcywgdGhpcy5uZXdDb2RlU2VjdGlvbi5iaW5kKHRoaXMpKX0+QWRkIENvZGUgU25pcHBldDwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdCdXR0b24gaWNvbj1cInBsdXNcIiBvbkNsaWNrPXt0aGlzLm5ld1NlY3Rpb24uYmluZCh0aGlzLCB0aGlzLm5ld01hdGhTZWN0aW9uLmJpbmQodGhpcykpfT5BZGQgTWF0aCBDb250ZW50PC9GbG9hdGluZ0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0J1dHRvbiBpY29uPVwicGljdHVyZS1vXCIgb25DbGljaz17dGhpcy5uZXdTZWN0aW9uLmJpbmQodGhpcywgdGhpcy5uZXdJbWFnZVNlY3Rpb24uYmluZCh0aGlzKSl9PkFkZCBJbWFnZTwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdCdXR0b24gaWNvbj1cInNhdmVcIiBzaXplPVwiYmlnXCIgb25DbGljaz17dGhpcy5zYXZlLmJpbmQodGhpcyl9PlNhdmUgQ29uY2VwdDwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5FZGl0TW9kdWxlUGFnZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgdGl0bGU6IFwiXCIsXG4gICAgc2x1ZzogXCJcIlxufVxuIiwiaW1wb3J0IHtFZGl0TW9kdWxlUGFnZX0gZnJvbSAnLi9FZGl0TW9kdWxlUGFnZS5qc3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gRWRpdE1vZHVsZVBhZ2VDb250cm9sbGVyKGN0eCwgbmV4dCkge1xuICAgIFJlYWN0LnJlbmRlcig8RWRpdE1vZHVsZVBhZ2UgY29udGV4dD17Y3R4fSBtb2R1bGU9e2N0eC5wYXJhbXMubW9kdWxlfSAvPiwgd2luZG93LmFwcC5kb21Sb290KTtcbn1cbiIsImV4cG9ydCBjbGFzcyBNb2R1bGVWaWV3UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAkLmdldChcIi9jb25jZXB0cy9jb25jZXB0L1wiICsgdGhpcy5wcm9wcy5jb250ZXh0LnBhcmFtcy5tb2R1bGUsXG4gICAgICAgICAgICAoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsZWFybmluZ01vZHVsZTogZGF0YVtcImxlYXJuaW5nX21vZHVsZVwiXSwgY29udGVudHM6IGRhdGFbXCJjb250ZW50c1wiXSwgbG9hZGVkOiB0cnVlfSlcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuY29udGV4dCk7XG5cbiAgICAgICAgdmFyIGJvZHk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubG9hZGVkKSB7XG4gICAgICAgICAgICBib2R5ID0gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMz57dGhpcy5wcm9wcy5jb250ZXh0LnBhcmFtcy5wcm9qZWN0fTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxoMj57dGhpcy5zdGF0ZS5sZWFybmluZ01vZHVsZS50aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY29udGVudHMubWFwKCBmdW5jdGlvbiggY29uY2VwdCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpPntjb25jZXB0fTwvbGk+O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtib2R5fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtNb2R1bGVWaWV3UGFnZX0gZnJvbSAnLi9Nb2R1bGVWaWV3UGFnZS5qc3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlVmlld1BhZ2VDb250cm9sbGVyKGN0eCwgbmV4dCkge1xuICAgIFJlYWN0LnJlbmRlcig8TW9kdWxlVmlld1BhZ2UgY29udGV4dD17Y3R4fSAvPiwgd2luZG93LmFwcC5kb21Sb290KTtcbn1cbiIsImltcG9ydCB7UHJvamVjdFN0YXJ0fSBmcm9tICcuLi9jb21wb25lbnRzL1Byb2plY3RTdGFydC5yZWFjdC5qc3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gUHJvamVjdFBhZ2VDb250cm9sbGVyKGN0eCwgbmV4dCkge1xuICAgIFJlYWN0LnJlbmRlcig8UHJvamVjdFN0YXJ0IGNvbnRleHQ9e2N0eH0gLz4sIHdpbmRvdy5hcHAuZG9tUm9vdCk7XG59XG4iLCJpbXBvcnQgcGFnZSBmcm9tICdwYWdlJztcbmltcG9ydCB7UHJvamVjdFBhZ2VDb250cm9sbGVyfSBmcm9tICcuL3BhZ2VzL1Byb2plY3RQYWdlQ29udHJvbGxlci5qc3gnO1xuaW1wb3J0IHtNb2R1bGVWaWV3UGFnZUNvbnRyb2xsZXJ9IGZyb20gJy4vcGFnZXMvTW9kdWxlVmlld1BhZ2VDb250cm9sbGVyLmpzeCc7XG5pbXBvcnQge0VkaXRNb2R1bGVQYWdlQ29udHJvbGxlcn0gZnJvbSAnLi9wYWdlcy9FZGl0TW9kdWxlUGFnZUNvbnRyb2xsZXIuanN4JztcbmltcG9ydCB7VGVzdH0gZnJvbSAnLi9jb21wb25lbnRzL1Rlc3QucmVhY3QuanN4JztcblxuXG5jb25zdCByZW5kZXIgPSAoY29tcG9uZW50KSA9PiBSZWFjdC5yZW5kZXIoXG4gICAgY29tcG9uZW50LFxuICAgIHdpbmRvdy5hcHAuZG9tUm9vdFxuKTtcblxudmFyIGJhc2VSb3V0ZSA9IFwiL2NvbmNlcHRzXCI7XG5cbnZhciByb3V0ZXMgPSB7fTtcblxucm91dGVzWycvJ10gPSBQcm9qZWN0UGFnZUNvbnRyb2xsZXI7XG5cbnJvdXRlc1snL3Rlc3QnXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJlbmRlcig8VGVzdCAvPik7XG59O1xuXG5yb3V0ZXNbJy9wcm9qZWN0Lzpwcm9qZWN0Lzptb2R1bGUnXSA9IE1vZHVsZVZpZXdQYWdlQ29udHJvbGxlcjtcbnJvdXRlc1snL2VkaXQnXSA9IEVkaXRNb2R1bGVQYWdlQ29udHJvbGxlcjtcbnJvdXRlc1snL2VkaXQvOm1vZHVsZSddID0gRWRpdE1vZHVsZVBhZ2VDb250cm9sbGVyO1xuXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLmJhc2VSb3V0ZSA9IFwiL2NvbmNlcHRzXCI7XG4gICAgfVxuXG4gICAgc3RhcnQoKVxuICAgIHtcblxuICAgICAgICBwYWdlKCcqJywgZnVuY3Rpb24oY3R4LCAgbmV4dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5pbml0KSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXBwLmRvbVJvb3QuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFwcC5kb21Sb290LmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gcm91dGVzKVxuICAgICAgICB7XG4gICAgICAgICAgICBwYWdlKGJhc2VSb3V0ZSArIGksIHJvdXRlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYWdlKHRoaXMuYmFzZVJvdXRlICsgJy8qJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==
