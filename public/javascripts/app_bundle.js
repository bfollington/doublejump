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

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var CodeContent = exports.CodeContent = (function (_React$Component) {
    function CodeContent(props) {
        _classCallCheck(this, CodeContent);

        _get(Object.getPrototypeOf(CodeContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value,
            language: this.props.language
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
                console.log("test");
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
                    { onDoubleClick: this.edit.bind(this) },
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
    value: ""
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

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var marked = require("marked");

var ImageContent = exports.ImageContent = (function (_React$Component) {
    function ImageContent(props) {
        _classCallCheck(this, ImageContent);

        _get(Object.getPrototypeOf(ImageContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value
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
                console.log("test");
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
                    null,
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
    value: ""
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

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var marked = require("marked");

var MarkdownContent = exports.MarkdownContent = (function (_React$Component) {
    function MarkdownContent(props) {
        _classCallCheck(this, MarkdownContent);

        _get(Object.getPrototypeOf(MarkdownContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value
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
                console.log("test");
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
                    console.log("Rendering markdown");
                    var $el = $(React.findDOMNode(this));

                    var renderTarget = $el.find(".markdown-content")[0];

                    renderTarget.innerHTML = marked(this.state.content);
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
                    { onDoubleClick: this.edit.bind(this) },
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
    value: ""
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","marked":"marked"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx":[function(require,module,exports){
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

var ContentType = require("components/editing/ContentType.jsx").ContentType;

var AceEditor = require("components/AceEditor.jsx").AceEditor;

var katex = require("katex");

var MathContent = exports.MathContent = (function (_React$Component) {
    function MathContent(props) {
        _classCallCheck(this, MathContent);

        _get(Object.getPrototypeOf(MathContent.prototype), "constructor", this).call(this, props);

        this.state = {
            content: this.props.value,
            editing: this.props.editContent
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
                console.log("test");
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
                    { onDoubleClick: this.edit.bind(this) },
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
    value: ""
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","katex":"katex"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePage.jsx":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Util = require("Util.jsx").Util;

var _EventsJsx = require("Events.jsx");

var Events = _EventsJsx.Events;
var SaveModuleFormEvent = _EventsJsx.SaveModuleFormEvent;

var CodeContent = require("components/editing/CodeContent.jsx").CodeContent;

var MathContent = require("components/editing/MathContent.jsx").MathContent;

var MarkdownContent = require("components/editing/MarkdownContent.jsx").MarkdownContent;

var ImageContent = require("components/editing/ImageContent.jsx").ImageContent;

var Sortable = require("components/Sortable.jsx").Sortable;

var FloatingButton = require("components/FloatingButton.jsx").FloatingButton;

var EditModulePage = exports.EditModulePage = (function (_React$Component) {
    function EditModulePage() {
        _classCallCheck(this, EditModulePage);

        this.state = {
            modules: [{}],
            currentModule: null,
            contentBlocks: []
        };
    }

    _inherits(EditModulePage, _React$Component);

    _createClass(EditModulePage, {
        handleEditConcept: {
            value: function handleEditConcept(e) {}
        },
        newSection: {
            value: function newSection(data) {
                var blocks = this.state.contentBlocks;
                blocks.push(data);

                this.setState({ contentBlocks: blocks });
            }
        },
        newMarkdownSection: {
            value: function newMarkdownSection(e) {
                this.newSection(React.createElement(MarkdownContent, { value: "", editable: this.isEditable }));
            }
        },
        newCodeSection: {
            value: function newCodeSection(e) {
                this.newSection(React.createElement(CodeContent, { value: "", editable: this.isEditable }));
            }
        },
        newMathSection: {
            value: function newMathSection(e) {
                this.newSection(React.createElement(MathContent, { value: "", editable: this.isEditable }));
            }
        },
        newImageSection: {
            value: function newImageSection(e) {
                this.newSection(React.createElement(ImageContent, { value: "", editable: this.isEditable }));
            }
        },
        save: {
            value: function save(e) {
                Events.emitRoot(SaveModuleFormEvent, this);
            }
        },
        isEditable: {
            value: function isEditable() {
                return true;
            }
        },
        render: {
            value: function render() {

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
                        ),
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
                                                    React.createElement("input", { type: "text", name: "learning_module[title]", id: "learning_module_title", className: "js-slug form-control", "data-object": "learning_module", "data-target": "slug" })
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
                                                    React.createElement("input", { type: "text", name: "learning_module[slug]", id: "learning_module_slug", className: "form-control" })
                                                )
                                            )
                                        ),
                                        React.createElement("div", { className: "content-ids" })
                                    )
                                )
                            )
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
                                { icon: "file-text", onClick: this.newMarkdownSection.bind(this) },
                                "Add New Markdown Content"
                            ),
                            React.createElement(
                                FloatingButton,
                                { icon: "code", onClick: this.newCodeSection.bind(this) },
                                "Add Code Snippet"
                            ),
                            React.createElement(
                                FloatingButton,
                                { icon: "plus", onClick: this.newMathSection.bind(this) },
                                "Add Math Content"
                            ),
                            React.createElement(
                                FloatingButton,
                                { icon: "picture-o", onClick: this.newImageSection.bind(this) },
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

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","Util.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx","components/FloatingButton.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/FloatingButton.jsx","components/Sortable.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Sortable.jsx","components/editing/CodeContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx","components/editing/ImageContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ImageContent.jsx","components/editing/MarkdownContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx","components/editing/MathContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePageController.jsx":[function(require,module,exports){
"use strict";

exports.EditModulePageController = EditModulePageController;
Object.defineProperty(exports, "__esModule", {
    value: true
});

var EditModulePage = require("./EditModulePage.jsx").EditModulePage;

function EditModulePageController(ctx, next) {
    React.render(React.createElement(EditModulePage, { context: ctx }), window.app.domRoot);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9hcHAuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvQ29tcG9uZW50LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L0V2ZW50cy5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9VdGlsLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvQWNlRWRpdG9yLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvRmxvYXRpbmdCdXR0b24uanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvY29tcG9uZW50cy9Qcm9qZWN0U3RhcnQucmVhY3QuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvY29tcG9uZW50cy9Tb3J0YWJsZS5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9jb21wb25lbnRzL1Rlc3QucmVhY3QuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvY29tcG9uZW50cy9lZGl0aW5nL0NvZGVDb250ZW50LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvZWRpdGluZy9Db250ZW50VHlwZS5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9jb21wb25lbnRzL2VkaXRpbmcvQ29udGVudFR5cGVUb29sYmFyLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvZWRpdGluZy9JbWFnZUNvbnRlbnQuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvY29tcG9uZW50cy9lZGl0aW5nL01hcmtkb3duQ29udGVudC5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9jb21wb25lbnRzL2VkaXRpbmcvTWF0aENvbnRlbnQuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvcGFnZXMvRWRpdE1vZHVsZVBhZ2UuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvcGFnZXMvRWRpdE1vZHVsZVBhZ2VDb250cm9sbGVyLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L3BhZ2VzL01vZHVsZVZpZXdQYWdlLmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L3BhZ2VzL01vZHVsZVZpZXdQYWdlQ29udHJvbGxlci5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9wYWdlcy9Qcm9qZWN0UGFnZUNvbnRyb2xsZXIuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0lD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VyxFQUV0QyxDQUFDLENBQUM7O0FBRUgsb0JBQUksRUFBRSxDQUFDO2FBQ1Y7Ozs7V0EvQlEsTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnLi9yb3V0ZXIuanN4Jztcblxud2luZG93LmFwcCA9IHsgZG9tUm9vdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSB9O1xuXG4kLmFqYXhQcmVmaWx0ZXIoZnVuY3Rpb24ob3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCB4aHIpIHtcbiAgICBpZiAoICFvcHRpb25zLmNyb3NzRG9tYWluICkge1xuICAgICAgICB2YXIgdG9rZW4gPSAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpO1xuICAgICAgICBpZiAodG9rZW4pIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUNTUkYtVG9rZW4nLCB0b2tlbik7XG4gICAgfVxufSk7XG5cblJlYWN0LmluaXRpYWxpemVUb3VjaEV2ZW50cyh0cnVlKTtcblxudmFyIHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbnJvdXRlci5zdGFydCgpO1xuIiwiZXhwb3J0IGNsYXNzIE1peGluIHtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKVxuICAgIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KClcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcylcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKVxuICAgIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSlcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpXG4gICAge1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxuICAgIHtcbiAgICAgICAgdGhpcy5taXhpbnMgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRNaXhpbihtaXhpbilcbiAgICB7XG4gICAgICAgIHRoaXMubWl4aW5zLnB1c2gobWl4aW4pO1xuICAgICAgICBtaXhpbi5jb21wb25lbnQgPSB0aGlzO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KClcbiAgICB7XG4gICAgICAgIHRoaXMubWl4aW5zLmZvckVhY2goIGZ1bmN0aW9uKG1peGluKSB7XG4gICAgICAgICAgICBtaXhpbi5jb21wb25lbnREaWRNb3VudCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcylcbiAgICB7XG4gICAgICAgIHRoaXMubWl4aW5zLmZvckVhY2goIGZ1bmN0aW9uKG1peGluKSB7XG4gICAgICAgICAgICBtaXhpbi5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSlcbiAgICB7XG4gICAgICAgIHRoaXMubWl4aW5zLmZvckVhY2goIGZ1bmN0aW9uKG1peGluKSB7XG4gICAgICAgICAgICBtaXhpbi5jb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50cyB7XG5cbiAgICBzdGF0aWMgZW1pdChlbCwgZXYsIGRhdGEpIHtcbiAgICAgICAgJChlbCkudHJpZ2dlcihldiwgZGF0YSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN1YnNjcmliZShlbCwgZXYsIGhhbmRsZXIpIHtcbiAgICAgICAgJChlbCkub24oZXYsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdWJzY3JpYmVSb290KGV2LCBoYW5kbGVyKSB7XG4gICAgICAgICQod2luZG93LmFwcC5kb21Sb290KS5vbihldiwgaGFuZGxlcik7XG4gICAgfVxuXG4gICAgc3RhdGljIHVuc3Vic2NyaWJlKGVsLCBldikge1xuICAgICAgICAkKGVsKS5vZmYoZXYpO1xuICAgIH1cblxuICAgIHN0YXRpYyB1bnN1YnNjcmliZVJvb3QoZXYsIGZuKSB7XG4gICAgICAgICQod2luZG93LmFwcC5kb21Sb290KS5vZmYoZXYsIGZuKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdW5zdWJzY3JpYmVBbGwoZWwpIHtcbiAgICAgICAgJChlbCkub2ZmKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVtaXRSb290KGV2LCBkYXRhKSB7XG4gICAgICAgIEV2ZW50cy5lbWl0KHdpbmRvdy5hcHAuZG9tUm9vdCwgZXYsIGRhdGEpO1xuICAgIH1cblxufVxuXG5leHBvcnQgdmFyIFNhdmVNb2R1bGVGb3JtRXZlbnQgPSBcImV2ZW50X3NhdmVfbW9kdWxlX2Zvcm1cIjtcbiIsImV4cG9ydCBjbGFzcyBVdGlsIHtcblxufVxuXG5VdGlsLnNldFRyYW5zZm9ybSA9IGZ1bmN0aW9uKGVsLCBzdHlsZSlcbntcbiAgICAkKGVsKS5jc3MoXCJ0cmFuc2Zvcm1cIiwgc3R5bGUpO1xuICAgICQoZWwpLmNzcyhcIi13ZWJraXQtdHJhbnNmb3JtXCIsIHN0eWxlKTtcbiAgICAkKGVsKS5jc3MoXCItbW96LXRyYW5zZm9ybVwiLCBzdHlsZSk7XG4gICAgJChlbCkuY3NzKFwiLW1zLXRyYW5zZm9ybVwiLCBzdHlsZSk7XG4gICAgJChlbCkuY3NzKFwiLW8tdHJhbnNmb3JtXCIsIHN0eWxlKTtcbn1cblxuVXRpbC5nZXRDU1JGID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgXCJwYXJhbVwiOiAkKFwibWV0YVtuYW1lPWNzcmYtcGFyYW1dXCIpLmF0dHIoXCJjb250ZW50XCIpLFxuICAgICAgICBcInRva2VuXCI6ICQoXCJtZXRhW25hbWU9Y3NyZi10b2tlbl1cIikuYXR0cihcImNvbnRlbnRcIilcbiAgICB9XG59XG5cblV0aWwuZ2V0Q1NSRkZvcm1GaWVsZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjc3JmID0gVXRpbC5nZXRDU1JGKCk7XG4gICAgcmV0dXJuIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT17Y3NyZi5wYXJhbX0gdmFsdWU9e2NzcmYudG9rZW59IC8+O1xufVxuIiwiLy8gdmFyIGFjZSA9IHJlcXVpcmUoJ2JyYWNlJyk7XG5cbnZhciBsYW5ncyA9IFtcImFiYXBcIixcImFiY1wiLFwiYWN0aW9uc2NyaXB0XCIsXCJhZGFcIixcImFwYWNoZV9jb25mXCIsXCJhcHBsZXNjcmlwdFwiLFwiYXNjaWlkb2NcIixcImFzc2VtYmx5X3g4NlwiLFwiYXV0b2hvdGtleVwiLFwiYmF0Y2hmaWxlXCIsXCJjOXNlYXJjaFwiLFwiY19jcHBcIixcImNpcnJ1XCIsXCJjbG9qdXJlXCIsXCJjb2JvbFwiLFwiY29mZmVlXCIsXCJjb2xkZnVzaW9uXCIsXCJjc2hhcnBcIixcImNzc1wiLFwiY3VybHlcIixcImRcIixcImRhcnRcIixcImRpZmZcIixcImRqYW5nb1wiLFwiZG9ja2VyZmlsZVwiLFwiZG90XCIsXCJlaWZmZWxcIixcImVqc1wiLFwiZWxpeGlyXCIsXCJlbG1cIixcImVybGFuZ1wiLFwiZm9ydGhcIixcImZ0bFwiLFwiZ2NvZGVcIixcImdoZXJraW5cIixcImdpdGlnbm9yZVwiLFwiZ2xzbFwiLFwiZ29sYW5nXCIsXCJncm9vdnlcIixcImhhbWxcIixcImhhbmRsZWJhcnNcIixcImhhc2tlbGxcIixcImhheGVcIixcImh0bWxcIixcImh0bWxfcnVieVwiLFwiaW5pXCIsXCJpb1wiLFwiamFja1wiLFwiamFkZVwiLFwiamF2YVwiLFwiamF2YXNjcmlwdFwiLFwianNvblwiLFwianNvbmlxXCIsXCJqc3BcIixcImpzeFwiLFwianVsaWFcIixcImxhdGV4XCIsXCJsZWFuXCIsXCJsZXNzXCIsXCJsaXF1aWRcIixcImxpc3BcIixcImxpdmVfc2NyaXB0XCIsXCJsaXZlc2NyaXB0XCIsXCJsb2dpcWxcIixcImxzbFwiLFwibHVhXCIsXCJsdWFwYWdlXCIsXCJsdWNlbmVcIixcIm1ha2VmaWxlXCIsXCJtYXJrZG93blwiLFwibWFza1wiLFwibWF0bGFiXCIsXCJtZWxcIixcIm1pcHNfYXNzZW1ibGVyXCIsXCJtaXBzYXNzZW1ibGVyXCIsXCJtdXNoY29kZVwiLFwibXlzcWxcIixcIm5peFwiLFwib2JqZWN0aXZlY1wiLFwib2NhbWxcIixcInBhc2NhbFwiLFwicGVybFwiLFwicGdzcWxcIixcInBocFwiLFwicGxhaW5fdGV4dFwiLFwicG93ZXJzaGVsbFwiLFwicHJhYXRcIixcInByb2xvZ1wiLFwicHJvcGVydGllc1wiLFwicHJvdG9idWZcIixcInB5dGhvblwiLFwiclwiLFwicmRvY1wiLFwicmh0bWxcIixcInJ1YnlcIixcInJ1c3RcIixcInNhc3NcIixcInNjYWRcIixcInNjYWxhXCIsXCJzY2hlbWVcIixcInNjc3NcIixcInNoXCIsXCJzanNcIixcInNtYXJ0eVwiLFwic25pcHBldHNcIixcInNveV90ZW1wbGF0ZVwiLFwic3BhY2VcIixcInNxbFwiLFwic3R5bHVzXCIsXCJzdmdcIixcInRjbFwiLFwidGV4XCIsXCJ0ZXh0XCIsXCJ0ZXh0aWxlXCIsXCJ0b21sXCIsXCJ0d2lnXCIsXCJ0eXBlc2NyaXB0XCIsXCJ2YWxhXCIsXCJ2YnNjcmlwdFwiLFwidmVsb2NpdHlcIixcInZlcmlsb2dcIixcInZoZGxcIixcInhtbFwiLFwieHF1ZXJ5XCIsXCJ5YW1sXCJdO1xuXG4vLyByZXF1aXJlKFwiYnJhY2UvbW9kZS9hY3Rpb25zY3JpcHRcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2NfY3BwXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9jbG9qdXJlXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9jb2ZmZWVcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL2NzaGFycFwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvY3NzXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9oYW5kbGViYXJzXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9odG1sXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9qYXZhXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9qYXZhc2NyaXB0XCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9qc29uXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9sYXRleFwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvbHVhXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9tYXJrZG93blwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvbXlzcWxcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL29iamVjdGl2ZWNcIiksIHJlcXVpcmUoXCJicmFjZS9tb2RlL3BocFwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvcGxhaW5fdGV4dFwiKSwgcmVxdWlyZShcImJyYWNlL21vZGUvcHl0aG9uXCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS9ydWJ5XCIpLCByZXF1aXJlKFwiYnJhY2UvbW9kZS94bWxcIik7XG4vLyByZXF1aXJlKCdicmFjZS90aGVtZS90ZXJtaW5hbCcpO1xuXG5leHBvcnQgY2xhc3MgQWNlRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuXG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLmxhbmd1YWdlID0gdGhpcy5wcm9wcy5sYW5ndWFnZTtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgICAgIGFjZS5jb25maWcuc2V0KCdiYXNlUGF0aCcsICcvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9hY2UvMS4xLjMvJyk7XG5cbiAgICAgICAgJChSZWFjdC5maW5kRE9NTm9kZSh0aGlzKSkuZmluZCgnW2RhdGEtZWRpdG9yXScpLmVhY2goIChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGVsID0gJCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChlbC5wcmV2KCkuaXMoXCIuYWNlX2VkaXRvclwiKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFscmVhZHkgYW4gYWNlIGVkaXRvclwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtb2RlID0gZWwuZGF0YSgnZWRpdG9yJyk7XG5cbiAgICAgICAgICAgIHZhciBlZGl0RGl2ID0gJCgnPGRpdj4nLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGVsLndpZHRoKCksXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLm1heCh0aGlzLnByb3BzLmhlaWdodCwgZWxbMF0uc2Nyb2xsSGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAnY2xhc3MnOiBlbC5hdHRyKCdjbGFzcycpXG4gICAgICAgICAgICB9KS5pbnNlcnRCZWZvcmUoZWwpO1xuXG4gICAgICAgICAgICBlbC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgICAgICB0aGlzLmVkaXRvciA9IGFjZS5lZGl0KGVkaXREaXZbMF0pO1xuXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0VmFsdWUoZWwudGV4dCgpKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvXCIgKyBtb2RlKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRVc2VTb2Z0VGFicyh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRVc2VXcmFwTW9kZSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRVc2VXb3JrZXIoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VGhlbWUoXCJhY2UvdGhlbWUvdGVybWluYWxcIik7XG5cbiAgICAgICAgICAgIC8vIEtlZXAgb3JpZ2luYWwgZm9ybSBmaWVsZCBpbiBzeW5jXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5rZWVwVGV4dEFyZWFJblN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkub24oJ2NoYW5nZScsICggZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlbC50ZXh0KHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25Db250ZW50Q2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ29udGVudENoYW5nZSh0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMpICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkuYmluZCh0aGlzKSApO1xuICAgIH1cblxuICAgIGxhbmd1YWdlQ2hhbmdlSGFuZGxlcihlKSB7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9cIiArIHRoaXMubGFuZ3VhZ2UpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uTGFuZ3VhZ2VDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25MYW5ndWFnZUNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIGxhbmd1YWdlU2VsZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNob3dMYW5ndWFnZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgbGFuZ3VhZ2VTZWxlY3Rpb24gPSBbXG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJsYW5ndWFnZVwiPjwvbGFiZWw+LFxuICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJsYW5ndWFnZVwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5sYW5ndWFnZX0gb25DaGFuZ2U9e3RoaXMubGFuZ3VhZ2VDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ncy5tYXAoIGZ1bmN0aW9uKGxhbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPG9wdGlvbiB2YWx1ZT17bGFuZ30+e2xhbmd9PC9vcHRpb24+O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7bGFuZ3VhZ2VTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGRhdGEtZWRpdG9yPXt0aGlzLnByb3BzLmxhbmd1YWdlfSBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbkFjZUVkaXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbGFuZ3VhZ2U6ICdtYXJrZG93bicsXG4gICAgaGVpZ2h0OiA2NCxcbiAgICB2YWx1ZTogXCJcIixcbiAgICBrZWVwVGV4dEFyZWFJblN5bmM6IHRydWUsXG4gICAgc2hvd0xhbmd1YWdlU2VsZWN0aW9uOiBmYWxzZVxufTtcbiIsImV4cG9ydCBjbGFzcyBGbG9hdGluZ0J1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB2YXIgZWwgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKTtcblxuICAgICAgICAkKGVsKS5maW5kKCdbcmVsPXRvb2x0aXBdJykudG9vbHRpcCgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgaWNvbkNsYXNzID0gdGhpcy5wcm9wcy5jbGFzc05hbWU7XG4gICAgICAgIGlmICh0eXBlb2YgaWNvbkNsYXNzID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGljb25DbGFzcyA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wicm91bmQtaWNvbiBcIiArIHRoaXMucHJvcHMuc2l6ZX0gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfT48aSBjbGFzc05hbWU9e2BmYSBmYS0ke3RoaXMucHJvcHMuaWNvbn0gYCArIGljb25DbGFzc30gcmVsPVwidG9vbHRpcFwiIHRpdGxlPXt0aGlzLnByb3BzLmNoaWxkcmVufSAvPjwvZGl2PjtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9Db21wb25lbnQuanN4JztcbmltcG9ydCB7Q29kZUNvbnRlbnR9IGZyb20gJy4vZWRpdGluZy9Db2RlQ29udGVudC5qc3gnO1xuaW1wb3J0IHtNYXRoQ29udGVudH0gZnJvbSAnLi9lZGl0aW5nL01hdGhDb250ZW50LmpzeCc7XG5pbXBvcnQge01hcmtkb3duQ29udGVudH0gZnJvbSAnLi9lZGl0aW5nL01hcmtkb3duQ29udGVudC5qc3gnO1xuaW1wb3J0IHBhZ2UgZnJvbSAncGFnZSc7XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhcnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpXG4gICAge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0U3RhdGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpZWxkOiBcInZhbHVlXCIsXG4gICAgICAgICAgICBuYW1lOiBcIkJvYlwiLFxuICAgICAgICAgICAgZWRpdEZpZWxkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG5hdmlnYXRlKGUpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRlZFwiKTtcbiAgICAgICAgcGFnZShcIi9jb25jZXB0cy90ZXN0XCIpO1xuICAgIH1cblxuICAgIGVkaXQoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0RmllbGQ6ICF0aGlzLnN0YXRlLmVkaXRGaWVsZH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XG4gICAgICAgICAgICAgICAgPGgyPlN0YXJ0IGEgTmV3IFByb2plY3Q8L2gyPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvY29uY2VwdHMvdGVzdFwiPkdvIHRvIHRlc3Q8L2E+XG4gICAgICAgICAgICAgICAgPENvZGVDb250ZW50IGVkaXRDb250ZW50PXt0aGlzLnN0YXRlLmVkaXRGaWVsZH0gdmFsdWU9XCJjb25zb2xlLmxvZyh0ZXN0KTtcIiAvPlxuICAgICAgICAgICAgICAgIDxNYXRoQ29udGVudCBlZGl0Q29udGVudD17dGhpcy5zdGF0ZS5lZGl0RmllbGR9IHZhbHVlPVwiXFxhbHBoYVxcYmV0YVxcZ2FtbWFcIiAvPlxuICAgICAgICAgICAgICAgIDxNYXJrZG93bkNvbnRlbnQgZWRpdENvbnRlbnQ9e3RoaXMuc3RhdGUuZWRpdEZpZWxkfSB2YWx1ZT1cIkhlbGxvIF9Zb3VfXCIgLz5cblxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy5lZGl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICBFZGl0IEZpZWxkXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiIHJvbGU9XCJncm91cFwiIG9uQ2xpY2s9e3RoaXMubmF2aWdhdGUuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBDbGljayBtZSB0byBBZGQgRGF0YVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xpY2sgbWUgdG8gUmVwbGF5IERhdGFcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIENsaWNrIG1lIHRvIFJlc2V0IERhdGFcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJ2YXIgZHJhZ3VsYSA9IHJlcXVpcmUoJ2RyYWd1bGEnKTtcblxuZXhwb3J0IGNsYXNzIFNvcnRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB2YXIgZWwgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xuXG4gICAgICAgIGRyYWd1bGEoZWwsIHtcbiAgICAgICAgICAgIG1vdmVzOiBmdW5jdGlvbiAoZWwsIGNvbnRhaW5lciwgaGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoaGFuZGxlKS5oYXNDbGFzcyhcImhhbmRsZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJzb3J0YWJsZVwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2Pik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL0NvbXBvbmVudC5qc3gnXG5cbmV4cG9ydCBjbGFzcyBUZXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxoMT5UZXN0PC9oMT5cbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudHMsIFNhdmVNb2R1bGVGb3JtRXZlbnR9IGZyb20gJ0V2ZW50cy5qc3gnO1xuaW1wb3J0IHtDb250ZW50VHlwZX0gZnJvbSAnY29tcG9uZW50cy9lZGl0aW5nL0NvbnRlbnRUeXBlLmpzeCc7XG5pbXBvcnQge0FjZUVkaXRvcn0gZnJvbSAnY29tcG9uZW50cy9BY2VFZGl0b3IuanN4JztcblxuZXhwb3J0IGNsYXNzIENvZGVDb250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbnN0cnVjdG9yKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLnByb3BzLmxhbmd1YWdlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIEV2ZW50cy5zdWJzY3JpYmVSb290KCBTYXZlTW9kdWxlRm9ybUV2ZW50LCB0aGlzLnNhdmVUb1NlcnZlci5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVW5tb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnVuc3Vic2NyaWJlUm9vdCggU2F2ZU1vZHVsZUZvcm1FdmVudCwgdGhpcy5zYXZlVG9TZXJ2ZXIuYmluZCh0aGlzKSApO1xuICAgIH1cblxuICAgIHNhdmVUb1NlcnZlcihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKTtcbiAgICB9XG5cbiAgICBsYW5ndWFnZUNoYW5nZShsYW5nKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xhbmd1YWdlOiBsYW5nfSk7XG4gICAgfVxuXG4gICAgY29udGVudENoYW5nZShjb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgZWRpdChlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVkaXRhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IHRoaXMuc3RhdGUuY29udGVudDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250ZW50OiB0aGlzLmNvbnRlbnRCdWZmZXJ9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG5cbiAgICBjYW5jZWwoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgZWRpdCA9IChcbiAgICAgICAgICAgIDxDb250ZW50VHlwZSB0aXRsZT1cIkNvZGUgQ29udGVudFwiIGVkaXRhYmxlPXt0aGlzLnByb3BzLmVkaXRhYmxlfT5cbiAgICAgICAgICAgICAgICA8QWNlRWRpdG9yIHNob3dMYW5ndWFnZVNlbGVjdGlvbj17dHJ1ZX0gb25MYW5ndWFnZUNoYW5nZT17dGhpcy5sYW5ndWFnZUNoYW5nZS5iaW5kKHRoaXMpfSBvbkNvbnRlbnRDaGFuZ2U9e3RoaXMuY29udGVudENoYW5nZS5iaW5kKHRoaXMpfSBsYW5ndWFnZT17dGhpcy5zdGF0ZS5sYW5ndWFnZX0gdmFsdWU9e3RoaXMuc3RhdGUuY29udGVudH0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbiBjcmVhdGUtYnV0dG9uXCIgb25DbGljaz17dGhpcy5zYXZlLmJpbmQodGhpcyl9PlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbiBjcmVhdGUtYnV0dG9uXCIgb25DbGljaz17dGhpcy5jYW5jZWwuYmluZCh0aGlzKX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8L0NvbnRlbnRUeXBlPlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciB2aWV3ID0gKFxuICAgICAgICAgICAgPHByZSBvbkRvdWJsZUNsaWNrPXt0aGlzLmVkaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLmxhbmd1YWdlfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuY29udGVudH1cbiAgICAgICAgICAgICAgICA8L2NvZGU+XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuc3RhdGUuZWRpdGluZyA/IGVkaXQgOiB2aWV3O1xuXG4gICAgICAgIHJldHVybiBDb250ZW50VHlwZS53cmFwQ29udGVudFR5cGUodGhpcywgY29udGVudCwgdGhpcy5lZGl0LmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuQ29kZUNvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xuICAgIGxhbmd1YWdlOiAnamF2YXNjcmlwdCcsXG4gICAgdmFsdWU6IFwiXCJcbn1cbiIsImltcG9ydCB7Q29udGVudFR5cGVUb29sYmFyfSBmcm9tIFwiLi9Db250ZW50VHlwZVRvb2xiYXIuanN4XCI7XG5pbXBvcnQge0Zsb2F0aW5nQnV0dG9ufSBmcm9tIFwiY29tcG9uZW50cy9GbG9hdGluZ0J1dHRvbi5qc3hcIjtcblxuZXhwb3J0IGNsYXNzIENvbnRlbnRUeXBlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb250ZW50LXR5cGUgXCIgKyB0aGlzLnByb3BzLmVkaXRhYmxlKCkgPyBcImVkaXRhYmxlXCIgOiBcIlwifT5cbiAgICAgICAgICAgICAgICA8Q29udGVudFR5cGVUb29sYmFyIGljb249e3RoaXMucHJvcHMudGl0bGVJY29ufT57dGhpcy5wcm9wcy50aXRsZX08L0NvbnRlbnRUeXBlVG9vbGJhcj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ29udGVudFR5cGUud3JhcENvbnRlbnRUeXBlID0gZnVuY3Rpb24oY3R4LCBjb250ZW50LCBlZGl0SGFuZGxlcikge1xuXG4gICAgdmFyIGlubmVyID0gW1xuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVkaXQtY29udGVudC10eXBlLXRvb2xzIGZsb2F0LXJpZ2h0XCI+XG4gICAgICAgICAgICA8RmxvYXRpbmdCdXR0b24gaWNvbj1cImFycm93c1wiIGNsYXNzTmFtZT1cImhhbmRsZVwiPk1vdmU8L0Zsb2F0aW5nQnV0dG9uPlxuICAgICAgICAgICAgPEZsb2F0aW5nQnV0dG9uIGljb249XCJwZW5jaWxcIiBvbkNsaWNrPXtlZGl0SGFuZGxlcn0+RWRpdDwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICAge2NvbnRlbnR9XG4gICAgXTtcblxuICAgIGlmICghY3R4LnByb3BzLmVkaXRhYmxlKCkpIHtcbiAgICAgICAgaW5uZXIgPSBjb250ZW50O1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImJveCBjb250ZW50LXR5cGUgXCIgKyAoY3R4LnByb3BzLmVkaXRhYmxlKCkgPyBcImVkaXRhYmxlXCIgOiBcIlwiKX0gPlxuICAgICAgICAgICAge2lubmVyfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiZXhwb3J0IGNsYXNzIENvbnRlbnRUeXBlVG9vbGJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LXR5cGUtdG9vbGJhclwiPlxuICAgICAgICAgICAgICAgIDxoND5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPXtcImZhIG1hcmdpbi1yaWdodFwiICsgdGhpcy5wcm9wcy5pY29ufSAvPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudHMsIFNhdmVNb2R1bGVGb3JtRXZlbnR9IGZyb20gJ0V2ZW50cy5qc3gnO1xuaW1wb3J0IHtDb250ZW50VHlwZX0gZnJvbSAnY29tcG9uZW50cy9lZGl0aW5nL0NvbnRlbnRUeXBlLmpzeCc7XG5pbXBvcnQge0FjZUVkaXRvcn0gZnJvbSAnY29tcG9uZW50cy9BY2VFZGl0b3IuanN4JztcbnZhciBtYXJrZWQgPSByZXF1aXJlKCdtYXJrZWQnKTtcblxuZXhwb3J0IGNsYXNzIEltYWdlQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlci5jb25zdHJ1Y3Rvcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucHJvcHMudmFsdWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgRXZlbnRzLnN1YnNjcmliZVJvb3QoIFNhdmVNb2R1bGVGb3JtRXZlbnQsIHRoaXMuc2F2ZVRvU2VydmVyLmJpbmQodGhpcykgKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVbm1vdW50KCkge1xuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmVSb290KCBTYXZlTW9kdWxlRm9ybUV2ZW50LCB0aGlzLnNhdmVUb1NlcnZlci5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgc2F2ZVRvU2VydmVyKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnRlbnRDaGFuZ2UoY29udGVudCkge1xuICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgZWRpdChlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVkaXRhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IHRoaXMuc3RhdGUuY29udGVudDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250ZW50OiB0aGlzLmNvbnRlbnRCdWZmZXJ9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG5cbiAgICBjYW5jZWwoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgZWRpdCA9IChcbiAgICAgICAgICAgIDxDb250ZW50VHlwZSB0aXRsZT1cIkltYWdlIENvbnRlbnRcIiBlZGl0YWJsZT17dGhpcy5wcm9wcy5lZGl0YWJsZX0+XG4gICAgICAgICAgICAgICAgPEFjZUVkaXRvciBvbkNvbnRlbnRDaGFuZ2U9e3RoaXMuY29udGVudENoYW5nZS5iaW5kKHRoaXMpfSBsYW5ndWFnZT0nbWFya2Rvd24nIHZhbHVlPXt0aGlzLnN0YXRlLmNvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24gY3JlYXRlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuc2F2ZS5iaW5kKHRoaXMpfT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24gY3JlYXRlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuY2FuY2VsLmJpbmQodGhpcyl9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9Db250ZW50VHlwZT5cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgdmlldyA9IChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9e3RoaXMuc3RhdGUuY29udGVudH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5zdGF0ZS5lZGl0aW5nID8gZWRpdCA6IHZpZXc7XG5cbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLndyYXBDb250ZW50VHlwZSh0aGlzLCBjb250ZW50LCB0aGlzLmVkaXQuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5JbWFnZUNvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xuICAgIHZhbHVlOiBcIlwiXG59XG4iLCJpbXBvcnQge0V2ZW50cywgU2F2ZU1vZHVsZUZvcm1FdmVudH0gZnJvbSAnRXZlbnRzLmpzeCc7XG5pbXBvcnQge0NvbnRlbnRUeXBlfSBmcm9tICdjb21wb25lbnRzL2VkaXRpbmcvQ29udGVudFR5cGUuanN4JztcbmltcG9ydCB7QWNlRWRpdG9yfSBmcm9tICdjb21wb25lbnRzL0FjZUVkaXRvci5qc3gnO1xudmFyIG1hcmtlZCA9IHJlcXVpcmUoJ21hcmtlZCcpO1xuXG5leHBvcnQgY2xhc3MgTWFya2Rvd25Db250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbnN0cnVjdG9yKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBFdmVudHMuc3Vic2NyaWJlUm9vdCggU2F2ZU1vZHVsZUZvcm1FdmVudCwgdGhpcy5zYXZlVG9TZXJ2ZXIuYmluZCh0aGlzKSApO1xuICAgICAgICB0aGlzLnJlbmRlck1hdGgoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVbm1vdW50KCkge1xuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmVSb290KCBTYXZlTW9kdWxlRm9ybUV2ZW50LCB0aGlzLnNhdmVUb1NlcnZlci5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlck1hdGgoKTtcbiAgICB9XG5cbiAgICBzYXZlVG9TZXJ2ZXIoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgfVxuXG4gICAgY29udGVudENoYW5nZShjb250ZW50KSB7XG4gICAgICAgdGhpcy5jb250ZW50QnVmZmVyID0gY29udGVudDtcbiAgICB9XG5cbiAgICByZW5kZXJNYXRoKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuZWRpdGluZykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZW5kZXJpbmcgbWFya2Rvd25cIik7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChSZWFjdC5maW5kRE9NTm9kZSh0aGlzKSk7XG5cbiAgICAgICAgICAgIHZhciByZW5kZXJUYXJnZXQgPSAkZWwuZmluZChcIi5tYXJrZG93bi1jb250ZW50XCIpWzBdO1xuXG4gICAgICAgICAgICByZW5kZXJUYXJnZXQuaW5uZXJIVE1MID0gbWFya2VkKHRoaXMuc3RhdGUuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgZWRpdChlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVkaXRhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IHRoaXMuc3RhdGUuY29udGVudDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250ZW50OiB0aGlzLmNvbnRlbnRCdWZmZXJ9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG5cbiAgICBjYW5jZWwoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgZWRpdCA9IChcbiAgICAgICAgICAgIDxDb250ZW50VHlwZSB0aXRsZT1cIk1hcmtkb3duIENvbnRlbnRcIiBlZGl0YWJsZT17dGhpcy5wcm9wcy5lZGl0YWJsZX0+XG4gICAgICAgICAgICAgICAgPEFjZUVkaXRvciBvbkNvbnRlbnRDaGFuZ2U9e3RoaXMuY29udGVudENoYW5nZS5iaW5kKHRoaXMpfSBsYW5ndWFnZT0nbWFya2Rvd24nIHZhbHVlPXt0aGlzLnN0YXRlLmNvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24gY3JlYXRlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuc2F2ZS5iaW5kKHRoaXMpfT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24gY3JlYXRlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuY2FuY2VsLmJpbmQodGhpcyl9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9Db250ZW50VHlwZT5cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgdmlldyA9IChcbiAgICAgICAgICAgIDxkaXYgb25Eb3VibGVDbGljaz17dGhpcy5lZGl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFya2Rvd24tY29udGVudFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLnN0YXRlLmVkaXRpbmcgPyBlZGl0IDogdmlldztcblxuICAgICAgICByZXR1cm4gQ29udGVudFR5cGUud3JhcENvbnRlbnRUeXBlKHRoaXMsIGNvbnRlbnQsIHRoaXMuZWRpdC5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbk1hcmtkb3duQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgdmFsdWU6IFwiXCJcbn1cbiIsImltcG9ydCB7RXZlbnRzLCBTYXZlTW9kdWxlRm9ybUV2ZW50fSBmcm9tICdFdmVudHMuanN4JztcbmltcG9ydCB7Q29udGVudFR5cGV9IGZyb20gJ2NvbXBvbmVudHMvZWRpdGluZy9Db250ZW50VHlwZS5qc3gnO1xuaW1wb3J0IHtBY2VFZGl0b3J9IGZyb20gJ2NvbXBvbmVudHMvQWNlRWRpdG9yLmpzeCc7XG52YXIga2F0ZXggPSByZXF1aXJlKCdrYXRleCcpO1xuXG5leHBvcnQgY2xhc3MgTWF0aENvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIuY29uc3RydWN0b3IocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgICAgICAgZWRpdGluZzogdGhpcy5wcm9wcy5lZGl0Q29udGVudFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBFdmVudHMuc3Vic2NyaWJlUm9vdCggU2F2ZU1vZHVsZUZvcm1FdmVudCwgdGhpcy5zYXZlVG9TZXJ2ZXIuYmluZCh0aGlzKSApO1xuICAgICAgICB0aGlzLnJlbmRlck1hdGgoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVbm1vdW50KCkge1xuICAgICAgICBFdmVudHMudW5zdWJzY3JpYmVSb290KCBTYXZlTW9kdWxlRm9ybUV2ZW50LCB0aGlzLnNhdmVUb1NlcnZlci5iaW5kKHRoaXMpICk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlck1hdGgoKTtcbiAgICB9XG5cbiAgICBzYXZlVG9TZXJ2ZXIoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgfVxuXG4gICAgY29udGVudENoYW5nZShjb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudEJ1ZmZlciA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcmVuZGVyTWF0aCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyaW5nIG1hdGhcIik7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChSZWFjdC5maW5kRE9NTm9kZSh0aGlzKSk7XG5cbiAgICAgICAgICAgIHZhciByZW5kZXJUYXJnZXQgPSAkZWwuZmluZChcIi5tYXRoLWNvbnRlbnRcIilbMF07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGthdGV4LnJlbmRlcih0aGlzLnN0YXRlLmNvbnRlbnQsIHJlbmRlclRhcmdldCwgeyBkaXNwbGF5TW9kZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlbmRlclRhcmdldC5pbm5lckhUTUwgPSBcIk1hdGggUmVuZGVyIEVycm9yOiBcIiArIGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkaXQoZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5lZGl0YWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRCdWZmZXIgPSB0aGlzLnN0YXRlLmNvbnRlbnQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGVudDogdGhpcy5jb250ZW50QnVmZmVyfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIGVkaXQgPSAoXG4gICAgICAgICAgICA8Q29udGVudFR5cGUgdGl0bGU9XCJNYXRoIENvbnRlbnRcIiBlZGl0YWJsZT17dGhpcy5wcm9wcy5lZGl0YWJsZX0+XG4gICAgICAgICAgICAgICAgPEFjZUVkaXRvciBvbkNvbnRlbnRDaGFuZ2U9e3RoaXMuY29udGVudENoYW5nZS5iaW5kKHRoaXMpfSBsYW5ndWFnZT0nbGF0ZXgnIHZhbHVlPXt0aGlzLnN0YXRlLmNvbnRlbnR9IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24gY3JlYXRlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuc2F2ZS5iaW5kKHRoaXMpfT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24gY3JlYXRlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuY2FuY2VsLmJpbmQodGhpcyl9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9Db250ZW50VHlwZT5cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgdmlldyA9IChcbiAgICAgICAgICAgIDxkaXYgb25Eb3VibGVDbGljaz17dGhpcy5lZGl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0aC1jb250ZW50XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuc3RhdGUuZWRpdGluZyA/IGVkaXQgOiB2aWV3O1xuXG4gICAgICAgIHJldHVybiBDb250ZW50VHlwZS53cmFwQ29udGVudFR5cGUodGhpcywgY29udGVudCwgdGhpcy5lZGl0LmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuTWF0aENvbnRlbnQuZGVmYXVsdFByb3BzID0ge1xuICAgIHZhbHVlOiBcIlwiXG59XG4iLCJpbXBvcnQge1V0aWx9IGZyb20gJ1V0aWwuanN4JztcbmltcG9ydCB7RXZlbnRzLCBTYXZlTW9kdWxlRm9ybUV2ZW50fSBmcm9tICdFdmVudHMuanN4JztcbmltcG9ydCB7Q29kZUNvbnRlbnR9IGZyb20gJ2NvbXBvbmVudHMvZWRpdGluZy9Db2RlQ29udGVudC5qc3gnO1xuaW1wb3J0IHtNYXRoQ29udGVudH0gZnJvbSAnY29tcG9uZW50cy9lZGl0aW5nL01hdGhDb250ZW50LmpzeCc7XG5pbXBvcnQge01hcmtkb3duQ29udGVudH0gZnJvbSAnY29tcG9uZW50cy9lZGl0aW5nL01hcmtkb3duQ29udGVudC5qc3gnO1xuaW1wb3J0IHtJbWFnZUNvbnRlbnR9IGZyb20gJ2NvbXBvbmVudHMvZWRpdGluZy9JbWFnZUNvbnRlbnQuanN4JztcbmltcG9ydCB7U29ydGFibGV9IGZyb20gJ2NvbXBvbmVudHMvU29ydGFibGUuanN4JztcbmltcG9ydCB7RmxvYXRpbmdCdXR0b259IGZyb20gJ2NvbXBvbmVudHMvRmxvYXRpbmdCdXR0b24uanN4JztcblxuZXhwb3J0IGNsYXNzIEVkaXRNb2R1bGVQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIG1vZHVsZXM6IFt7fV0sXG4gICAgICAgICAgICBjdXJyZW50TW9kdWxlOiBudWxsLFxuICAgICAgICAgICAgY29udGVudEJsb2NrczogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUVkaXRDb25jZXB0KGUpIHtcblxuICAgIH1cblxuICAgIG5ld1NlY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgYmxvY2tzID0gdGhpcy5zdGF0ZS5jb250ZW50QmxvY2tzO1xuICAgICAgICBibG9ja3MucHVzaChkYXRhKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250ZW50QmxvY2tzOiBibG9ja3N9KTtcbiAgICB9XG5cbiAgICBuZXdNYXJrZG93blNlY3Rpb24oZSkge1xuICAgICAgICB0aGlzLm5ld1NlY3Rpb24oPE1hcmtkb3duQ29udGVudCB2YWx1ZT1cIlwiIGVkaXRhYmxlPXt0aGlzLmlzRWRpdGFibGV9IC8+KTtcbiAgICB9XG5cbiAgICBuZXdDb2RlU2VjdGlvbihlKSB7XG4gICAgICAgIHRoaXMubmV3U2VjdGlvbig8Q29kZUNvbnRlbnQgdmFsdWU9XCJcIiBlZGl0YWJsZT17dGhpcy5pc0VkaXRhYmxlfSAvPik7XG4gICAgfVxuXG4gICAgbmV3TWF0aFNlY3Rpb24oZSkge1xuICAgICAgICB0aGlzLm5ld1NlY3Rpb24oPE1hdGhDb250ZW50IHZhbHVlPVwiXCIgZWRpdGFibGU9e3RoaXMuaXNFZGl0YWJsZX0gLz4pO1xuICAgIH1cblxuICAgIG5ld0ltYWdlU2VjdGlvbihlKSB7XG4gICAgICAgIHRoaXMubmV3U2VjdGlvbig8SW1hZ2VDb250ZW50IHZhbHVlPVwiXCIgZWRpdGFibGU9e3RoaXMuaXNFZGl0YWJsZX0gLz4pO1xuICAgIH1cblxuICAgIHNhdmUoZSkge1xuICAgICAgICBFdmVudHMuZW1pdFJvb3QoU2F2ZU1vZHVsZUZvcm1FdmVudCwgdGhpcyk7XG4gICAgfVxuXG4gICAgaXNFZGl0YWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW4tY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3JlYXRlLXN0ZXAtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwibGVhcm5pbmdfbW9kdWxlXCIgbmFtZT1cImxlYXJuaW5nX21vZHVsZVwiIGNsYXNzTmFtZT1cInNlbGVjdDJcIiBkZWZhdWx0VmFsdWU9e3RoaXMuc3RhdGUuY3VycmVudE1vZHVsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUubW9kdWxlcy5tYXAoIG1vZHVsZSA9PiA8b3B0aW9uIHZhbHVlPXttb2R1bGUuaWR9Pnttb2R1bGUudGl0bGV9PC9vcHRpb24+ICkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiY3JlYXRlLWJ1dHRvbiBidXR0b25cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRDb25jZXB0LmJpbmQodGhpcyl9PkVkaXQgQ29uY2VwdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+RWRpdCBDb25jZXB0PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiL2NvbmNlcHRzL21ha2UvXCIgYWNjZXB0Q2hhcnNldD1cIlVURi04XCIgaWQ9XCJhZGRTdGVwRm9ybVwiIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgVXRpbC5nZXRDU1JGRm9ybUZpZWxkKCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJsZWFybmluZ19tb2R1bGVfdGl0bGVcIj5Db25jZXB0IFRpdGxlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsZWFybmluZ19tb2R1bGVbdGl0bGVdXCIgaWQ9XCJsZWFybmluZ19tb2R1bGVfdGl0bGVcIiBjbGFzc05hbWU9XCJqcy1zbHVnIGZvcm0tY29udHJvbFwiIGRhdGEtb2JqZWN0PVwibGVhcm5pbmdfbW9kdWxlXCIgZGF0YS10YXJnZXQ9XCJzbHVnXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImxlYXJuaW5nX21vZHVsZV9zbHVnXCI+Q29uY2VwdCBTbHVnIChGb3IgVVJMKTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxlYXJuaW5nX21vZHVsZVtzbHVnXVwiIGlkPVwibGVhcm5pbmdfbW9kdWxlX3NsdWdcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1pZHNcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8U29ydGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuY29udGVudEJsb2Nrcy5tYXAoYmxvY2sgPT4gYmxvY2spIH1cbiAgICAgICAgICAgICAgICAgICAgPC9Tb3J0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbG9hdGluZy10b29sc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nQnV0dG9uIGljb249XCJmaWxlLXRleHRcIiBvbkNsaWNrPXt0aGlzLm5ld01hcmtkb3duU2VjdGlvbi5iaW5kKHRoaXMpfT5BZGQgTmV3IE1hcmtkb3duIENvbnRlbnQ8L0Zsb2F0aW5nQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZsb2F0aW5nQnV0dG9uIGljb249XCJjb2RlXCIgb25DbGljaz17dGhpcy5uZXdDb2RlU2VjdGlvbi5iaW5kKHRoaXMpfT5BZGQgQ29kZSBTbmlwcGV0PC9GbG9hdGluZ0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0J1dHRvbiBpY29uPVwicGx1c1wiIG9uQ2xpY2s9e3RoaXMubmV3TWF0aFNlY3Rpb24uYmluZCh0aGlzKX0+QWRkIE1hdGggQ29udGVudDwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdCdXR0b24gaWNvbj1cInBpY3R1cmUtb1wiIG9uQ2xpY2s9e3RoaXMubmV3SW1hZ2VTZWN0aW9uLmJpbmQodGhpcyl9PkFkZCBJbWFnZTwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RmxvYXRpbmdCdXR0b24gaWNvbj1cInNhdmVcIiBzaXplPVwiYmlnXCIgb25DbGljaz17dGhpcy5zYXZlLmJpbmQodGhpcyl9PlNhdmUgQ29uY2VwdDwvRmxvYXRpbmdCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFZGl0TW9kdWxlUGFnZX0gZnJvbSAnLi9FZGl0TW9kdWxlUGFnZS5qc3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gRWRpdE1vZHVsZVBhZ2VDb250cm9sbGVyKGN0eCwgbmV4dCkge1xuICAgIFJlYWN0LnJlbmRlcig8RWRpdE1vZHVsZVBhZ2UgY29udGV4dD17Y3R4fSAvPiwgd2luZG93LmFwcC5kb21Sb290KTtcbn1cbiIsImV4cG9ydCBjbGFzcyBNb2R1bGVWaWV3UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxvYWRlZDogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAkLmdldChcIi9jb25jZXB0cy9jb25jZXB0L1wiICsgdGhpcy5wcm9wcy5jb250ZXh0LnBhcmFtcy5tb2R1bGUsXG4gICAgICAgICAgICAoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsZWFybmluZ01vZHVsZTogZGF0YVtcImxlYXJuaW5nX21vZHVsZVwiXSwgY29udGVudHM6IGRhdGFbXCJjb250ZW50c1wiXSwgbG9hZGVkOiB0cnVlfSlcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuY29udGV4dCk7XG5cbiAgICAgICAgdmFyIGJvZHk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubG9hZGVkKSB7XG4gICAgICAgICAgICBib2R5ID0gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMz57dGhpcy5wcm9wcy5jb250ZXh0LnBhcmFtcy5wcm9qZWN0fTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxoMj57dGhpcy5zdGF0ZS5sZWFybmluZ01vZHVsZS50aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY29udGVudHMubWFwKCBmdW5jdGlvbiggY29uY2VwdCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpPntjb25jZXB0fTwvbGk+O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtib2R5fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtNb2R1bGVWaWV3UGFnZX0gZnJvbSAnLi9Nb2R1bGVWaWV3UGFnZS5qc3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlVmlld1BhZ2VDb250cm9sbGVyKGN0eCwgbmV4dCkge1xuICAgIFJlYWN0LnJlbmRlcig8TW9kdWxlVmlld1BhZ2UgY29udGV4dD17Y3R4fSAvPiwgd2luZG93LmFwcC5kb21Sb290KTtcbn1cbiIsImltcG9ydCB7UHJvamVjdFN0YXJ0fSBmcm9tICcuLi9jb21wb25lbnRzL1Byb2plY3RTdGFydC5yZWFjdC5qc3gnO1xuXG5leHBvcnQgZnVuY3Rpb24gUHJvamVjdFBhZ2VDb250cm9sbGVyKGN0eCwgbmV4dCkge1xuICAgIFJlYWN0LnJlbmRlcig8UHJvamVjdFN0YXJ0IGNvbnRleHQ9e2N0eH0gLz4sIHdpbmRvdy5hcHAuZG9tUm9vdCk7XG59XG4iLCJpbXBvcnQgcGFnZSBmcm9tICdwYWdlJztcbmltcG9ydCB7UHJvamVjdFBhZ2VDb250cm9sbGVyfSBmcm9tICcuL3BhZ2VzL1Byb2plY3RQYWdlQ29udHJvbGxlci5qc3gnO1xuaW1wb3J0IHtNb2R1bGVWaWV3UGFnZUNvbnRyb2xsZXJ9IGZyb20gJy4vcGFnZXMvTW9kdWxlVmlld1BhZ2VDb250cm9sbGVyLmpzeCc7XG5pbXBvcnQge0VkaXRNb2R1bGVQYWdlQ29udHJvbGxlcn0gZnJvbSAnLi9wYWdlcy9FZGl0TW9kdWxlUGFnZUNvbnRyb2xsZXIuanN4JztcbmltcG9ydCB7VGVzdH0gZnJvbSAnLi9jb21wb25lbnRzL1Rlc3QucmVhY3QuanN4JztcblxuXG5jb25zdCByZW5kZXIgPSAoY29tcG9uZW50KSA9PiBSZWFjdC5yZW5kZXIoXG4gICAgY29tcG9uZW50LFxuICAgIHdpbmRvdy5hcHAuZG9tUm9vdFxuKTtcblxudmFyIGJhc2VSb3V0ZSA9IFwiL2NvbmNlcHRzXCI7XG5cbnZhciByb3V0ZXMgPSB7fTtcblxucm91dGVzWycvJ10gPSBQcm9qZWN0UGFnZUNvbnRyb2xsZXI7XG5cbnJvdXRlc1snL3Rlc3QnXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJlbmRlcig8VGVzdCAvPik7XG59O1xuXG5yb3V0ZXNbJy9wcm9qZWN0Lzpwcm9qZWN0Lzptb2R1bGUnXSA9IE1vZHVsZVZpZXdQYWdlQ29udHJvbGxlcjtcbnJvdXRlc1snL2VkaXQnXSA9IEVkaXRNb2R1bGVQYWdlQ29udHJvbGxlcjtcblxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5iYXNlUm91dGUgPSBcIi9jb25jZXB0c1wiO1xuICAgIH1cblxuICAgIHN0YXJ0KClcbiAgICB7XG5cbiAgICAgICAgcGFnZSgnKicsIGZ1bmN0aW9uKGN0eCwgIG5leHQpIHtcbiAgICAgICAgICAgIGlmIChjdHguaW5pdCkge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFwcC5kb21Sb290LmNsYXNzTGlzdC5hZGQoJ3RyYW5zaXRpb24nKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hcHAuZG9tUm9vdC5jbGFzc0xpc3QucmVtb3ZlKCd0cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKHZhciBpIGluIHJvdXRlcylcbiAgICAgICAge1xuICAgICAgICAgICAgcGFnZShiYXNlUm91dGUgKyBpLCByb3V0ZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFnZSh0aGlzLmJhc2VSb3V0ZSArICcvKicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhZ2UoKTtcbiAgICB9XG59XG4iXX0=
