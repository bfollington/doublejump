(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/API.js":[function(require,module,exports){
"use strict";

var API = {};

/**
 * Record a transition between two learning modules.
 * @param  {Module ID} current
 * @param  {Module ID} next
 */
API.transition = function (current, next) {
    $.post("/api/transition/", JSON.stringify({ current: current, next: next }));
};

API.finishedModule = function (project, module, callback) {
    $.post("/api/finished_module/", JSON.stringify({ project: project, module: module }), callback);
};

API.startProject = function (name, slug, callback) {
    $.post("/api/project/", JSON.stringify({ title: name, slug: slug }), callback);
};

module.exports = API;

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = (function () {
    function Events() {
        _classCallCheck(this, Events);
    }

    _createClass(Events, null, [{
        key: "emit",
        value: function emit(el, ev, data) {
            $(el).trigger(ev, data);
        }
    }, {
        key: "subscribe",
        value: function subscribe(el, ev, handler) {
            $(el).on(ev, handler);
        }
    }, {
        key: "subscribeRoot",
        value: function subscribeRoot(ev, handler) {
            $(window.app.domRoot).on(ev, handler);
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(el, ev) {
            $(el).off(ev);
        }
    }, {
        key: "unsubscribeRoot",
        value: function unsubscribeRoot(ev, fn) {
            $(window.app.domRoot).off(ev, fn);
        }
    }, {
        key: "unsubscribeAll",
        value: function unsubscribeAll(el) {
            $(el).off();
        }
    }, {
        key: "emitRoot",
        value: function emitRoot(ev, data) {
            Events.emit(window.app.domRoot, ev, data);
        }
    }]);

    return Events;
})();

exports.Events = Events;
var SaveModuleFormEvent = "event_save_module_form";
exports.SaveModuleFormEvent = SaveModuleFormEvent;
var ContentTypeSubmissionSuccessEvent = "event_content_type_submission_success";
exports.ContentTypeSubmissionSuccessEvent = ContentTypeSubmissionSuccessEvent;

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Mixin.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
var Mixin = {};

exports.Mixin = Mixin;
var reserved = ["componentDidUnmount", "componentDidMount"];

Mixin.apply = function (parentComponent, mixin, opts) {

    var key;

    for (var i in reserved) {
        key = reserved[i];

        if (mixin[key] !== undefined) {

            if (!parentComponent[key]) {
                parentComponent[key] = mixin[key].bind(parentComponent);
            } else {
                var one = parentComponent[key].bind(parentComponent);
                var two = mixin[key].bind(parentComponent);

                if (one && two) {
                    parentComponent[key] = function () {
                        one();
                        two();
                    };
                }
            }

            delete mixin[key];
            console.log(key, "was applied");
        }
    }

    for (key in mixin) {
        // Skip init method
        if (key !== "init" && reserved.indexOf(key) == -1) {
            parentComponent[key] = mixin[key].bind(parentComponent);
        }
    }

    if (mixin.init !== undefined) {
        mixin.init.bind(parentComponent)(opts);
    }
};

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Slug.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Slug = function Slug() {
    _classCallCheck(this, Slug);
};

exports.Slug = Slug;

Slug.convertToSlug = function (text) {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx":[function(require,module,exports){
"use strict";

var React = require("react");

var Util = {};

Util.clone = function (obj) {
    var ret = {};

    $.extend(ret, obj);

    return ret;
};

Util.read = function (func) {
    try {
        return func();
    } catch (err) {}
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
        "param": $("meta[name=csrf-param]").attr("content"),
        "token": $("meta[name=csrf-token]").attr("content")
    };
};

Util.getCSRFFormField = function () {
    var csrf = Util.getCSRF();
    return React.createElement("input", { type: "hidden", name: csrf.param, value: csrf.token });
};

Util.transformMongoId = function (obj) {
    if (obj["_id"]) {
        if (obj["_id"]["$oid"]) {
            obj["id"] = obj["_id"]["$oid"];
        }
    }
};

module.exports = Util;

},{"react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Module.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.requestModule = requestModule;
exports.receiveModule = receiveModule;
exports.requestModules = requestModules;
exports.receiveModules = receiveModules;
exports.fetchModule = fetchModule;
exports.fetchModules = fetchModules;
var REQUEST_MODULE = "REQUEST_MODULE";
exports.REQUEST_MODULE = REQUEST_MODULE;

function requestModule(id) {
    return { type: REQUEST_MODULE, id: id };
}

var RECEIVE_MODULE = "RECEIVE_MODULE";
exports.RECEIVE_MODULE = RECEIVE_MODULE;

function receiveModule(id, data) {
    return { type: RECEIVE_MODULE, id: id, data: data };
}

var REQUEST_MODULES = "REQUEST_MODULES";
exports.REQUEST_MODULES = REQUEST_MODULES;

function requestModules() {
    return { type: REQUEST_MODULES };
}

var RECEIVE_MODULES = "RECEIVE_MODULES";
exports.RECEIVE_MODULES = RECEIVE_MODULES;

function receiveModules(data) {
    return { type: RECEIVE_MODULES, data: data };
}

function fetchModule(module) {

    return new Promise(function (resolve, reject) {
        window.store.dispatch(requestModule(module));

        $.get("/api/concept/" + module, {}, function (data) {
            window.store.dispatch(receiveModule(module, data));
            resolve();
        });
    });
}

function fetchModules() {

    return new Promise(function (resolve, reject) {
        window.store.dispatch(requestModules());

        $.get("/api/concepts/", {}, function (data) {
            window.store.dispatch(receiveModules(data));
            resolve();
        });
    });
}

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Project.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.requestProject = requestProject;
exports.receiveProject = receiveProject;
exports.receiveMetadata = receiveMetadata;
exports.updateMetadata = updateMetadata;
exports.requestNextModules = requestNextModules;
exports.receiveNextModules = receiveNextModules;
exports.fetchProject = fetchProject;
exports.fetchNextModules = fetchNextModules;
var REQUEST_PROJECT = "REQUEST_PROJECT";
exports.REQUEST_PROJECT = REQUEST_PROJECT;

function requestProject(id) {
    return { type: REQUEST_PROJECT, id: id };
}

var RECEIVE_PROJECT = "RECEIVE_PROJECT";
exports.RECEIVE_PROJECT = RECEIVE_PROJECT;

function receiveProject(id, data) {
    return { type: RECEIVE_PROJECT, id: id, data: data };
}

var RECEIVE_METADATA = "RECEIVE_METADATA";
exports.RECEIVE_METADATA = RECEIVE_METADATA;

function receiveMetadata(id, metadata) {
    return { type: RECEIVE_METADATA, id: id, metadata: metadata };
}

var UPDATE_METADATA = "UPDATE_METADATA";
exports.UPDATE_METADATA = UPDATE_METADATA;

function updateMetadata(id, metadata) {
    return { type: UPDATE_METADATA, id: id, metadata: metadata };
}

var REQUEST_NEXT_MODULES = "REQUEST_NEXT_MODULES";
exports.REQUEST_NEXT_MODULES = REQUEST_NEXT_MODULES;

function requestNextModules(project, module) {
    return { type: REQUEST_NEXT_MODULES, project: project, module: module };
}

var RECEIVE_NEXT_MODULES = "RECEIVE_NEXT_MODULES";
exports.RECEIVE_NEXT_MODULES = RECEIVE_NEXT_MODULES;

function receiveNextModules(project, next) {
    return { type: RECEIVE_NEXT_MODULES, project: project, next: next };
}

function fetchProject(project) {

    return new Promise(function (resolve, reject) {
        window.store.dispatch(requestProject(project));

        // TODO, promises and API class?
        $.get("/api/project/" + project, {}, function (data) {
            window.store.dispatch(receiveProject(project, data.project));

            $.get("/api/all_data/" + project, {}, function (data) {
                window.store.dispatch(receiveMetadata(project, data));
                resolve();
            });
        });
    });
}

function fetchNextModules(project, module) {

    return new Promise(function (resolve, reject) {

        window.store.dispatch(requestNextModules(project, module));

        if (module) {
            $.get("/api/next/" + project + "/" + module, {}, function (data) {
                window.store.dispatch(receiveNextModules(project, data));
                resolve();
            });
        } else {
            $.get("/api/next/" + project, {}, function (data) {
                window.store.dispatch(receiveNextModules(project, data));
                resolve();
            });
        }
    });
}

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Topic.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.requestTopics = requestTopics;
exports.receiveTopics = receiveTopics;
exports.fetchTopics = fetchTopics;
var REQUEST_TOPICS = "REQUEST_TOPICS";
exports.REQUEST_TOPICS = REQUEST_TOPICS;

function requestTopics() {
    return { type: REQUEST_TOPICS };
}

var RECEIVE_TOPICS = "RECEIVE_TOPICS";
exports.RECEIVE_TOPICS = RECEIVE_TOPICS;

function receiveTopics(data) {
    return { type: RECEIVE_TOPICS, data: data };
}

function fetchTopics() {

    return new Promise(function (resolve, reject) {

        window.store.dispatch(requestTopics());

        $.get("/api/topics", function (data) {
            window.store.dispatch(receiveTopics(data));
            resolve();
        });
    });
}

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/app.jsx":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _routerJsx = require('./router.jsx');

var _storesModuleStore = require('stores/ModuleStore');

var _storesTopicStore = require('stores/TopicStore');

var _storesProjectStore = require('stores/ProjectStore');

var _redux = require('redux');

var _reduxDevtools = require('redux-devtools');

var _reducersProject = require('reducers/Project');

var _reducersProject2 = _interopRequireDefault(_reducersProject);

var _reducersModule = require('reducers/Module');

var _reducersModule2 = _interopRequireDefault(_reducersModule);

var _reducersTopic = require('reducers/Topic');

var _reducersTopic2 = _interopRequireDefault(_reducersTopic);

var React = require("react");

window.app = { domRoot: document.getElementById('content') };

window.flux = {
    stores: {
        "module": new _storesModuleStore.ModuleStore(),
        "topic": new _storesTopicStore.TopicStore(),
        "project": new _storesProjectStore.ProjectStore()
    }
};

var finalCreateStore = _redux.compose(_reduxDevtools.devTools(), _reduxDevtools.persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)), _redux.createStore);

window.store = finalCreateStore(_redux.combineReducers({
    project: _reducersProject2['default'],
    topic: _reducersTopic2['default'],
    module: _reducersModule2['default']
}));

$.ajaxPrefilter(function (options, originalOptions, xhr) {
    if (!options.crossDomain) {
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    }
});

React.initializeTouchEvents(true);

var router = new _routerJsx.Router();
router.start();

},{"./router.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/router.jsx","react":"react","reducers/Module":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Module.js","reducers/Project":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Project.js","reducers/Topic":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Topic.js","redux":"redux","redux-devtools":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/index.js","stores/ModuleStore":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/ModuleStore.js","stores/ProjectStore":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/ProjectStore.js","stores/TopicStore":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/TopicStore.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx":[function(require,module,exports){
// var ace = require('brace');
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var langs = ["abap", "abc", "actionscript", "ada", "apache_conf", "applescript", "asciidoc", "assembly_x86", "autohotkey", "batchfile", "c9search", "c_cpp", "cirru", "clojure", "cobol", "coffee", "coldfusion", "csharp", "css", "curly", "d", "dart", "diff", "django", "dockerfile", "dot", "eiffel", "ejs", "elixir", "elm", "erlang", "forth", "ftl", "gcode", "gherkin", "gitignore", "glsl", "golang", "groovy", "haml", "handlebars", "haskell", "haxe", "html", "html_ruby", "ini", "io", "jack", "jade", "java", "javascript", "json", "jsoniq", "jsp", "jsx", "julia", "latex", "lean", "less", "liquid", "lisp", "live_script", "livescript", "logiql", "lsl", "lua", "luapage", "lucene", "makefile", "markdown", "mask", "matlab", "mel", "mips_assembler", "mipsassembler", "mushcode", "mysql", "nix", "objectivec", "ocaml", "pascal", "perl", "pgsql", "php", "plain_text", "powershell", "praat", "prolog", "properties", "protobuf", "python", "r", "rdoc", "rhtml", "ruby", "rust", "sass", "scad", "scala", "scheme", "scss", "sh", "sjs", "smarty", "snippets", "soy_template", "space", "sql", "stylus", "svg", "tcl", "tex", "text", "textile", "toml", "twig", "typescript", "vala", "vbscript", "velocity", "verilog", "vhdl", "xml", "xquery", "yaml"];

// require("brace/mode/actionscript"), require("brace/mode/c_cpp"), require("brace/mode/clojure"), require("brace/mode/coffee"), require("brace/mode/csharp"), require("brace/mode/css"), require("brace/mode/handlebars"), require("brace/mode/html"), require("brace/mode/java"), require("brace/mode/javascript"), require("brace/mode/json"), require("brace/mode/latex"), require("brace/mode/lua"), require("brace/mode/markdown"), require("brace/mode/mysql"), require("brace/mode/objectivec"), require("brace/mode/php"), require("brace/mode/plain_text"), require("brace/mode/python"), require("brace/mode/ruby"), require("brace/mode/xml");
// require('brace/theme/terminal');

var AceEditor = (function (_React$Component) {
    _inherits(AceEditor, _React$Component);

    function AceEditor(props) {
        _classCallCheck(this, AceEditor);

        _get(Object.getPrototypeOf(AceEditor.prototype), "constructor", this).call(this, props);

        this.language = this.props.language;
        this.editor = null;
    }

    _createClass(AceEditor, [{
        key: "componentDidMount",
        value: function componentDidMount() {

            ace.config.set('basePath', '//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/');

            $(React.findDOMNode(this)).find('[data-editor]').each((function (key, value) {
                var el = $(value);

                if (el.prev().is(".ace_editor")) {
                    console.log("Already an ace editor");
                    return;
                }

                var mode = el.data('editor');

                var editDiv = $('<div>', {
                    position: 'absolute',
                    width: el.width(),
                    height: Math.max(this.props.height, el[0].scrollHeight),
                    'class': el.attr('class')
                }).insertBefore(el);

                el.css('display', 'none');

                this.editor = ace.edit(editDiv[0]);

                this.editor.getSession().setValue(el.text());
                this.editor.getSession().setMode("ace/mode/" + mode);
                this.editor.getSession().setUseSoftTabs(true);
                this.editor.getSession().setUseWrapMode(true);
                this.editor.getSession().setUseWorker(false);
                this.editor.setTheme("ace/theme/terminal");

                // Keep original form field in sync
                if (this.props.keepTextAreaInSync) {
                    this.editor.getSession().on('change', (function (e) {
                        el.text(this.editor.getSession().getValue());
                        if (this.props.onContentChange) {
                            this.props.onContentChange(this.editor.getSession().getValue());
                        }
                    }).bind(this));
                }
            }).bind(this));
        }
    }, {
        key: "languageChangeHandler",
        value: function languageChangeHandler(e) {
            this.language = e.target.value;
            this.editor.getSession().setMode("ace/mode/" + this.language);

            if (this.props.onLanguageChange) {
                this.props.onLanguageChange(e.target.value);
            }
        }
    }, {
        key: "render",
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
    }]);

    return AceEditor;
})(React.Component);

exports.AceEditor = AceEditor;

AceEditor.defaultProps = {
    language: 'markdown',
    height: 64,
    value: "",
    keepTextAreaInSync: true,
    showLanguageSelection: false
};

},{"react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/CommentButton.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsCommentPanelJsx = require("components/CommentPanel.jsx");

var React = require("react");

var CommentButton = (function (_React$Component) {
    _inherits(CommentButton, _React$Component);

    function CommentButton(props) {
        _classCallCheck(this, CommentButton);

        _get(Object.getPrototypeOf(CommentButton.prototype), "constructor", this).call(this, props);

        this.state = {
            showComments: false
        };
    }

    _createClass(CommentButton, [{
        key: "showComments",
        value: function showComments(e) {
            this.setState({ showComments: true });
        }
    }, {
        key: "hideComments",
        value: function hideComments(e) {
            console.log("It gone");
            this.setState({ showComments: false });
        }
    }, {
        key: "render",
        value: function render() {

            var inner;

            if (this.props.comments.length > 0) {
                inner = [React.createElement(
                    "span",
                    null,
                    this.props.comments.length,
                    " "
                ), React.createElement("i", { className: "fa fa-comment" })];
            } else {
                inner = [React.createElement("i", { className: "fa fa-plus" })];
            }

            var panel;

            if (this.state.showComments) {
                panel = React.createElement(_componentsCommentPanelJsx.CommentPanel, { comments: this.props.comments, onAddComment: this.props.onAddComment, onClose: this.hideComments.bind(this) });
            }

            return React.createElement(
                "div",
                { className: "comment-button" },
                React.createElement(
                    "button",
                    { onClick: this.showComments.bind(this) },
                    inner
                ),
                panel
            );
        }
    }]);

    return CommentButton;
})(React.Component);

exports.CommentButton = CommentButton;

CommentButton.defaultProps = {
    "comments": []
};

},{"components/CommentPanel.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/CommentPanel.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/CommentPanel.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _UtilJsx = require("Util.jsx");

var _Mixin = require("Mixin");

var _mixinsAnimation = require("mixins/Animation");

var React = require("react");
var dynamics = require("dynamics.js");

var CommentPanel = (function (_React$Component) {
    _inherits(CommentPanel, _React$Component);

    function CommentPanel(props) {
        _classCallCheck(this, CommentPanel);

        _get(Object.getPrototypeOf(CommentPanel.prototype), "constructor", this).call(this, props);

        _Mixin.Mixin.apply(this, _mixinsAnimation.Animation);

        this.addAnimationState("open", {
            opacity: 1,
            marginTop: 0
        });

        this.addAnimationState("closed", {
            opacity: 0,
            marginTop: "10px"
        });

        this.addAnimation("spring", {
            type: dynamics.spring,
            frequency: 200,
            friction: 200,
            duration: 500
        });
    }

    _createClass(CommentPanel, [{
        key: "addComment",
        value: function addComment(e) {
            e.preventDefault();
            this.props.onAddComment(React.findDOMNode(this.refs.comment).value);

            React.findDOMNode(this.refs.comment).value = "";
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.animateBetween("closed", "open", "spring");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "comment-panel box" },
                React.createElement(
                    "button",
                    { className: "float-right", onClick: this.animate.bind(this, "closed", "spring", this.props.onClose) },
                    "Close"
                ),
                React.createElement(
                    "h1",
                    null,
                    "Comments"
                ),
                React.createElement(
                    "ul",
                    null,
                    this.props.comments.map(function (comment) {
                        return React.createElement(
                            "li",
                            null,
                            comment.text
                        );
                    })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "form",
                        null,
                        React.createElement("input", { ref: "comment", className: "form-control", type: "text", placeholder: "Comment..." }),
                        React.createElement(
                            "button",
                            { onClick: this.addComment.bind(this) },
                            "Go"
                        )
                    )
                )
            );
        }
    }]);

    return CommentPanel;
})(React.Component);

exports.CommentPanel = CommentPanel;

},{"Mixin":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Mixin.js","Util.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx","dynamics.js":"dynamics.js","mixins/Animation":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/Animation.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/FloatingButton.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var FloatingButton = (function (_React$Component) {
    _inherits(FloatingButton, _React$Component);

    function FloatingButton(props) {
        _classCallCheck(this, FloatingButton);

        _get(Object.getPrototypeOf(FloatingButton.prototype), "constructor", this).call(this, props);
    }

    _createClass(FloatingButton, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var el = React.findDOMNode(this);

            $(el).find('[rel=tooltip]').tooltip();
        }
    }, {
        key: "render",
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
    }]);

    return FloatingButton;
})(React.Component);

exports.FloatingButton = FloatingButton;

},{"react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Layout.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var Row = (function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row(props) {
        _classCallCheck(this, Row);

        _get(Object.getPrototypeOf(Row.prototype), "constructor", this).call(this, props);
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "div",
                { className: "row" },
                this.props.children
            );
        }
    }]);

    return Row;
})(_react2["default"].Component);

exports.Row = Row;

var GridRow = (function (_React$Component2) {
    _inherits(GridRow, _React$Component2);

    function GridRow(props) {
        _classCallCheck(this, GridRow);

        _get(Object.getPrototypeOf(GridRow.prototype), "constructor", this).call(this, props);
    }

    _createClass(GridRow, [{
        key: "render",
        value: function render() {
            var _this = this;

            var i = 0;

            return _react2["default"].createElement(
                "div",
                { className: "row" },
                this.props.children.map(function (col) {
                    return _react2["default"].createElement(
                        Column,
                        { key: i++, sizes: _this.props.sizes },
                        col
                    );
                })
            );
        }
    }]);

    return GridRow;
})(_react2["default"].Component);

exports.GridRow = GridRow;

GridRow.defaultProps = {
    sizes: {
        xs: 1
    }
};

var Column = (function (_React$Component3) {
    _inherits(Column, _React$Component3);

    function Column(props) {
        _classCallCheck(this, Column);

        _get(Object.getPrototypeOf(Column.prototype), "constructor", this).call(this, props);
    }

    _createClass(Column, [{
        key: "render",
        value: function render() {

            var classes = [];

            for (var size in this.props.sizes) {
                classes.push("col-" + size + "-" + this.props.sizes[size]);
            }

            classes = _classnames2["default"](classes);

            return _react2["default"].createElement(
                "div",
                { className: classes },
                this.props.children
            );
        }
    }]);

    return Column;
})(_react2["default"].Component);

exports.Column = Column;

Column.defaultProps = {
    sizes: {
        xs: 1
    }
};

},{"classnames":"classnames","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/LearningGraph.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var d3 = require("d3");

var LearningGraph = (function (_React$Component) {
    _inherits(LearningGraph, _React$Component);

    function LearningGraph(props) {
        _classCallCheck(this, LearningGraph);

        _get(Object.getPrototypeOf(LearningGraph.prototype), "constructor", this).call(this, props);
    }

    _createClass(LearningGraph, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.drawGraph();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {}
    }, {
        key: "defineMarkerStyle",
        value: function defineMarkerStyle(svg) {
            svg.append("svg:defs").selectAll("marker").data(["end"]) // Different link/path types can be defined here
            .enter().append("svg:marker") // This section adds in the arrows
            .attr("id", String).attr("class", "line-end-marker").attr("viewBox", "0 -5 10 10").attr("refX", 15).attr("refY", -1.5).attr("markerWidth", 3).attr("markerHeight", 3).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5");
        }
    }, {
        key: "areNodesNeighbours",
        value: function areNodesNeighbours(graph, a, b) {
            var _this = this;

            if (!this.linkedByIndexCache) {
                this.linkedByIndex = {};

                for (var i = 0; i < graph.nodes.length; i++) {
                    this.linkedByIndex[i + "," + i] = 1;
                };

                graph.links.forEach(function (d) {
                    _this.linkedByIndex[d.source.index + "," + d.target.index] = 1;
                });
            }

            return this.linkedByIndex[a.index + "," + b.index];
        }
    }, {
        key: "showConnectedNodes",
        value: function showConnectedNodes(graph, node, link) {
            var _this2 = this;

            this.showAll(node, link);
            //Reduce the opacity of all but the neighbouring nodes
            var d = d3.select(d3.event.currentTarget).node().__data__;

            node.style("opacity", function (o) {
                return _this2.areNodesNeighbours(graph, d, o) | _this2.areNodesNeighbours(graph, o, d) ? 1 : 0.1;
            });

            link.style("opacity", function (o) {
                return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
            });
        }
    }, {
        key: "showAll",
        value: function showAll(node, link) {
            node.style("opacity", 1);
            link.style("opacity", 1);
        }
    }, {
        key: "onTick",
        value: function onTick(node, link) {
            // Generate Curved Lines
            link.attr("d", function (d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
                return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
            });

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        }
    }, {
        key: "createNode",
        value: function createNode(svg, force, graph, color) {
            var node = svg.selectAll(".node").data(graph.nodes).enter().append("g").attr("class", "node").call(force.drag);

            node.append("circle").attr("r", 5).attr("x", 0).attr("y", 0).style("fill", function (d) {
                return color(d.group);
            });

            node.append("text").attr("class", "title").text(function (d) {
                return d.name;
            });

            return node;
        }
    }, {
        key: "createLink",
        value: function createLink(svg, graph) {
            var link = svg.selectAll(".link").data(graph.links).enter().append("svg:path").attr("class", "link").style("marker-end", "url(#end)") // Modified line
            .style("stroke-width", function (d) {
                return Math.pow(d.value, 2) / 200;
            });

            return link;
        }
    }, {
        key: "drawGraph",
        value: function drawGraph() {
            var _this3 = this;

            var width = 960,
                height = 500;

            var force = d3.layout.force().charge(-120).linkDistance(64).size([width, height]);

            var svg = d3.select(React.findDOMNode(this)).append("svg").attr("width", width).attr("height", height);

            this.defineMarkerStyle(svg);

            d3.json("/api/full_graph/" + this.props.project, function (error, graph) {
                if (error) throw error;

                force.nodes(graph.nodes).links(graph.links).start();

                var node = _this3.createNode(svg, force, graph, d3.scale.category20());
                var link = _this3.createLink(svg, graph);

                node.on('click', _this3.showConnectedNodes.bind(_this3, graph, node, link)) //Added code
                .on('dblclick', _this3.showAll.bind(_this3, node, link)); //Added code

                force.on("tick", _this3.onTick.bind(_this3, node, link));
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "graph" });
        }
    }]);

    return LearningGraph;
})(React.Component);

exports.LearningGraph = LearningGraph;

},{"d3":"d3","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Module.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsTopicPillJsx = require('components/TopicPill.jsx');

var React = require("react");

var Module = (function (_React$Component) {
    _inherits(Module, _React$Component);

    function Module(props) {
        _classCallCheck(this, Module);

        _get(Object.getPrototypeOf(Module.prototype), "constructor", this).call(this, props);

        this.state = {};
    }

    _createClass(Module, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                { className: "module" },
                React.createElement(
                    "div",
                    { className: "box inner" },
                    React.createElement("div", { className: "bar" }),
                    React.createElement(
                        "h3",
                        null,
                        React.createElement(
                            "a",
                            { onClick: this.props.onClick, href: "/concepts/project/" + this.props.project + "/" + this.props.module["_id"]["$oid"] },
                            this.props.module.title
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "info-panel" },
                    React.createElement(
                        "div",
                        { className: "body" },
                        React.createElement(
                            "h1",
                            null,
                            this.props.module.title
                        ),
                        "Suggested because...?"
                    ),
                    React.createElement(
                        "div",
                        { className: "topics inverted" },
                        this.props.topics.map(function (topic) {
                            return React.createElement(_componentsTopicPillJsx.TopicPill, { topic: topic });
                        })
                    )
                )
            );
        }
    }]);

    return Module;
})(React.Component);

exports.Module = Module;

},{"components/TopicPill.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/TopicPill.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Sortable.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dragula = require('dragula');
var React = require("react");

var Sortable = (function (_React$Component) {
    _inherits(Sortable, _React$Component);

    function Sortable() {
        _classCallCheck(this, Sortable);

        _get(Object.getPrototypeOf(Sortable.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Sortable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var el = React.findDOMNode(this);
            var $el = $(el);

            dragula(el, {
                moves: function moves(el, container, handle) {
                    return $(handle).hasClass("handle");
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "sortable" },
                this.props.children
            );
        }
    }]);

    return Sortable;
})(React.Component);

exports.Sortable = Sortable;

},{"dragula":"dragula","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/TopicPill.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var React = require("react");

var TopicPill = (function (_React$Component) {
    _inherits(TopicPill, _React$Component);

    function TopicPill(props) {
        _classCallCheck(this, TopicPill);

        _get(Object.getPrototypeOf(TopicPill.prototype), "constructor", this).call(this, props);
        this.state = {};
    }

    _createClass(TopicPill, [{
        key: "clicked",
        value: function clicked() {
            if (this.props.selectable) {
                this.setState({ selected: true });

                this.props.onSelect(this.props.topic);
            }
        }
    }, {
        key: "render",
        value: function render() {

            var c = {
                "topic-pill": true,
                "selectable": this.props.selectable,
                "selected": this.state.selected
            };
            c = _classnames2["default"](c);

            return React.createElement(
                "span",
                { className: c, onClick: this.clicked.bind(this) },
                this.props.topic.name
            );
        }
    }]);

    return TopicPill;
})(React.Component);

exports.TopicPill = TopicPill;

},{"classnames":"classnames","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EventsJsx = require('Events.jsx');

var _componentsEditingContentTypeJsx = require('components/editing/ContentType.jsx');

var _componentsAceEditorJsx = require('components/AceEditor.jsx');

var React = require("react");

var CodeContent = (function (_React$Component) {
    _inherits(CodeContent, _React$Component);

    function CodeContent(props) {
        _classCallCheck(this, CodeContent);

        _get(Object.getPrototypeOf(CodeContent.prototype), 'constructor', this).call(this, props);

        this.state = {
            content: this.props.value,
            language: this.props.language,
            id: this.props.id
        };
    }

    _createClass(CodeContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _EventsJsx.Events.subscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
        }
    }, {
        key: 'componentDidUnmount',
        value: function componentDidUnmount() {
            _EventsJsx.Events.unsubscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
        }
    }, {
        key: 'saveToServer',
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
    }, {
        key: 'saveCallback',
        value: function saveCallback(data) {
            if (data.success) {
                this.setState({ id: data.id });
            }

            _EventsJsx.Events.emitRoot(_EventsJsx.ContentTypeSubmissionSuccessEvent, this);
        }
    }, {
        key: 'languageChange',
        value: function languageChange(lang) {
            this.setState({ language: lang });
        }
    }, {
        key: 'contentChange',
        value: function contentChange(content) {
            this.contentBuffer = content;
        }
    }, {
        key: 'edit',
        value: function edit(e) {
            if (this.props.editable()) {
                this.contentBuffer = this.state.content;
                this.setState({ editing: true });
            }
        }
    }, {
        key: 'save',
        value: function save(e) {
            this.setState({ content: this.contentBuffer });
            this.setState({ editing: false });
        }
    }, {
        key: 'cancel',
        value: function cancel(e) {
            this.setState({ editing: false });
        }
    }, {
        key: 'render',
        value: function render() {

            var edit = React.createElement(
                _componentsEditingContentTypeJsx.ContentType,
                { title: 'Code Content', editable: this.props.editable, id: this.state.id },
                React.createElement(_componentsAceEditorJsx.AceEditor, { showLanguageSelection: true, onLanguageChange: this.languageChange.bind(this), onContentChange: this.contentChange.bind(this), language: this.state.language, value: this.state.content }),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.save.bind(this) },
                    'Save'
                ),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.cancel.bind(this) },
                    'Cancel'
                )
            );

            var view = React.createElement(
                'pre',
                { 'data-id': this.state.id },
                React.createElement(
                    'code',
                    { className: this.state.language },
                    this.state.content
                )
            );

            var content = this.state.editing ? edit : view;

            return _componentsEditingContentTypeJsx.ContentType.wrapContentType(this, content, this.edit.bind(this));
        }
    }]);

    return CodeContent;
})(React.Component);

exports.CodeContent = CodeContent;

CodeContent.defaultProps = {
    language: 'javascript',
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ContentTypeToolbarJsx = require("./ContentTypeToolbar.jsx");

var _componentsFloatingButtonJsx = require("components/FloatingButton.jsx");

var _componentsCommentButtonJsx = require("components/CommentButton.jsx");

var React = require("react");

var ContentType = (function (_React$Component) {
    _inherits(ContentType, _React$Component);

    function ContentType() {
        _classCallCheck(this, ContentType);

        _get(Object.getPrototypeOf(ContentType.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ContentType, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "content-type " + this.props.editable() ? "editable" : "" },
                React.createElement(
                    _ContentTypeToolbarJsx.ContentTypeToolbar,
                    { icon: this.props.titleIcon },
                    this.props.title
                ),
                this.props.children
            );
        }
    }]);

    return ContentType;
})(React.Component);

exports.ContentType = ContentType;

ContentType.addComment = function (comment) {
    window.flux.stores.module.actions.addComment({ module: this.props.module, id: this.props.id, text: comment });
};

ContentType.wrapContentType = function (ctx, content, editHandler) {

    var inner = [React.createElement(
        "div",
        { className: "edit-content-type-tools float-right" },
        React.createElement(
            _componentsFloatingButtonJsx.FloatingButton,
            { icon: "arrows", className: "handle" },
            "Move"
        ),
        React.createElement(
            _componentsFloatingButtonJsx.FloatingButton,
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
        React.createElement(_componentsCommentButtonJsx.CommentButton, { comments: ctx.props.comments, onAddComment: ContentType.addComment.bind(ctx) }),
        inner
    );
};

},{"./ContentTypeToolbar.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentTypeToolbar.jsx","components/CommentButton.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/CommentButton.jsx","components/FloatingButton.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/FloatingButton.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentTypeToolbar.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var ContentTypeToolbar = (function (_React$Component) {
    _inherits(ContentTypeToolbar, _React$Component);

    function ContentTypeToolbar() {
        _classCallCheck(this, ContentTypeToolbar);

        _get(Object.getPrototypeOf(ContentTypeToolbar.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ContentTypeToolbar, [{
        key: "render",
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
    }]);

    return ContentTypeToolbar;
})(React.Component);

exports.ContentTypeToolbar = ContentTypeToolbar;

},{"react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ImageContent.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EventsJsx = require('Events.jsx');

var _componentsEditingContentTypeJsx = require('components/editing/ContentType.jsx');

var _componentsAceEditorJsx = require('components/AceEditor.jsx');

var marked = require('marked');

var React = require("react");

var ImageContent = (function (_React$Component) {
    _inherits(ImageContent, _React$Component);

    function ImageContent(props) {
        _classCallCheck(this, ImageContent);

        _get(Object.getPrototypeOf(ImageContent.prototype), 'constructor', this).call(this, props);

        this.state = {
            content: this.props.value,
            id: this.props.id
        };
    }

    _createClass(ImageContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _EventsJsx.Events.subscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
        }
    }, {
        key: 'componentDidUnmount',
        value: function componentDidUnmount() {
            _EventsJsx.Events.unsubscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
        }
    }, {
        key: 'saveToServer',
        value: function saveToServer(e) {
            var data = {
                image_content: {
                    src: this.state.content,
                    id: this.state.id
                }
            };
            $.post("/content/image/add", data, this.saveCallback.bind(this));
        }
    }, {
        key: 'saveCallback',
        value: function saveCallback(data) {
            if (data.success) {
                this.setState({ id: data.id });
            }

            _EventsJsx.Events.emitRoot(_EventsJsx.ContentTypeSubmissionSuccessEvent, this);
        }
    }, {
        key: 'contentChange',
        value: function contentChange(content) {
            this.contentBuffer = content;
        }
    }, {
        key: 'edit',
        value: function edit(e) {
            if (this.props.editable()) {
                this.contentBuffer = this.state.content;
                this.setState({ editing: true });
            }
        }
    }, {
        key: 'save',
        value: function save(e) {
            this.setState({ content: this.contentBuffer });
            this.setState({ editing: false });
        }
    }, {
        key: 'cancel',
        value: function cancel(e) {
            this.setState({ editing: false });
        }
    }, {
        key: 'render',
        value: function render() {

            var edit = React.createElement(
                _componentsEditingContentTypeJsx.ContentType,
                { title: 'Image Content', editable: this.props.editable, id: this.state.id },
                React.createElement(_componentsAceEditorJsx.AceEditor, { onContentChange: this.contentChange.bind(this), language: 'markdown', value: this.state.content }),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.save.bind(this) },
                    'Save'
                ),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.cancel.bind(this) },
                    'Cancel'
                )
            );

            var view = React.createElement(
                'div',
                { 'data-id': this.state.id },
                React.createElement('img', { src: this.state.content })
            );

            var content = this.state.editing ? edit : view;

            return _componentsEditingContentTypeJsx.ContentType.wrapContentType(this, content, this.edit.bind(this));
        }
    }]);

    return ImageContent;
})(React.Component);

exports.ImageContent = ImageContent;

ImageContent.defaultProps = {
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","marked":"marked","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EventsJsx = require('Events.jsx');

var _componentsEditingContentTypeJsx = require('components/editing/ContentType.jsx');

var _componentsAceEditorJsx = require('components/AceEditor.jsx');

var marked = require('marked');
var handlebars = require('handlebars');

var React = require("react");

var MarkdownContent = (function (_React$Component) {
    _inherits(MarkdownContent, _React$Component);

    function MarkdownContent(props) {
        _classCallCheck(this, MarkdownContent);

        _get(Object.getPrototypeOf(MarkdownContent.prototype), 'constructor', this).call(this, props);

        this.state = {
            content: this.props.value,
            id: this.props.id
        };
    }

    _createClass(MarkdownContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _EventsJsx.Events.subscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
            this.renderMath();
        }
    }, {
        key: 'componentDidUnmount',
        value: function componentDidUnmount() {
            _EventsJsx.Events.unsubscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderMath();
        }
    }, {
        key: 'saveToServer',
        value: function saveToServer(e) {
            var data = {
                markdown_content: {
                    body: this.state.content,
                    id: this.state.id
                }
            };
            $.post("/content/markdown/add", data, this.saveCallback.bind(this));
        }
    }, {
        key: 'saveCallback',
        value: function saveCallback(data) {
            if (data.success) {
                this.setState({ id: data.id });
            }

            _EventsJsx.Events.emitRoot(_EventsJsx.ContentTypeSubmissionSuccessEvent, this);
        }
    }, {
        key: 'contentChange',
        value: function contentChange(content) {
            this.contentBuffer = content;
        }
    }, {
        key: 'renderMath',
        value: function renderMath() {
            if (!this.state.editing) {
                var $el = $(React.findDOMNode(this));

                var renderTarget = $el.find(".markdown-content")[0];
                var html = marked(this.state.content);
                var template = handlebars.compile(html);

                renderTarget.innerHTML = template(this.props.metadata());
            }
        }
    }, {
        key: 'edit',
        value: function edit(e) {
            if (this.props.editable()) {
                this.contentBuffer = this.state.content;
                this.setState({ editing: true });
            }
        }
    }, {
        key: 'save',
        value: function save(e) {
            this.setState({ content: this.contentBuffer });
            this.setState({ editing: false });
        }
    }, {
        key: 'cancel',
        value: function cancel(e) {
            this.setState({ editing: false });
        }
    }, {
        key: 'render',
        value: function render() {

            var edit = React.createElement(
                _componentsEditingContentTypeJsx.ContentType,
                { title: 'Markdown Content', editable: this.props.editable, id: this.state.id },
                React.createElement(_componentsAceEditorJsx.AceEditor, { onContentChange: this.contentChange.bind(this), language: 'markdown', value: this.state.content }),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.save.bind(this) },
                    'Save'
                ),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.cancel.bind(this) },
                    'Cancel'
                )
            );

            var view = React.createElement(
                'div',
                { 'data-id': this.state.id },
                React.createElement('div', { className: 'markdown-content' })
            );

            var content = this.state.editing ? edit : view;

            return _componentsEditingContentTypeJsx.ContentType.wrapContentType(this, content, this.edit.bind(this));
        }
    }]);

    return MarkdownContent;
})(React.Component);

exports.MarkdownContent = MarkdownContent;

MarkdownContent.defaultProps = {
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","handlebars":"handlebars","marked":"marked","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EventsJsx = require('Events.jsx');

var _componentsEditingContentTypeJsx = require('components/editing/ContentType.jsx');

var _componentsAceEditorJsx = require('components/AceEditor.jsx');

var katex = require('katex');

var React = require("react");

var MathContent = (function (_React$Component) {
    _inherits(MathContent, _React$Component);

    function MathContent(props) {
        _classCallCheck(this, MathContent);

        _get(Object.getPrototypeOf(MathContent.prototype), 'constructor', this).call(this, props);

        this.state = {
            content: this.props.value,
            editing: this.props.editContent,
            id: this.props.id
        };
    }

    _createClass(MathContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _EventsJsx.Events.subscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
            this.renderMath();
        }
    }, {
        key: 'componentDidUnmount',
        value: function componentDidUnmount() {
            _EventsJsx.Events.unsubscribeRoot(_EventsJsx.SaveModuleFormEvent, this.saveToServer.bind(this));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderMath();
        }
    }, {
        key: 'saveToServer',
        value: function saveToServer(e) {
            var data = {
                math_content: {
                    body: this.state.content,
                    id: this.state.id
                }
            };
            $.post("/content/math/add", data, this.saveCallback.bind(this));
        }
    }, {
        key: 'saveCallback',
        value: function saveCallback(data) {
            if (data.success) {
                this.setState({ id: data.id });
            }

            _EventsJsx.Events.emitRoot(_EventsJsx.ContentTypeSubmissionSuccessEvent, this);
        }
    }, {
        key: 'contentChange',
        value: function contentChange(content) {
            this.contentBuffer = content;
        }
    }, {
        key: 'renderMath',
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
    }, {
        key: 'edit',
        value: function edit(e) {
            if (this.props.editable()) {
                this.contentBuffer = this.state.content;
                this.setState({ editing: true });
            }
        }
    }, {
        key: 'save',
        value: function save(e) {
            this.setState({ content: this.contentBuffer });
            this.setState({ editing: false });
        }
    }, {
        key: 'cancel',
        value: function cancel(e) {
            this.setState({ editing: false });
        }
    }, {
        key: 'render',
        value: function render() {

            var edit = React.createElement(
                _componentsEditingContentTypeJsx.ContentType,
                { title: 'Math Content', editable: this.props.editable, id: this.state.id },
                React.createElement(_componentsAceEditorJsx.AceEditor, { onContentChange: this.contentChange.bind(this), language: 'latex', value: this.state.content }),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.save.bind(this) },
                    'Save'
                ),
                React.createElement(
                    'button',
                    { className: 'button create-button', onClick: this.cancel.bind(this) },
                    'Cancel'
                )
            );

            var view = React.createElement(
                'div',
                { 'data-id': this.state.id },
                React.createElement('div', { className: 'math-content' })
            );

            var content = this.state.editing ? edit : view;

            return _componentsEditingContentTypeJsx.ContentType.wrapContentType(this, content, this.edit.bind(this));
        }
    }]);

    return MathContent;
})(React.Component);

exports.MathContent = MathContent;

MathContent.defaultProps = {
    value: "",
    id: null
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/editing/ContentType.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ContentType.jsx","katex":"katex","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/input/Input.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Input = (function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        _get(Object.getPrototypeOf(Input.prototype), "constructor", this).call(this, props);
    }

    _createClass(Input, [{
        key: "val",
        value: function val() {
            return _react2["default"].findDOMNode(this.refs.input).value;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "div",
                { className: "Input" },
                _react2["default"].createElement(
                    "label",
                    { htmlFor: this.props.name },
                    this.props.label
                ),
                this.props.multiLine ? _react2["default"].createElement("textarea", {
                    ref: "input",
                    className: "form-control",
                    name: this.props.name,
                    value: this.props.value,
                    defaultValue: this.props.defaultValue,
                    onChange: this.props.onChange
                }) : _react2["default"].createElement("input", {
                    ref: "input",
                    className: "form-control",
                    name: this.props.name,
                    type: this.props.type,
                    value: this.props.value,
                    defaultValue: this.props.defaultValue,
                    onChange: this.props.onChange
                }),
                _react2["default"].createElement(
                    "div",
                    { className: "caption" },
                    this.props.children
                )
            );
        }
    }]);

    return Input;
})(_react2["default"].Component);

exports.Input = Input;

Input.defaultProps = {
    type: "text"
};

var Button = (function (_React$Component2) {
    _inherits(Button, _React$Component2);

    function Button(props) {
        _classCallCheck(this, Button);

        _get(Object.getPrototypeOf(Button.prototype), "constructor", this).call(this, props);
    }

    _createClass(Button, [{
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "button",
                { type: this.props.type, className: "Button button create-button", onClick: this.props.onClick },
                this.props.text
            );
        }
    }]);

    return Button;
})(_react2["default"].Component);

exports.Button = Button;

Button.defaultProps = {
    type: "button"
};

},{"react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/Animation.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _UtilJsx = require("Util.jsx");

var dynamics = require("dynamics.js");

var React = require("react");

var Animation = {};

exports.Animation = Animation;
Animation.init = function (opts) {
    opts = opts || {};

    this._animStates = opts.animStates || {};
    this._animationDefinitions = opts.animationDefinitions || {};
};

Animation.addAnimation = function (name, anim) {
    this._animationDefinitions[name] = anim;
};

Animation.addAnimationState = function (name, state) {
    this._animStates[name] = state;
};

Animation.animateNode = function (el, state, animation, callback) {
    var finalAnim = _UtilJsx.Util.clone(this._animationDefinitions[animation]);
    if (callback) {
        finalAnim.complete = callback;
    }

    dynamics.animate(el, this._animStates[state], finalAnim);
};

Animation.setNodeAnimState = function (el, state) {
    dynamics.css(React.findDOMNode(this), this._animStates[state]);
};

Animation.animateNodeBetween = function (el, from, to, animation, callback) {
    this.setNodeAnimState(el, from);
    this.animateNode(el, to, animation, callback);
};

Animation.setAnimState = function (state) {
    this.setNodeAnimState(React.findDOMNode(this), state);
};

Animation.animateBetween = function (from, to, animation, callback) {
    this.animateNodeBetween(React.findDOMNode(this), from, to, animation, callback);
};

Animation.animate = function (state, animation, callback) {
    this.animateNode(React.findDOMNode(this), state, animation, callback);
};

Animation.setChildAnimState = function (selector, state) {
    this.setNodeAnimState($(React.findDOMNode(this)).find(selector)[0], state);
};

Animation.animateChildBetween = function (selector, from, to, animation, callback) {
    this.animateNodeBetween($(React.findDOMNode(this)).find(selector)[0], from, to, animation, callback);
};

Animation.animateChild = function (selector, state, animation, callback) {
    this.animateNode($(React.findDOMNode(this)).find(selector)[0], state, animation, callback);
};

},{"Util.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx","dynamics.js":"dynamics.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/Print.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
var Print = {};

exports.Print = Print;
Print.print = function () {
    console.log(this);
};

Print.componentDidMount = function () {
    console.log("Hello from print mixin");
};

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/Store.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
var Store = {};

exports.Store = Store;
var fluxLocation;
var stores = [];

Store.init = function (opts) {

    fluxLocation = opts.fluxLocation || window.flux || {};

    if (opts.store || opts.stores) {
        this.stores = this.stores || {};

        // If a list was given
        for (var i = 0; i < opts.stores.length; i++) {
            if (fluxLocation.stores[opts.stores[i]] !== undefined) {
                this.stores[opts.stores[i]] = fluxLocation.stores[opts.stores[i]];
                stores.push(opts.stores[i]);
            } else {
                warnForNonExistantStore(this, opts.stores[i]);
            }
        }

        // Or a single store
        if (opts.store) {
            this.stores[opts.store] = fluxLocation.stores[opts.store];
            stores.push(opts.store);

            if (fluxLocation.stores[opts.store] === undefined) {
                warnForNonExistantStore(this, opts.store);
            }
        }
    }
};

Store.componentDidMount = function () {
    var _this = this;

    console.log("Hello from store mixin");

    if (this.onChange) {
        stores.forEach(function (store) {
            fluxLocation.stores[store].addListener("change", _this.onChange.bind(_this));
        });
    }
};

Store.componentDidUnmount = function () {
    var _this2 = this;

    console.log("Goodbye from store mixin", this);

    if (this.onChange) {
        stores.forEach(function (store) {
            fluxLocation.stores[store].removeListener("change", _this2.onChange.bind(_this2));
        });
    }
};

// Default impl should update state using new data
//Store.onChange

function warnForNonExistantStore(ctx, name) {
    console.warn("The store specified does not exist.", { storeName: name, context: ctx });
}

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/connect.js":[function(require,module,exports){
'use strict';

var _reactRedux = require('react-redux');

module.exports = function connector(stateMapper, dispatchMapper) {
    return function decorator(target) {

        return _reactRedux.connect(stateMapper, dispatchMapper)(target);
    };
};

},{"react-redux":"react-redux"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/data.js":[function(require,module,exports){
"use strict";

module.exports = function data(actions, callback) {
    return function decorator(target) {

        target.prototype.loadData = function (props) {
            var promises = actions(props);
            return Promise.all(promises);
        };

        return target;
    };
};

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/BasePage.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reduxDevtoolsLibReact = require('redux-devtools/lib/react');

var _reactRedux = require('react-redux');

var BasePage = (function (_React$Component) {
    _inherits(BasePage, _React$Component);

    function BasePage(props) {
        _classCallCheck(this, BasePage);

        _get(Object.getPrototypeOf(BasePage.prototype), 'constructor', this).call(this, props);
    }

    _createClass(BasePage, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    _reactRedux.Provider,
                    { store: window.store },
                    this.props.children
                )
            );
        }
    }]);

    return BasePage;
})(_react2['default'].Component);

exports.BasePage = BasePage;
/*<DebugPanel top right bottom>
   <DevTools store={window.store} monitor={LogMonitor} />
</DebugPanel>*/

},{"react":"react","react-redux":"react-redux","redux-devtools/lib/react":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePage.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _UtilJsx = require('Util.jsx');

var _EventsJsx = require('Events.jsx');

var _componentsEditingCodeContentJsx = require('components/editing/CodeContent.jsx');

var _componentsEditingMathContentJsx = require('components/editing/MathContent.jsx');

var _componentsEditingMarkdownContentJsx = require('components/editing/MarkdownContent.jsx');

var _componentsEditingImageContentJsx = require('components/editing/ImageContent.jsx');

var _componentsSortableJsx = require('components/Sortable.jsx');

var _componentsFloatingButtonJsx = require('components/FloatingButton.jsx');

var _componentsAceEditorJsx = require('components/AceEditor.jsx');

var _Mixin = require('Mixin');

var _mixinsPrint = require('mixins/Print');

var _mixinsStore = require('mixins/Store');

var _SlugJs = require('Slug.js');

var Select = require('react-select');
var React = require("react");

var page = require("page");

var EditModulePage = (function (_React$Component) {
    _inherits(EditModulePage, _React$Component);

    function EditModulePage(props) {
        _classCallCheck(this, EditModulePage);

        _get(Object.getPrototypeOf(EditModulePage.prototype), 'constructor', this).call(this, props);

        this.state = {
            modules: [{}],
            currentModule: null,
            contentBlocks: [],
            metadata: {},
            topics: [],
            title: this.props.title,
            slug: this.props.slug,
            url: this.props.url
        };

        _Mixin.Mixin.apply(this, _mixinsStore.Store, { stores: ["module", "topic"] });

        this.submitCount = 0;
    }

    _createClass(EditModulePage, [{
        key: 'onChange',
        value: function onChange(data) {
            if (data.eventType == "updateModule") {
                this.stores.module.save(this.props.module, this.moduleSaveRepsonse.bind(this));
            }
        }
    }, {
        key: 'titleUpdate',
        value: function titleUpdate(e) {
            this.setState({ title: e.target.value });
            this.setState({ slug: _SlugJs.Slug.convertToSlug(e.target.value) });
        }
    }, {
        key: 'slugUpdate',
        value: function slugUpdate(e) {
            this.setState({ slug: e.target.value });
        }
    }, {
        key: 'urlUpdate',
        value: function urlUpdate(e) {
            this.setState({ url: e.target.value });
        }
    }, {
        key: 'onTopicChange',
        value: function onTopicChange(latest, list) {
            console.log(this);
            this.setState({ topics: list });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            console.log("Hello from component");

            _EventsJsx.Events.subscribeRoot(_EventsJsx.ContentTypeSubmissionSuccessEvent, this.contentTypeDidSave.bind(this));

            if (this.props.module) {
                this.stores.module.get(this.props.module, this.fetchedData.bind(this));
            }

            this.stores.topic.getAll(this.receivedTopics.bind(this));
        }
    }, {
        key: 'receivedTopics',
        value: function receivedTopics(data) {

            var result = [];

            for (var topic in data) {
                result.push({ value: topic, label: data[topic].name });
            }

            this.setState({ allTopics: result });
        }
    }, {
        key: 'fetchedData',
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
                url: data.learning_module.url,
                contentBlocks: blocks,
                topics: data.learning_module.topic_ids.map(function (id) {
                    return id.$oid;
                })
            });
        }
    }, {
        key: 'componentDidUnmount',
        value: function componentDidUnmount() {
            _EventsJsx.Events.unsubscribeRoot(_EventsJsx.ContentTypeSubmissionSuccessEvent, this.contentTypeDidSave.bind(this));
        }
    }, {
        key: 'contentTypeDidSave',
        value: function contentTypeDidSave() {
            this.submitCount++;

            if (this.submitCount == this.state.contentBlocks.length) {
                console.log("All saved correctly", this.state.contentBlocks.length);
                this.allContentTypesDidSave();
            }
        }
    }, {
        key: 'allContentTypesDidSave',
        value: function allContentTypesDidSave() {
            var content_type_ids = [];

            $(React.findDOMNode(this)).find("[data-id]").each(function () {
                content_type_ids.push($(this).attr("data-id"));
            });

            var topic_ids = this.state.topics.map(function (topic) {
                return topic.value;
            });

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
                "id": this.props.module,
                "topics": topic_ids
            };

            this.stores.module.actions.updateModule(data);
        }
    }, {
        key: 'moduleSaveRepsonse',
        value: function moduleSaveRepsonse(data) {
            console.log("module response", data);

            if (data.success) {
                page('/concepts/edit/' + data.learning_module["_id"]["$oid"]);
            }
        }
    }, {
        key: 'handleEditConcept',
        value: function handleEditConcept(e) {}
    }, {
        key: 'newSection',
        value: function newSection(provider) {
            var blocks = this.state.contentBlocks;
            blocks.push(provider());

            this.setState({ contentBlocks: blocks });
        }
    }, {
        key: 'newMarkdownSection',
        value: function newMarkdownSection(ctx) {
            if (ctx === undefined) {
                ctx = {};
            }

            return React.createElement(_componentsEditingMarkdownContentJsx.MarkdownContent, { id: ctx.id, value: ctx.body, editable: this.isEditable, metadata: this.getMetadata.bind(this) });
        }
    }, {
        key: 'newCodeSection',
        value: function newCodeSection(ctx) {
            if (ctx === undefined) {
                ctx = {};
            }

            return React.createElement(_componentsEditingCodeContentJsx.CodeContent, { id: ctx.id, value: ctx.body, language: ctx.language, editable: this.isEditable });
        }
    }, {
        key: 'newMathSection',
        value: function newMathSection(ctx) {
            if (ctx === undefined) {
                ctx = {};
            }

            return React.createElement(_componentsEditingMathContentJsx.MathContent, { id: ctx.id, value: ctx.body, editable: this.isEditable });
        }
    }, {
        key: 'newImageSection',
        value: function newImageSection(ctx) {
            if (ctx === undefined) {
                ctx = {};
            }

            return React.createElement(_componentsEditingImageContentJsx.ImageContent, { id: ctx.id, value: '', editable: this.isEditable });
        }
    }, {
        key: 'save',
        value: function save(e) {
            if (this.state.contentBlocks.length > 0) {
                _EventsJsx.Events.emitRoot(_EventsJsx.SaveModuleFormEvent, this);
            } else {
                this.allContentTypesDidSave();
            }

            this.submitCount = 0;
        }
    }, {
        key: 'isEditable',
        value: function isEditable() {
            return true;
        }
    }, {
        key: 'getMetadata',
        value: function getMetadata() {
            return this.state.metadata;
        }
    }, {
        key: 'metadataChange',
        value: function metadataChange(content) {
            try {
                var metadata = JSON.parse(content);

                this.setState({ metadata: metadata });
                console.log("Updated metadata", content, metadata);
            } catch (err) {}
        }
    }, {
        key: 'render',
        value: function render() {

            var editModuleSelect = React.createElement(
                'div',
                { className: 'box' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-10' },
                        React.createElement(
                            'select',
                            { id: 'learning_module', name: 'learning_module', className: 'select2', defaultValue: this.state.currentModule },
                            this.state.modules.map(function (module) {
                                return React.createElement(
                                    'option',
                                    { value: module.id },
                                    module.title
                                );
                            })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-2' },
                        React.createElement(
                            'button',
                            { className: 'create-button button', onClick: this.handleEditConcept.bind(this) },
                            'Edit Concept'
                        )
                    )
                )
            );

            return React.createElement(
                'div',
                { className: 'main-content' },
                React.createElement(
                    'div',
                    { className: 'create-step-form' },
                    React.createElement(
                        'div',
                        { className: 'box' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-12' },
                                React.createElement(
                                    'h2',
                                    null,
                                    'Edit Concept'
                                ),
                                React.createElement(
                                    'form',
                                    { action: '/concepts/make/', acceptCharset: 'UTF-8', id: 'addStepForm', method: 'post' },
                                    _UtilJsx.getCSRFFormField(),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-sm-6' },
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'label',
                                                    { htmlFor: 'learning_module_title' },
                                                    'Concept Title'
                                                ),
                                                React.createElement('input', { onChange: this.titleUpdate.bind(this), value: this.state.title, type: 'text', name: 'learning_module[title]', id: 'learning_module_title', className: 'form-control' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-sm-6' },
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'label',
                                                    { htmlFor: 'learning_module_slug' },
                                                    'Concept Slug (For URL)'
                                                ),
                                                React.createElement('input', { onChange: this.slugUpdate.bind(this), value: this.state.slug, type: 'text', name: 'learning_module[slug]', id: 'learning_module_slug', className: 'form-control' })
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-sm-12' },
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'label',
                                                    { htmlFor: 'learning_module_url' },
                                                    'External URL (Optional)'
                                                ),
                                                React.createElement('input', { onChange: this.urlUpdate.bind(this), value: this.state.url, type: 'text', name: 'learning_module[url]', id: 'learning_module_url', className: 'form-control' })
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-sm-12' },
                                        React.createElement(Select, {
                                            name: 'form-field-name',
                                            options: this.state.allTopics,
                                            value: this.state.topics,
                                            onChange: this.onTopicChange.bind(this),
                                            multi: true
                                        })
                                    ),
                                    React.createElement('div', { className: 'content-ids' })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'box' },
                        React.createElement(_componentsAceEditorJsx.AceEditor, { onContentChange: this.metadataChange.bind(this), language: 'javascript', value: "{}" })
                    ),
                    React.createElement(
                        _componentsSortableJsx.Sortable,
                        null,
                        this.state.contentBlocks.map(function (block) {
                            return block;
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'floating-tools' },
                        React.createElement(
                            _componentsFloatingButtonJsx.FloatingButton,
                            { icon: 'file-text', onClick: this.newSection.bind(this, this.newMarkdownSection.bind(this)) },
                            'Add New Markdown Content'
                        ),
                        React.createElement(
                            _componentsFloatingButtonJsx.FloatingButton,
                            { icon: 'code', onClick: this.newSection.bind(this, this.newCodeSection.bind(this)) },
                            'Add Code Snippet'
                        ),
                        React.createElement(
                            _componentsFloatingButtonJsx.FloatingButton,
                            { icon: 'plus', onClick: this.newSection.bind(this, this.newMathSection.bind(this)) },
                            'Add Math Content'
                        ),
                        React.createElement(
                            _componentsFloatingButtonJsx.FloatingButton,
                            { icon: 'picture-o', onClick: this.newSection.bind(this, this.newImageSection.bind(this)) },
                            'Add Image'
                        ),
                        React.createElement(
                            _componentsFloatingButtonJsx.FloatingButton,
                            { icon: 'save', size: 'big', onClick: this.save.bind(this) },
                            'Save Concept'
                        )
                    )
                )
            );
        }
    }]);

    return EditModulePage;
})(React.Component);

exports.EditModulePage = EditModulePage;

EditModulePage.defaultProps = {
    title: "",
    slug: ""
};

},{"Events.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Events.jsx","Mixin":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Mixin.js","Slug.js":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Slug.js","Util.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/FloatingButton.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/FloatingButton.jsx","components/Sortable.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Sortable.jsx","components/editing/CodeContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx","components/editing/ImageContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ImageContent.jsx","components/editing/MarkdownContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx","components/editing/MathContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx","mixins/Print":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/Print.js","mixins/Store":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/Store.js","page":"page","react":"react","react-select":"react-select"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePageController.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.EditModulePageController = EditModulePageController;

var _EditModulePageJsx = require('./EditModulePage.jsx');

var React = require("react");

function EditModulePageController(ctx, next) {
    React.render(React.createElement(_EditModulePageJsx.EditModulePage, { context: ctx, module: ctx.params.module }), window.app.domRoot);
}

},{"./EditModulePage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePage.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleBrowserPage.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mixinsData = require("mixins/data");

var _mixinsData2 = _interopRequireDefault(_mixinsData);

var _mixinsConnect = require("mixins/connect");

var _mixinsConnect2 = _interopRequireDefault(_mixinsConnect);

var _actionsModule = require("actions/Module");

var _actionsProject = require("actions/Project");

var _actionsTopic = require("actions/Topic");

var _componentsModuleJsx = require("components/Module.jsx");

var _componentsLayoutJsx = require("components/Layout.jsx");

var _page = require("page");

var _page2 = _interopRequireDefault(_page);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var ModuleBrowserPage = (function (_React$Component) {
    _inherits(ModuleBrowserPage, _React$Component);

    function ModuleBrowserPage(props) {
        var _this = this;

        _classCallCheck(this, _ModuleBrowserPage);

        _get(Object.getPrototypeOf(_ModuleBrowserPage.prototype), "constructor", this).call(this, props);
        this.state = {};

        this.loadData(props).then(function () {
            return _this.setState({ ready: true });
        });
    }

    _createClass(ModuleBrowserPage, [{
        key: "onSelectLiked",
        value: function onSelectLiked(topic) {}
    }, {
        key: "onSelectDisliked",
        value: function onSelectDisliked(topic) {}
    }, {
        key: "onChange",
        value: function onChange(value) {
            _page2["default"]("/concepts/project/" + this.props.project + "/" + value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (!this.state.ready) return null;

            return _react2["default"].createElement(
                "div",
                { className: "main-content" },
                _react2["default"].createElement(
                    "h2",
                    null,
                    "What would you like to learn next?"
                ),
                _react2["default"].createElement(
                    _componentsLayoutJsx.GridRow,
                    { sizes: { xs: 6, sm: 4, md: 3 } },
                    this.props.projectData[this.props.project].nextModules.map(function (module) {
                        return _react2["default"].createElement(_componentsModuleJsx.Module, { module: module, project: _this2.props.project, topics: module.topic_ids.map(function (id) {
                                return _this2.props.topics[id.$oid];
                            }) });
                    })
                ),
                _react2["default"].createElement(
                    "h3",
                    null,
                    "Searching for something in particular?"
                ),
                _react2["default"].createElement(_reactSelect2["default"], { options: this.props.allModules.map(function (module) {
                        return { value: module._id.$oid, label: module.title };
                    }), onChange: this.onChange.bind(this) })
            );
        }
    }]);

    var _ModuleBrowserPage = ModuleBrowserPage;
    ModuleBrowserPage = _mixinsData2["default"](function (props) {
        return [_actionsModule.fetchModules(), _actionsProject.fetchNextModules(props.project), _actionsTopic.fetchTopics()];
    })(ModuleBrowserPage) || ModuleBrowserPage;
    ModuleBrowserPage = _mixinsConnect2["default"](function (state) {
        return {
            allModules: Object.keys(state.module).map(function (id) {
                return state.module[id].data;
            }),
            projectData: state.project,
            topics: state.topic.items
        };
    })(ModuleBrowserPage) || ModuleBrowserPage;
    return ModuleBrowserPage;
})(_react2["default"].Component);

exports.ModuleBrowserPage = ModuleBrowserPage;

},{"actions/Module":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Module.js","actions/Project":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Project.js","actions/Topic":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Topic.js","components/Layout.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Layout.jsx","components/Module.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Module.jsx","mixins/connect":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/connect.js","mixins/data":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/data.js","page":"page","react":"react","react-select":"react-select"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleBrowserPageController.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ModuleBrowserPageController = ModuleBrowserPageController;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _BasePageJsx = require('./BasePage.jsx');

var _pagesModuleBrowserPageJsx = require('pages/ModuleBrowserPage.jsx');

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function ModuleBrowserPageController(ctx, next) {
    _react2['default'].render(_react2['default'].createElement(
        _BasePageJsx.BasePage,
        null,
        function () {
            return _react2['default'].createElement(_pagesModuleBrowserPageJsx.ModuleBrowserPage, { context: ctx, project: ctx.params.project });
        }
    ), window.app.domRoot);
}

},{"./BasePage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/BasePage.jsx","pages/ModuleBrowserPage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleBrowserPage.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/NewProjectPage.jsx":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mixinsData = require("mixins/data");

var _mixinsData2 = _interopRequireDefault(_mixinsData);

var _mixinsConnect = require("mixins/connect");

var _mixinsConnect2 = _interopRequireDefault(_mixinsConnect);

//import { addProject } from "actions/Project";

var _actionsTopic = require("actions/Topic");

var _componentsTopicPillJsx = require("components/TopicPill.jsx");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _API = require("API");

var _API2 = _interopRequireDefault(_API);

var _componentsInputInputJsx = require("components/input/Input.jsx");

var _SlugJs = require('Slug.js');

var NewProjectPage = (function (_React$Component) {
    _inherits(NewProjectPage, _React$Component);

    function NewProjectPage(props) {
        var _this = this;

        _classCallCheck(this, _NewProjectPage);

        _get(Object.getPrototypeOf(_NewProjectPage.prototype), "constructor", this).call(this, props);
        this.state = {};

        this.loadData(props).then(function () {
            return _this.setState({ ready: true });
        });
    }

    _createClass(NewProjectPage, [{
        key: "onSelectLiked",
        value: function onSelectLiked(topic) {}
    }, {
        key: "onSelectDisliked",
        value: function onSelectDisliked(topic) {}
    }, {
        key: "onNewProject",
        value: function onNewProject() {
            console.log(this.refs.test.val());

            _API2["default"].startProject(this.refs.test.val(), _SlugJs.Slug.convertToSlug(this.refs.test.val()), function (response) {
                console.log(response);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (!this.state.ready) return null;

            return _react2["default"].createElement(
                "div",
                { className: "box" },
                _react2["default"].createElement(
                    "h2",
                    null,
                    "Start a New Project"
                ),
                _react2["default"].createElement(
                    _componentsInputInputJsx.Input,
                    { ref: "test", name: "title", label: "Project Name" },
                    "Give this project a name, it could be for something you're working on or just a description of what you want to learn."
                ),
                _react2["default"].createElement(
                    "p",
                    null,
                    "Before we get started, we need to find out some information about this project."
                ),
                _react2["default"].createElement(
                    "h3",
                    null,
                    "Select 3 Topics You Would Like To Learn"
                ),
                _react2["default"].createElement(
                    "p",
                    null,
                    "These are the topics you think this project should teach you or you would like to learn."
                ),
                this.props.topics.map(function (topic) {
                    return _react2["default"].createElement(_componentsTopicPillJsx.TopicPill, { topic: topic, selectable: true, onSelect: _this2.onSelectLiked.bind(_this2) });
                }),
                _react2["default"].createElement(
                    "h3",
                    null,
                    "Select 3 Topics You Are Already Comfortable With"
                ),
                _react2["default"].createElement(
                    "p",
                    null,
                    "These are topics have some experience with already."
                ),
                this.props.topics.map(function (topic) {
                    return _react2["default"].createElement(_componentsTopicPillJsx.TopicPill, { topic: topic, selectable: true, onSelect: _this2.onSelectDisliked.bind(_this2) });
                }),
                _react2["default"].createElement(
                    "div",
                    { className: "text-center" },
                    _react2["default"].createElement(_componentsInputInputJsx.Button, { text: "Start Project", onClick: this.onNewProject.bind(this) })
                )
            );
        }
    }]);

    var _NewProjectPage = NewProjectPage;
    NewProjectPage = _mixinsData2["default"](function (props) {
        return [_actionsTopic.fetchTopics()];
    })(NewProjectPage) || NewProjectPage;
    NewProjectPage = _mixinsConnect2["default"](function (state) {
        return {
            topics: Object.keys(state.topic.items).map(function (id) {
                return state.topic.items[id];
            })
        };
    })(NewProjectPage) || NewProjectPage;
    return NewProjectPage;
})(_react2["default"].Component);

exports.NewProjectPage = NewProjectPage;

},{"API":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/API.js","Slug.js":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Slug.js","actions/Topic":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Topic.js","components/TopicPill.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/TopicPill.jsx","components/input/Input.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/input/Input.jsx","mixins/connect":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/connect.js","mixins/data":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/data.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/NewProjectPageController.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.NewProjectPageController = NewProjectPageController;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _BasePageJsx = require('./BasePage.jsx');

var _pagesNewProjectPageJsx = require('pages/NewProjectPage.jsx');

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function NewProjectPageController(ctx, next) {
    _react2['default'].render(_react2['default'].createElement(
        _BasePageJsx.BasePage,
        null,
        function () {
            return _react2['default'].createElement(_pagesNewProjectPageJsx.NewProjectPage, { context: ctx });
        }
    ), window.app.domRoot);
}

},{"./BasePage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/BasePage.jsx","pages/NewProjectPage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/NewProjectPage.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectPageController.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ProjectPageController = ProjectPageController;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _BasePageJsx = require('./BasePage.jsx');

var _pagesProjectStartPageJsx = require('pages/ProjectStartPage.jsx');

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function ProjectPageController(ctx, next) {
    _react2['default'].render(_react2['default'].createElement(
        _BasePageJsx.BasePage,
        null,
        function () {
            return _react2['default'].createElement(_pagesProjectStartPageJsx.ProjectStartPage, { context: ctx, project: ctx.params.project });
        }
    ), window.app.domRoot);
}

},{"./BasePage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/BasePage.jsx","pages/ProjectStartPage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectStartPage.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectStartPage.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsEditingCodeContentJsx = require('components/editing/CodeContent.jsx');

var _componentsEditingMathContentJsx = require('components/editing/MathContent.jsx');

var _componentsEditingMarkdownContentJsx = require('components/editing/MarkdownContent.jsx');

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _mixinsData = require("mixins/data");

var _mixinsData2 = _interopRequireDefault(_mixinsData);

var _mixinsConnect = require("mixins/connect");

var _mixinsConnect2 = _interopRequireDefault(_mixinsConnect);

var _actionsProject = require("actions/Project");

var _actionsModule = require("actions/Module");

var React = require("react");

var ProjectStartPage = (function (_React$Component) {
    _inherits(ProjectStartPage, _React$Component);

    function ProjectStartPage(props) {
        _classCallCheck(this, _ProjectStartPage);

        _get(Object.getPrototypeOf(_ProjectStartPage.prototype), 'constructor', this).call(this, props);
        this.state = {};

        this.loadData(props);
    }

    _createClass(ProjectStartPage, [{
        key: 'navigate',
        value: function navigate(e) {
            console.log("Navigated");
            _page2['default']("/concepts/test");
        }
    }, {
        key: 'edit',
        value: function edit(e) {
            this.setState({ editField: !this.state.editField });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                'div',
                { className: 'box' },
                React.createElement(
                    'h2',
                    null,
                    'Start a New Project'
                ),
                React.createElement(
                    'a',
                    { href: '/concepts/test' },
                    'Go to test'
                ),
                this.props.modules.map(function (module) {
                    return React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: '/concepts/project/' + _this.props.project + '/' + module.data._id.$oid },
                            module.data.title
                        )
                    );
                }),
                React.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: this.edit.bind(this) },
                    'Edit Field'
                ),
                React.createElement(
                    'div',
                    { className: 'btn-group', role: 'group', onClick: this.navigate.bind(this) },
                    React.createElement(
                        'button',
                        { className: 'btn btn-default' },
                        'Click me to Add Data'
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn btn-default' },
                        'Click me to Replay Data'
                    ),
                    React.createElement(
                        'button',
                        { className: 'btn btn-default' },
                        'Click me to Reset Data'
                    )
                )
            );
        }
    }]);

    var _ProjectStartPage = ProjectStartPage;
    ProjectStartPage = _mixinsData2['default'](function (props) {
        return [_actionsProject.fetchProject(props.project), _actionsModule.fetchModules()];
    })(ProjectStartPage) || ProjectStartPage;
    ProjectStartPage = _mixinsConnect2['default'](function (state) {
        return {
            modules: Object.keys(state.module).map(function (key) {
                return state.module[key];
            }),
            projects: state.project,
            topics: state.topic.items
        };
    })(ProjectStartPage) || ProjectStartPage;
    return ProjectStartPage;
})(React.Component);

exports.ProjectStartPage = ProjectStartPage;

},{"actions/Module":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Module.js","actions/Project":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Project.js","components/editing/CodeContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx","components/editing/MarkdownContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx","components/editing/MathContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx","mixins/connect":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/connect.js","mixins/data":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/data.js","page":"page","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ViewModulePage.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _componentsEditingCodeContentJsx = require('components/editing/CodeContent.jsx');

var _componentsEditingMathContentJsx = require('components/editing/MathContent.jsx');

var _componentsEditingMarkdownContentJsx = require('components/editing/MarkdownContent.jsx');

var _componentsEditingImageContentJsx = require('components/editing/ImageContent.jsx');

var _componentsAceEditorJsx = require('components/AceEditor.jsx');

var _componentsModuleJsx = require('components/Module.jsx');

var _componentsTopicPillJsx = require('components/TopicPill.jsx');

var _componentsLearningGraphJsx = require('components/LearningGraph.jsx');

var _API = require("API");

var _API2 = _interopRequireDefault(_API);

var _UtilJsx = require("Util.jsx");

var _reactEs7Mixin = require("react-es7-mixin");

var _mixinsData = require("mixins/data");

var _mixinsData2 = _interopRequireDefault(_mixinsData);

var _mixinsConnect = require("mixins/connect");

var _mixinsConnect2 = _interopRequireDefault(_mixinsConnect);

var _actionsProject = require("actions/Project");

var _actionsModule = require("actions/Module");

var _actionsTopic = require("actions/Topic");

var _componentsLayoutJsx = require("components/Layout.jsx");

var React = require("react");

var ViewModulePage = (function (_React$Component) {
    _inherits(ViewModulePage, _React$Component);

    function ViewModulePage(props) {
        var _this = this;

        _classCallCheck(this, _ViewModulePage);

        _get(Object.getPrototypeOf(_ViewModulePage.prototype), 'constructor', this).call(this, props);

        this.state = {};

        this.loadData(props).then(function () {
            return _this.setState({ ready: true });
        });
    }

    //TODO, remove old style from here

    _createClass(ViewModulePage, [{
        key: 'onModuleClick',
        value: function onModuleClick(next) {
            _API2['default'].finishedModule(this.props.project, this.props.module);
            _API2['default'].transition(this.props.module, next._id.$oid);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'isEditable',
        value: function isEditable() {
            return false;
        }

        // Antipattern yo
    }, {
        key: 'getMetadata',
        value: function getMetadata() {
            return this.props.projects[this.props.project].metadata;
        }
    }, {
        key: 'getNextModules',
        value: function getNextModules() {
            return this.props.projects[this.props.project].nextModules;
        }
    }, {
        key: 'getContents',
        value: function getContents() {
            return this.props.modules[this.props.module].contents;
        }
    }, {
        key: 'getModule',
        value: function getModule() {
            return this.props.modules[this.props.module].data;
        }
    }, {
        key: 'getTopics',
        value: function getTopics() {
            var _this2 = this;

            return this.props.modules[this.props.module].topics.map(function (id) {
                return _this2.props.topics[id];
            });
        }
    }, {
        key: 'metadataChange',
        value: function metadataChange(content) {
            try {
                var metadata = JSON.parse(content);

                this.props.onUpdateMetadata(this.props.project, metadata);
            } catch (err) {
                console.log("invalid metadata");
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (!this.state.ready) return null;

            var contentTypeLookup = {
                "MarkdownContent": function MarkdownContent(ctx) {
                    return React.createElement(_componentsEditingMarkdownContentJsx.MarkdownContent, { comments: ctx.comments, module: _this3.props.module, id: ctx.id, value: ctx.body, editable: _this3.isEditable, metadata: _this3.getMetadata.bind(_this3) });
                },
                "CodeContent": function CodeContent(ctx) {
                    return React.createElement(_componentsEditingCodeContentJsx.CodeContent, { comments: ctx.comments, module: _this3.props.module, id: ctx.id, value: ctx.body, language: ctx.language, editable: _this3.isEditable, metadata: _this3.getMetadata.bind(_this3) });
                },
                "MathContent": function MathContent(ctx) {
                    return React.createElement(_componentsEditingMathContentJsx.MathContent, { comments: ctx.comments, module: _this3.props.module, id: ctx.id, value: ctx.body, editable: _this3.isEditable, metadata: _this3.getMetadata.bind(_this3) });
                },
                "ImageContent": function ImageContent(ctx) {
                    return React.createElement(_componentsEditingImageContentJsx.ImageContent, { comments: ctx.comments, module: _this3.props.module, id: ctx.id, value: '', editable: _this3.isEditable, metadata: _this3.getMetadata.bind(_this3) });
                }
            };

            return React.createElement(
                'div',
                { className: 'main-content' },
                React.createElement(
                    'div',
                    { className: 'view-module-page' },
                    React.createElement(
                        'div',
                        { className: 'title' },
                        React.createElement(
                            'h2',
                            null,
                            this.getModule().title
                        ),
                        React.createElement(
                            'h3',
                            { className: 'author' },
                            'Ben Follington'
                        ),
                        this.getTopics().map(function (topic) {
                            return React.createElement(_componentsTopicPillJsx.TopicPill, { topic: topic });
                        })
                    ),
                    this.getContents().map(function (block) {
                        return contentTypeLookup[block.type](block);
                    })
                ),
                React.createElement(
                    'h3',
                    null,
                    'What\'s Next?'
                ),
                React.createElement(
                    _componentsLayoutJsx.GridRow,
                    { sizes: { xs: 6, sm: 4, md: 3 } },
                    this.getNextModules().map(function (module) {
                        return React.createElement(_componentsModuleJsx.Module, {
                            module: module,
                            project: _this3.props.project,
                            topics: module.topic_ids.map(function (id) {
                                return _this3.props.topics[id.$oid];
                            }),
                            onClick: _this3.onModuleClick.bind(_this3, module)
                        });
                    })
                ),
                React.createElement(_componentsLearningGraphJsx.LearningGraph, { module: this.props.module, project: this.props.project })
            );
        }
    }]);

    var _ViewModulePage = ViewModulePage;
    ViewModulePage = _mixinsData2['default'](function (props) {
        return [_actionsProject.fetchProject(props.project), _actionsModule.fetchModule(props.module), _actionsTopic.fetchTopics(), _actionsProject.fetchNextModules(props.project, props.module)];
    })(ViewModulePage) || ViewModulePage;
    ViewModulePage = _mixinsConnect2['default'](function (state) {
        return {
            modules: state.module,
            projects: state.project,
            topics: state.topic.items
        };
    }, function (dispatch) {
        return {
            onUpdateMetadata: function onUpdateMetadata(project, metadata) {
                return dispatch(_actionsProject.updateMetadata(project, metadata));
            }
        };
    })(ViewModulePage) || ViewModulePage;
    return ViewModulePage;
})(React.Component);

exports.ViewModulePage = ViewModulePage;
/*<div className="box">
   <AceEditor onContentChange={this.metadataChange.bind(this)} language='javascript' value={"{}"} />
</div>*/

},{"API":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/API.js","Util.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Util.jsx","actions/Module":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Module.js","actions/Project":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Project.js","actions/Topic":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Topic.js","components/AceEditor.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/AceEditor.jsx","components/Layout.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Layout.jsx","components/LearningGraph.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/LearningGraph.jsx","components/Module.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Module.jsx","components/TopicPill.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/TopicPill.jsx","components/editing/CodeContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/CodeContent.jsx","components/editing/ImageContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/ImageContent.jsx","components/editing/MarkdownContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MarkdownContent.jsx","components/editing/MathContent.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/editing/MathContent.jsx","mixins/connect":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/connect.js","mixins/data":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/mixins/data.js","react":"react","react-es7-mixin":"react-es7-mixin"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ViewModulePageController.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ViewModulePageController = ViewModulePageController;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _BasePageJsx = require('./BasePage.jsx');

var _ViewModulePageJsx = require('./ViewModulePage.jsx');

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function ViewModulePageController(ctx, next) {
    _react2['default'].render(_react2['default'].createElement(
        _BasePageJsx.BasePage,
        null,
        function () {
            return _react2['default'].createElement(_ViewModulePageJsx.ViewModulePage, { context: ctx, project: ctx.params.project, module: ctx.params.module });
        }
    ), window.app.domRoot);
}

},{"./BasePage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/BasePage.jsx","./ViewModulePage.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ViewModulePage.jsx","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Module.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _actionsModule = require("actions/Module");

var _UtilJs = require("./Util.js");

var _UtilJs2 = _interopRequireDefault(_UtilJs);

function moduleData(state, action) {
    if (state === undefined) state = {
        isFetching: false,
        isFetchingNextModules: false,
        didInvalidate: false,
        data: {},
        contents: [],
        topics: []
    };

    switch (action.type) {

        case _actionsModule.REQUEST_MODULE:
            return _UtilJs2["default"](state, {
                isFetching: true,
                didInvalidate: false
            });

        case _actionsModule.RECEIVE_MODULE:
            return _UtilJs2["default"](state, {
                isFetching: false,
                didInvalidate: false,
                data: action.data.learning_module,
                contents: action.data.contents, //TODO: make a contents store and reference by id instead
                topics: action.data.learning_module.topic_ids.map(function (id) {
                    return id.$oid;
                })
            });

        default:
            return state;

    }
}

function _module(state, action) {
    if (state === undefined) state = {};

    switch (action.type) {

        case _actionsModule.REQUEST_MODULES:
            return _UtilJs2["default"](state, {});

        // FIXME, needs improving, retrieving all modules should call through to the reducer for a single one to keep same data interface
        case _actionsModule.RECEIVE_MODULES:
            var modules = {};

            action.data.forEach(function (module) {
                modules[module._id.$oid] = { data: module };
            });

            return _UtilJs2["default"](state, modules);

        case _actionsModule.REQUEST_MODULE:
        case _actionsModule.RECEIVE_MODULE:
            return _UtilJs2["default"](state, _defineProperty({}, action.id, moduleData(state[action.id], action)));

        default:
            return state;

    }
}

exports["default"] = _module;
module.exports = exports["default"];

},{"./Util.js":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Util.js","actions/Module":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Module.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Project.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _actionsProject = require("actions/Project");

var _UtilJs = require("./Util.js");

var _UtilJs2 = _interopRequireDefault(_UtilJs);

function projectData(state, action) {
    if (state === undefined) state = {
        isFetching: false,
        isFetchingNextModules: false,
        didInvalidate: false,
        data: {},
        metadata: {},
        nextModules: []
    };

    switch (action.type) {

        case _actionsProject.REQUEST_PROJECT:
            return _UtilJs2["default"](state, {
                isFetching: true,
                didInvalidate: false
            });

        case _actionsProject.RECEIVE_PROJECT:
            return _UtilJs2["default"](state, {
                data: action.data
            });

        case _actionsProject.RECEIVE_METADATA:
            return _UtilJs2["default"](state, {
                isFetching: false,
                didInvalidate: false,
                metadata: action.metadata
            });

        case _actionsProject.UPDATE_METADATA:
            return _UtilJs2["default"](state, {
                metadata: action.metadata
            });

        case _actionsProject.REQUEST_NEXT_MODULES:
            return _UtilJs2["default"](state, {
                isFetchingNextModules: true
            });

        case _actionsProject.RECEIVE_NEXT_MODULES:
            return _UtilJs2["default"](state, {
                nextModules: action.next,
                isFetchingNextModules: false
            });

        default:
            return state;

    }
}

function project(state, action) {
    if (state === undefined) state = {};

    switch (action.type) {

        case _actionsProject.REQUEST_PROJECT:
        case _actionsProject.RECEIVE_PROJECT:
        case _actionsProject.RECEIVE_METADATA:
        case _actionsProject.UPDATE_METADATA:
            return _UtilJs2["default"](state, _defineProperty({}, action.id, projectData(state[action.id], action)));

        case _actionsProject.REQUEST_NEXT_MODULES:
        case _actionsProject.RECEIVE_NEXT_MODULES:
            return _UtilJs2["default"](state, _defineProperty({}, action.project, projectData(state[action.project], action)));

        default:
            return state;

    }
}

exports["default"] = project;
module.exports = exports["default"];

},{"./Util.js":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Util.js","actions/Project":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Project.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Topic.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _actionsTopic = require("actions/Topic");

var _UtilJs = require("./Util.js");

var _UtilJs2 = _interopRequireDefault(_UtilJs);

function topics(state, action) {
    if (state === undefined) state = {
        areFetching: false,
        didInvalidate: false,
        items: {}
    };

    switch (action.type) {

        case _actionsTopic.REQUEST_TOPICS:
            return _UtilJs2["default"](state, {
                areFetching: true,
                didInvalidate: false
            });

        case _actionsTopic.RECEIVE_TOPICS:
            var topicsDict = {};
            action.data.topics.forEach(function (topic) {
                topicsDict[topic["_id"]["$oid"]] = topic;
            });

            return _UtilJs2["default"](state, {
                areFetching: false,
                didInvalidate: false,
                items: topicsDict
            });

        default:
            return state;

    }
}

exports["default"] = topics;
module.exports = exports["default"];

},{"./Util.js":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Util.js","actions/Topic":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/actions/Topic.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/reducers/Util.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = clone;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function clone(obj, keys) {
    return _objectAssign2["default"]({}, obj, keys);
}

module.exports = exports["default"];

},{"object-assign":"object-assign"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/router.jsx":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _pagesNewProjectPageControllerJsx = require('./pages/NewProjectPageController.jsx');

var _pagesProjectPageControllerJsx = require('./pages/ProjectPageController.jsx');

var _pagesViewModulePageControllerJsx = require('./pages/ViewModulePageController.jsx');

var _pagesModuleBrowserPageControllerJsx = require('./pages/ModuleBrowserPageController.jsx');

var _pagesEditModulePageControllerJsx = require('./pages/EditModulePageController.jsx');

var React = require("react");

var render = function render(component) {
    return React.render(component, window.app.domRoot);
};

var baseRoute = "/concepts";

var routes = {};

routes['/'] = _pagesNewProjectPageControllerJsx.NewProjectPageController;
routes['/project/:project'] = _pagesProjectPageControllerJsx.ProjectPageController;
routes['/project/:project/:module'] = _pagesViewModulePageControllerJsx.ViewModulePageController;
routes['/browse/:project'] = _pagesModuleBrowserPageControllerJsx.ModuleBrowserPageController;
routes['/edit'] = _pagesEditModulePageControllerJsx.EditModulePageController;
routes['/edit/:module'] = _pagesEditModulePageControllerJsx.EditModulePageController;
routes['/view/:module'] = _pagesViewModulePageControllerJsx.ViewModulePageController;

var Router = (function () {
    function Router() {
        _classCallCheck(this, Router);

        this.baseRoute = "/concepts";
    }

    _createClass(Router, [{
        key: 'start',
        value: function start() {

            _page2['default']('*', function (ctx, next) {
                if (ctx.init) {
                    next();
                } else {
                    // window.app.domRoot.classList.add('transition');
                    render(React.createElement('div', null));
                    // setTimeout(function(){
                    //     window.app.domRoot.classList.remove('transition');
                    //     next();
                    // }, 300);
                    next();
                }
            });

            for (var i in routes) {
                _page2['default'](baseRoute + i, routes[i]);
            }

            _page2['default'](this.baseRoute + '/*', function () {});

            _page2['default']();
        }
    }]);

    return Router;
})();

exports.Router = Router;

},{"./pages/EditModulePageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/EditModulePageController.jsx","./pages/ModuleBrowserPageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ModuleBrowserPageController.jsx","./pages/NewProjectPageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/NewProjectPageController.jsx","./pages/ProjectPageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectPageController.jsx","./pages/ViewModulePageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ViewModulePageController.jsx","page":"page","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/ModuleStore.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _storesStore = require('stores/Store');

var actions = {
    "addModule": "onAddModule",
    "addComment": "onAddComment",
    "updateModule": "onUpdateModule"
};

var modules = {};
var fetchedAll = false;

var ModuleStore = (function (_Store) {
    _inherits(ModuleStore, _Store);

    function ModuleStore() {
        _classCallCheck(this, ModuleStore);

        _get(Object.getPrototypeOf(ModuleStore.prototype), "constructor", this).call(this, actions);
    }

    _createClass(ModuleStore, [{
        key: "onAddModule",
        value: function onAddModule(data) {
            console.log("Add module", data);
            modules.push(data);
        }
    }, {
        key: "onAddComment",
        value: function onAddComment(data) {
            var content;

            modules[data.module].contents.forEach(function (c) {
                if (c._id.$oid == data.id) {
                    content = c;
                }
            });

            content.comments = content.comments || [];
            content.comments.push({ text: data.text });
            this.save(data.module);
        }
    }, {
        key: "onUpdateModule",
        value: function onUpdateModule(data) {
            console.log("On update module");
            modules[data.id] = data;
        }
    }, {
        key: "fetchAll",
        value: function fetchAll(callback) {

            if (!fetchedAll) {
                $.get("/api/modules/", function (data) {
                    modules = data.modules;
                    callback(data);
                });
            } else {
                callback(modules);
            }
        }
    }, {
        key: "finishedModule",
        value: function finishedModule(project, module, callback) {
            $.post("/api/finished_module/", JSON.stringify({ project: project, module: module }), callback);
        }
    }, {
        key: "get",
        value: function get(id, callback) {

            if (modules[id]) {
                callback(modules[id]);
                return;
            }

            $.get("/api/concept/" + id, function (data) {
                modules[id] = data;
                callback(data);
            });
        }
    }, {
        key: "save",
        value: function save(id, callback) {

            var data = {
                "module": JSON.stringify(modules[id])
            };

            $.post("/api/save_module", data, callback);
        }
    }]);

    return ModuleStore;
})(_storesStore.Store);

exports.ModuleStore = ModuleStore;

},{"stores/Store":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/Store.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/ProjectStore.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _storesStore = require('stores/Store');

var actions = {};

var projects = {};
var fetchedAll = false;
var currentProject;

var ProjectStore = (function (_Store) {
    _inherits(ProjectStore, _Store);

    function ProjectStore() {
        _classCallCheck(this, ProjectStore);

        _get(Object.getPrototypeOf(ProjectStore.prototype), 'constructor', this).call(this, actions);
    }

    _createClass(ProjectStore, [{
        key: 'getMetadata',
        value: function getMetadata(project, callback) {
            if (projects[project] && projects[project].metadata) {
                callback(projects[project].metadata);
            } else {

                if (projects[project]) {
                    // Project is cached, metadata isn't
                    this.fetchMetadata(project, callback);
                } else {
                    // Nothing cached
                    this.getProject(project, function (data) {
                        this.fetchMetadata(project, callback);
                    });
                }
            }
        }
    }, {
        key: 'setCurrentProject',
        value: function setCurrentProject(name) {
            currentProject = name;
        }
    }, {
        key: 'getCurrentProject',
        value: function getCurrentProject() {
            return currentProject;
        }
    }, {
        key: 'getNextModules',
        value: function getNextModules(project, module, callback) {
            $.get('/concepts/next/' + module + '/' + project, {}, callback);
        }
    }, {
        key: 'fetchMetadata',
        value: function fetchMetadata(project, callback) {
            $.get('/concepts/all_data/' + project, {}, function (data) {
                projects[project].metadata = data;
            });
        }
    }, {
        key: 'getProject',
        value: function getProject(project, callback) {
            if (projects[project]) {
                callback(projects[project]);
            } else {
                $.get('/concepts/project/' + project, {}, function (data) {
                    projects[project] = data.project;
                });
            }
        }
    }]);

    return ProjectStore;
})(_storesStore.Store);

exports.ProjectStore = ProjectStore;

},{"stores/Store":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/Store.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/Store.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require("events");

var Store = (function (_EventEmitter) {
    _inherits(Store, _EventEmitter);

    function Store(actions) {
        _classCallCheck(this, Store);

        _get(Object.getPrototypeOf(Store.prototype), "constructor", this).call(this);

        this.actions = {};

        for (var key in actions) {
            this.actions[key] = this.emit.bind(this, key);

            this.addListener(key, this[actions[key]]);
            this.addListener(key, this.onChange.bind(this, key));
        }
    }

    _createClass(Store, [{
        key: "onChange",
        value: function onChange(key, data) {
            if (typeof data === "string") {
                console.error("Data passed to an event should be an object to enable appending of metadata.");
            }

            data.eventType = key;
            this.emit("change", data);
        }
    }]);

    return Store;
})(_events.EventEmitter);

exports.Store = Store;

},{"events":"/Users/Ben/Projects/Ruby/doublejump/node_modules/browserify/node_modules/events/events.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/TopicStore.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _storesStore = require('stores/Store');

var actions = {
    "addTopic": "onAddTopic"
};

var fetchedAllFromServer = false;
var topics = {};

var TopicStore = (function (_Store) {
    _inherits(TopicStore, _Store);

    function TopicStore() {
        _classCallCheck(this, TopicStore);

        _get(Object.getPrototypeOf(TopicStore.prototype), "constructor", this).call(this, actions);
    }

    _createClass(TopicStore, [{
        key: "onAddTopic",
        value: function onAddTopic(data) {
            console.log("Add topic", data);
            topics.push(data);
        }
    }, {
        key: "get",
        value: function get(id, callback) {
            if (topics[id]) {
                return topics[id];
            } else {
                this.getAll(function (data) {
                    callback(data[id]);
                });
            }
        }
    }, {
        key: "getList",
        value: function getList(ids, callback) {
            var result = [];

            this.getAll(function (topics) {
                ids.forEach(function (id) {
                    result.push(topics[id]);
                });

                callback(result);
            });
        }
    }, {
        key: "getAll",
        value: function getAll(callback) {
            if (fetchedAllFromServer) {
                callback(topics);
            } else {
                $.get("/api/topics", function (data) {

                    data.topics.forEach(function (topic) {
                        topics[topic["_id"]["$oid"]] = topic;
                    });

                    fetchedAllFromServer = true;
                    callback(topics);
                });
            }
        }
    }]);

    return TopicStore;
})(_storesStore.Store);

exports.TopicStore = TopicStore;

},{"stores/Store":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/stores/Store.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/browserify/node_modules/events/events.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/createDevTools.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createDevTools;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _reactReduxLibComponentsCreateAll = require('react-redux/lib/components/createAll');

var _reactReduxLibComponentsCreateAll2 = _interopRequireDefault(_reactReduxLibComponentsCreateAll);

var _devTools = require('./devTools');

function createDevTools(React) {
  var PropTypes = React.PropTypes;
  var Component = React.Component;

  var _createAll = _reactReduxLibComponentsCreateAll2['default'](React);

  var Provider = _createAll.Provider;
  var connect = _createAll.connect;

  var DevTools = (function (_Component) {
    _inherits(DevTools, _Component);

    function DevTools() {
      _classCallCheck(this, _DevTools);

      _Component.apply(this, arguments);
    }

    DevTools.prototype.render = function render() {
      var Monitor = this.props.monitor;

      return React.createElement(Monitor, this.props);
    };

    var _DevTools = DevTools;
    DevTools = connect(function (state) {
      return state;
    }, _devTools.ActionCreators)(DevTools) || DevTools;
    return DevTools;
  })(Component);

  return (function (_Component2) {
    _inherits(DevToolsWrapper, _Component2);

    _createClass(DevToolsWrapper, null, [{
      key: 'propTypes',
      value: {
        monitor: PropTypes.func.isRequired,
        store: PropTypes.shape({
          devToolsStore: PropTypes.shape({
            dispatch: PropTypes.func.isRequired
          }).isRequired
        }).isRequired
      },
      enumerable: true
    }]);

    function DevToolsWrapper(props, context) {
      _classCallCheck(this, DevToolsWrapper);

      if (props.store && !props.store.devToolsStore) {
        console.error('Could not find the devTools store inside your store. ' + 'Have you applied devTools() higher-order store?');
      }
      _Component2.call(this, props, context);
      this.renderDevTools = this.renderDevTools.bind(this);
    }

    DevToolsWrapper.prototype.render = function render() {
      var devToolsStore = this.props.store.devToolsStore;

      return React.createElement(
        Provider,
        { store: devToolsStore },
        this.renderDevTools
      );
    };

    DevToolsWrapper.prototype.renderDevTools = function renderDevTools() {
      var _props = this.props;
      var store = _props.store;

      var rest = _objectWithoutProperties(_props, ['store']);

      return React.createElement(DevTools, rest);
    };

    return DevToolsWrapper;
  })(Component);
}

module.exports = exports['default'];
},{"./devTools":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/devTools.js","react-redux/lib/components/createAll":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/components/createAll.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/devTools.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = devTools;
var ActionTypes = {
  PERFORM_ACTION: 'PERFORM_ACTION',
  RESET: 'RESET',
  ROLLBACK: 'ROLLBACK',
  COMMIT: 'COMMIT',
  SWEEP: 'SWEEP',
  TOGGLE_ACTION: 'TOGGLE_ACTION',
  JUMP_TO_STATE: 'JUMP_TO_STATE',
  SET_MONITOR_STATE: 'SET_MONITOR_STATE',
  RECOMPUTE_STATES: 'RECOMPUTE_STATES'
};

var INIT_ACTION = {
  type: '@@INIT'
};

function toggle(obj, key) {
  var clone = _extends({}, obj);
  if (clone[key]) {
    delete clone[key];
  } else {
    clone[key] = true;
  }
  return clone;
}

/**
 * Computes the next entry in the log by applying an action.
 */
function computeNextEntry(reducer, action, state, error) {
  if (error) {
    return {
      state: state,
      error: 'Interrupted by an error up the chain'
    };
  }

  var nextState = state;
  var nextError = undefined;
  try {
    nextState = reducer(state, action);
  } catch (err) {
    nextError = err.toString();
    console.error(err.stack || err);
  }

  return {
    state: nextState,
    error: nextError
  };
}

/**
 * Runs the reducer on all actions to get a fresh computation log.
 * It's probably a good idea to do this only if the code has changed,
 * but until we have some tests we'll just do it every time an action fires.
 */
function recomputeStates(reducer, committedState, stagedActions, skippedActions) {
  var computedStates = [];

  for (var i = 0; i < stagedActions.length; i++) {
    var action = stagedActions[i];

    var previousEntry = computedStates[i - 1];
    var previousState = previousEntry ? previousEntry.state : committedState;
    var previousError = previousEntry ? previousEntry.error : undefined;

    var shouldSkip = Boolean(skippedActions[i]);
    var entry = shouldSkip ? previousEntry : computeNextEntry(reducer, action, previousState, previousError);

    computedStates.push(entry);
  }

  return computedStates;
}

/**
 * Lifts the app state reducer into a DevTools state reducer.
 */
function liftReducer(reducer, initialState) {
  var initialLiftedState = {
    committedState: initialState,
    stagedActions: [INIT_ACTION],
    skippedActions: {},
    currentStateIndex: 0,
    monitorState: {
      isVisible: true
    },
    timestamps: [Date.now()]
  };

  /**
   * Manages how the DevTools actions modify the DevTools state.
   */
  return function liftedReducer(liftedState, liftedAction) {
    if (liftedState === undefined) liftedState = initialLiftedState;
    var committedState = liftedState.committedState;
    var stagedActions = liftedState.stagedActions;
    var skippedActions = liftedState.skippedActions;
    var computedStates = liftedState.computedStates;
    var currentStateIndex = liftedState.currentStateIndex;
    var monitorState = liftedState.monitorState;
    var timestamps = liftedState.timestamps;

    switch (liftedAction.type) {
      case ActionTypes.RESET:
        committedState = initialState;
        stagedActions = [INIT_ACTION];
        skippedActions = {};
        currentStateIndex = 0;
        timestamps = [liftedAction.timestamp];
        break;
      case ActionTypes.COMMIT:
        committedState = computedStates[currentStateIndex].state;
        stagedActions = [INIT_ACTION];
        skippedActions = {};
        currentStateIndex = 0;
        timestamps = [liftedAction.timestamp];
        break;
      case ActionTypes.ROLLBACK:
        stagedActions = [INIT_ACTION];
        skippedActions = {};
        currentStateIndex = 0;
        timestamps = [liftedAction.timestamp];
        break;
      case ActionTypes.TOGGLE_ACTION:
        skippedActions = toggle(skippedActions, liftedAction.index);
        break;
      case ActionTypes.JUMP_TO_STATE:
        currentStateIndex = liftedAction.index;
        break;
      case ActionTypes.SWEEP:
        stagedActions = stagedActions.filter(function (_, i) {
          return !skippedActions[i];
        });
        timestamps = timestamps.filter(function (_, i) {
          return !skippedActions[i];
        });
        skippedActions = {};
        currentStateIndex = Math.min(currentStateIndex, stagedActions.length - 1);
        break;
      case ActionTypes.PERFORM_ACTION:
        if (currentStateIndex === stagedActions.length - 1) {
          currentStateIndex++;
        }
        stagedActions = [].concat(stagedActions, [liftedAction.action]);
        timestamps = [].concat(timestamps, [liftedAction.timestamp]);
        break;
      case ActionTypes.SET_MONITOR_STATE:
        monitorState = liftedAction.monitorState;
        break;
      case ActionTypes.RECOMPUTE_STATES:
        stagedActions = liftedAction.stagedActions;
        timestamps = liftedAction.timestamps;
        committedState = liftedAction.committedState;
        currentStateIndex = stagedActions.length - 1;
        skippedActions = {};
        break;
      default:
        break;
    }

    computedStates = recomputeStates(reducer, committedState, stagedActions, skippedActions);

    return {
      committedState: committedState,
      stagedActions: stagedActions,
      skippedActions: skippedActions,
      computedStates: computedStates,
      currentStateIndex: currentStateIndex,
      monitorState: monitorState,
      timestamps: timestamps
    };
  };
}

/**
 * Lifts an app action to a DevTools action.
 */
function liftAction(action) {
  var liftedAction = {
    type: ActionTypes.PERFORM_ACTION,
    action: action,
    timestamp: Date.now()
  };
  return liftedAction;
}

/**
 * Unlifts the DevTools state to the app state.
 */
function unliftState(liftedState) {
  var computedStates = liftedState.computedStates;
  var currentStateIndex = liftedState.currentStateIndex;
  var state = computedStates[currentStateIndex].state;

  return state;
}

/**
 * Unlifts the DevTools store to act like the app's store.
 */
function unliftStore(liftedStore, reducer) {
  return _extends({}, liftedStore, {
    devToolsStore: liftedStore,
    dispatch: function dispatch(action) {
      liftedStore.dispatch(liftAction(action));
      return action;
    },
    getState: function getState() {
      return unliftState(liftedStore.getState());
    },
    getReducer: function getReducer() {
      return reducer;
    },
    replaceReducer: function replaceReducer(nextReducer) {
      liftedStore.replaceReducer(liftReducer(nextReducer));
    }
  });
}

/**
 * Action creators to change the DevTools state.
 */
var ActionCreators = {
  reset: function reset() {
    return { type: ActionTypes.RESET, timestamp: Date.now() };
  },
  rollback: function rollback() {
    return { type: ActionTypes.ROLLBACK, timestamp: Date.now() };
  },
  commit: function commit() {
    return { type: ActionTypes.COMMIT, timestamp: Date.now() };
  },
  sweep: function sweep() {
    return { type: ActionTypes.SWEEP };
  },
  toggleAction: function toggleAction(index) {
    return { type: ActionTypes.TOGGLE_ACTION, index: index };
  },
  jumpToState: function jumpToState(index) {
    return { type: ActionTypes.JUMP_TO_STATE, index: index };
  },
  setMonitorState: function setMonitorState(monitorState) {
    return { type: ActionTypes.SET_MONITOR_STATE, monitorState: monitorState };
  },
  recomputeStates: function recomputeStates(committedState, stagedActions) {
    return {
      type: ActionTypes.RECOMPUTE_STATES,
      committedState: committedState,
      stagedActions: stagedActions
    };
  }
};

exports.ActionCreators = ActionCreators;
/**
 * Redux DevTools middleware.
 */

function devTools() {
  return function (next) {
    return function (reducer, initialState) {
      var liftedReducer = liftReducer(reducer, initialState);
      var liftedStore = next(liftedReducer);
      var store = unliftStore(liftedStore, reducer);
      return store;
    };
  };
}
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/index.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _devTools = require('./devTools');

exports.devTools = _interopRequire(_devTools);

var _persistState = require('./persistState');

exports.persistState = _interopRequire(_persistState);
},{"./devTools":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/devTools.js","./persistState":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/persistState.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/persistState.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = persistState;

function persistState(sessionId) {
  if (!sessionId) {
    return function (next) {
      return function () {
        return next.apply(undefined, arguments);
      };
    };
  }

  return function (next) {
    return function (reducer, initialState) {
      var key = 'redux-dev-session-' + sessionId;

      var finalInitialState = undefined;
      try {
        finalInitialState = JSON.parse(localStorage.getItem(key)) || initialState;
        next(reducer, initialState);
      } catch (e) {
        console.warn('Could not read debug session from localStorage:', e);
        try {
          localStorage.removeItem(key);
        } finally {
          finalInitialState = undefined;
        }
      }

      var store = next(reducer, finalInitialState);

      return _extends({}, store, {
        dispatch: function dispatch(action) {
          store.dispatch(action);

          try {
            localStorage.setItem(key, JSON.stringify(store.getState()));
          } catch (e) {
            console.warn('Could not write debug session from localStorage:', e);
          }

          return action;
        }
      });
    };
  };
}

module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/DebugPanel.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.getDefaultStyle = getDefaultStyle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function getDefaultStyle(props) {
  var left = props.left;
  var right = props.right;
  var bottom = props.bottom;
  var top = props.top;

  if (typeof left === 'undefined' && typeof right === 'undefined') {
    right = true;
  }
  if (typeof top === 'undefined' && typeof bottom === 'undefined') {
    bottom = true;
  }

  return {
    position: 'fixed',
    zIndex: 10000,
    fontSize: 17,
    overflow: 'hidden',
    opacity: 1,
    color: 'white',
    left: left ? 0 : undefined,
    right: right ? 0 : undefined,
    top: top ? 0 : undefined,
    bottom: bottom ? 0 : undefined,
    maxHeight: bottom && top ? '100%' : '30%',
    maxWidth: left && right ? '100%' : '30%',
    wordWrap: 'break-word',
    boxSizing: 'border-box',
    boxShadow: '-2px 0 7px 0 rgba(0, 0, 0, 0.5)'
  };
}

var DebugPanel = (function () {
  function DebugPanel() {
    _classCallCheck(this, DebugPanel);
  }

  DebugPanel.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { style: _extends({}, this.props.getStyle(this.props), this.props.style) },
      this.props.children
    );
  };

  _createClass(DebugPanel, null, [{
    key: 'propTypes',
    value: {
      left: _react.PropTypes.bool,
      right: _react.PropTypes.bool,
      bottom: _react.PropTypes.bool,
      top: _react.PropTypes.bool,
      getStyle: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      getStyle: getDefaultStyle
    },
    enumerable: true
  }]);

  return DebugPanel;
})();

exports['default'] = DebugPanel;
},{"react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONArrayNode.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _JSONArrow = require('./JSONArrow');

var _JSONArrow2 = _interopRequireDefault(_JSONArrow);

var _grabNode = require('./grab-node');

var _grabNode2 = _interopRequireDefault(_grabNode);

var styles = {
  base: {
    position: 'relative',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14
  },
  label: {
    margin: 0,
    padding: 0,
    display: 'inline-block'
  },
  span: {
    cursor: 'default'
  },
  spanType: {
    marginLeft: 5,
    marginRight: 5
  }
};

var JSONArrayNode = (function (_React$Component) {
  _inherits(JSONArrayNode, _React$Component);

  function JSONArrayNode(props) {
    _classCallCheck(this, _JSONArrayNode);

    _React$Component.call(this, props);
    this.defaultProps = {
      data: [],
      initialExpanded: false
    };
    this.needsChildNodes = true;
    this.renderedChildren = [];
    this.itemString = false;
    this.state = {
      expanded: this.props.initialExpanded,
      createdChildNodes: false
    };
  }

  // Returns the child nodes for each element in the array. If we have
  // generated them previously, we return from cache, otherwise we create
  // them.

  JSONArrayNode.prototype.getChildNodes = function getChildNodes() {
    var _this = this;

    if (this.state.expanded && this.needsChildNodes) {
      (function () {
        var childNodes = [];
        _this.props.data.forEach(function (element, idx) {
          var prevData = undefined;
          if (typeof _this.props.previousData !== 'undefined') {
            prevData = _this.props.previousData[idx];
          }
          var node = _grabNode2['default'](idx, element, prevData, _this.props.theme);
          if (node !== false) {
            childNodes.push(node);
          }
        });
        _this.needsChildNodes = false;
        _this.renderedChildren = childNodes;
      })();
    }
    return this.renderedChildren;
  };

  // Returns the "n Items" string for this node, generating and
  // caching it if it hasn't been created yet.

  JSONArrayNode.prototype.getItemString = function getItemString() {
    if (!this.itemString) {
      this.itemString = this.props.data.length + ' item' + (this.props.data.length !== 1 ? 's' : '');
    }
    return this.itemString;
  };

  JSONArrayNode.prototype.render = function render() {
    var childNodes = this.getChildNodes();
    var childListStyle = {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: this.state.expanded ? 'block' : 'none'
    };
    var containerStyle = undefined;
    var spanStyle = _extends({}, styles.span, {
      color: this.props.theme.base0E
    });
    containerStyle = _extends({}, styles.base);
    if (this.state.expanded) {
      spanStyle = _extends({}, spanStyle, {
        color: this.props.theme.base03
      });
    }
    return _react2['default'].createElement(
      'li',
      { style: containerStyle },
      _react2['default'].createElement(_JSONArrow2['default'], { theme: this.props.theme, open: this.state.expanded, onClick: this.handleClick.bind(this) }),
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }), onClick: this.handleClick.bind(this) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: spanStyle, onClick: this.handleClick.bind(this) },
        _react2['default'].createElement(
          'span',
          { style: styles.spanType },
          '[]'
        ),
        this.getItemString()
      ),
      _react2['default'].createElement(
        'ol',
        { style: childListStyle },
        childNodes
      )
    );
  };

  var _JSONArrayNode = JSONArrayNode;
  JSONArrayNode = _reactMixin2['default'].decorate(_mixins.ExpandedStateHandlerMixin)(JSONArrayNode) || JSONArrayNode;
  return JSONArrayNode;
})(_react2['default'].Component);

exports['default'] = JSONArrayNode;
module.exports = exports['default'];

// flag to see if we still need to render our child nodes

// cache store for our child nodes

// cache store for the number of items string we display
},{"./JSONArrow":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONArrow.js","./grab-node":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/grab-node.js","./mixins":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/index.js","react":"react","react-mixin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONArrow.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var styles = {
  base: {
    display: 'inline-block',
    marginLeft: 0,
    marginTop: 8,
    marginRight: 5,
    'float': 'left',
    transition: '150ms',
    WebkitTransition: '150ms',
    MozTransition: '150ms',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTopWidth: 5,
    borderTopStyle: 'solid',
    WebkitTransform: 'rotateZ(-90deg)',
    MozTransform: 'rotateZ(-90deg)',
    transform: 'rotateZ(-90deg)'
  },
  open: {
    WebkitTransform: 'rotateZ(0deg)',
    MozTransform: 'rotateZ(0deg)',
    transform: 'rotateZ(0deg)'
  }
};

var JSONArrow = (function (_React$Component) {
  _inherits(JSONArrow, _React$Component);

  function JSONArrow() {
    _classCallCheck(this, JSONArrow);

    _React$Component.apply(this, arguments);
  }

  JSONArrow.prototype.render = function render() {
    var style = _extends({}, styles.base, {
      borderTopColor: this.props.theme.base0D
    });
    if (this.props.open) {
      style = _extends({}, style, styles.open);
    }
    return _react2['default'].createElement('div', { style: style, onClick: this.props.onClick });
  };

  return JSONArrow;
})(_react2['default'].Component);

exports['default'] = JSONArrow;
module.exports = exports['default'];
},{"react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONBooleanNode.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _utilsHexToRgb = require('../../utils/hexToRgb');

var _utilsHexToRgb2 = _interopRequireDefault(_utilsHexToRgb);

var styles = {
  base: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14
  },
  label: {
    display: 'inline-block',
    marginRight: 5
  }
};

var JSONBooleanNode = (function (_React$Component) {
  _inherits(JSONBooleanNode, _React$Component);

  function JSONBooleanNode() {
    _classCallCheck(this, _JSONBooleanNode);

    _React$Component.apply(this, arguments);
  }

  JSONBooleanNode.prototype.render = function render() {
    var truthString = this.props.value ? 'true' : 'false';
    var backgroundColor = 'transparent';
    if (this.props.previousValue !== this.props.value) {
      var bgColor = _utilsHexToRgb2['default'](this.props.theme.base06);
      backgroundColor = 'rgba(' + bgColor.r + ', ' + bgColor.g + ', ' + bgColor.b + ', 0.1)';
    }
    return _react2['default'].createElement(
      'li',
      { style: _extends({}, styles.base, { backgroundColor: backgroundColor }), onClick: this.handleClick.bind(this) },
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: { color: this.props.theme.base09 } },
        truthString
      )
    );
  };

  var _JSONBooleanNode = JSONBooleanNode;
  JSONBooleanNode = _reactMixin2['default'].decorate(_mixins.SquashClickEventMixin)(JSONBooleanNode) || JSONBooleanNode;
  return JSONBooleanNode;
})(_react2['default'].Component);

exports['default'] = JSONBooleanNode;
module.exports = exports['default'];
},{"../../utils/hexToRgb":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/hexToRgb.js","./mixins":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/index.js","react":"react","react-mixin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONNullNode.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _utilsHexToRgb = require('../../utils/hexToRgb');

var _utilsHexToRgb2 = _interopRequireDefault(_utilsHexToRgb);

var styles = {
  base: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14
  },
  label: {
    display: 'inline-block',
    marginRight: 5
  }
};

var JSONNullNode = (function (_React$Component) {
  _inherits(JSONNullNode, _React$Component);

  function JSONNullNode() {
    _classCallCheck(this, _JSONNullNode);

    _React$Component.apply(this, arguments);
  }

  JSONNullNode.prototype.render = function render() {
    var backgroundColor = 'transparent';
    if (this.props.previousValue !== this.props.value) {
      var bgColor = _utilsHexToRgb2['default'](this.props.theme.base06);
      backgroundColor = 'rgba(' + bgColor.r + ', ' + bgColor.g + ', ' + bgColor.b + ', 0.1)';
    }
    return _react2['default'].createElement(
      'li',
      { style: _extends({}, styles.base, { backgroundColor: backgroundColor }), onClick: this.handleClick.bind(this) },
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: { color: this.props.theme.base08 } },
        'null'
      )
    );
  };

  var _JSONNullNode = JSONNullNode;
  JSONNullNode = _reactMixin2['default'].decorate(_mixins.SquashClickEventMixin)(JSONNullNode) || JSONNullNode;
  return JSONNullNode;
})(_react2['default'].Component);

exports['default'] = JSONNullNode;
module.exports = exports['default'];
},{"../../utils/hexToRgb":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/hexToRgb.js","./mixins":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/index.js","react":"react","react-mixin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONNumberNode.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _utilsHexToRgb = require('../../utils/hexToRgb');

var _utilsHexToRgb2 = _interopRequireDefault(_utilsHexToRgb);

var styles = {
  base: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14
  },
  label: {
    display: 'inline-block',
    marginRight: 5
  }
};

var JSONNumberNode = (function (_React$Component) {
  _inherits(JSONNumberNode, _React$Component);

  function JSONNumberNode() {
    _classCallCheck(this, _JSONNumberNode);

    _React$Component.apply(this, arguments);
  }

  JSONNumberNode.prototype.render = function render() {
    var backgroundColor = 'transparent';
    if (this.props.previousValue !== this.props.value) {
      var bgColor = _utilsHexToRgb2['default'](this.props.theme.base06);
      backgroundColor = 'rgba(' + bgColor.r + ', ' + bgColor.g + ', ' + bgColor.b + ', 0.1)';
    }
    return _react2['default'].createElement(
      'li',
      { style: _extends({}, styles.base, { backgroundColor: backgroundColor }), onClick: this.handleClick.bind(this) },
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: { color: this.props.theme.base09 } },
        this.props.value
      )
    );
  };

  var _JSONNumberNode = JSONNumberNode;
  JSONNumberNode = _reactMixin2['default'].decorate(_mixins.SquashClickEventMixin)(JSONNumberNode) || JSONNumberNode;
  return JSONNumberNode;
})(_react2['default'].Component);

exports['default'] = JSONNumberNode;
module.exports = exports['default'];
},{"../../utils/hexToRgb":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/hexToRgb.js","./mixins":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/index.js","react":"react","react-mixin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONObjectNode.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _JSONArrow = require('./JSONArrow');

var _JSONArrow2 = _interopRequireDefault(_JSONArrow);

var _grabNode = require('./grab-node');

var _grabNode2 = _interopRequireDefault(_grabNode);

var styles = {
  base: {
    position: 'relative',
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 14
  },
  label: {
    margin: 0,
    padding: 0,
    display: 'inline-block'
  },
  span: {
    cursor: 'default'
  },
  spanType: {
    marginLeft: 5,
    marginRight: 5
  }
};

var JSONObjectNode = (function (_React$Component) {
  _inherits(JSONObjectNode, _React$Component);

  function JSONObjectNode(props) {
    _classCallCheck(this, _JSONObjectNode);

    _React$Component.call(this, props);
    this.defaultProps = {
      data: [],
      initialExpanded: false
    };
    this.itemString = false;
    this.needsChildNodes = true;
    this.renderedChildren = [];
    this.state = {
      expanded: this.props.initialExpanded,
      createdChildNodes: false
    };
  }

  // Returns the child nodes for each element in the object. If we have
  // generated them previously, we return from cache, otherwise we create
  // them.

  JSONObjectNode.prototype.getChildNodes = function getChildNodes() {
    if (this.state.expanded && this.needsChildNodes) {
      var obj = this.props.data;
      var childNodes = [];
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          var prevData = undefined;
          if (typeof this.props.previousData !== 'undefined') {
            prevData = this.props.previousData[k];
          }
          var node = _grabNode2['default'](k, obj[k], prevData, this.props.theme);
          if (node !== false) {
            childNodes.push(node);
          }
        }
      }
      this.needsChildNodes = false;
      this.renderedChildren = childNodes;
    }
    return this.renderedChildren;
  };

  // Returns the "n Items" string for this node, generating and
  // caching it if it hasn't been created yet.

  JSONObjectNode.prototype.getItemString = function getItemString() {
    if (!this.itemString) {
      var len = Object.keys(this.props.data).length;
      this.itemString = len + ' key' + (len !== 1 ? 's' : '');
    }
    return this.itemString;
  };

  JSONObjectNode.prototype.render = function render() {
    var childListStyle = {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: this.state.expanded ? 'block' : 'none'
    };
    var containerStyle = undefined;
    var spanStyle = _extends({}, styles.span, {
      color: this.props.theme.base0B
    });
    containerStyle = _extends({}, styles.base);
    if (this.state.expanded) {
      spanStyle = _extends({}, spanStyle, {
        color: this.props.theme.base03
      });
    }
    return _react2['default'].createElement(
      'li',
      { style: containerStyle },
      _react2['default'].createElement(_JSONArrow2['default'], { theme: this.props.theme, open: this.state.expanded, onClick: this.handleClick.bind(this) }),
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }), onClick: this.handleClick.bind(this) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: spanStyle, onClick: this.handleClick.bind(this) },
        _react2['default'].createElement(
          'span',
          { style: styles.spanType },
          '{}'
        ),
        this.getItemString()
      ),
      _react2['default'].createElement(
        'ul',
        { style: childListStyle },
        this.getChildNodes()
      )
    );
  };

  var _JSONObjectNode = JSONObjectNode;
  JSONObjectNode = _reactMixin2['default'].decorate(_mixins.ExpandedStateHandlerMixin)(JSONObjectNode) || JSONObjectNode;
  return JSONObjectNode;
})(_react2['default'].Component);

exports['default'] = JSONObjectNode;
module.exports = exports['default'];

// cache store for the number of items string we display

// flag to see if we still need to render our child nodes

// cache store for our child nodes
},{"./JSONArrow":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONArrow.js","./grab-node":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/grab-node.js","./mixins":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/index.js","react":"react","react-mixin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONStringNode.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _mixins = require('./mixins');

var _utilsHexToRgb = require('../../utils/hexToRgb');

var _utilsHexToRgb2 = _interopRequireDefault(_utilsHexToRgb);

var styles = {
  base: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 0,
    marginLeft: 14
  },
  label: {
    display: 'inline-block',
    marginRight: 5
  }
};

var JSONStringNode = (function (_React$Component) {
  _inherits(JSONStringNode, _React$Component);

  function JSONStringNode() {
    _classCallCheck(this, _JSONStringNode);

    _React$Component.apply(this, arguments);
  }

  JSONStringNode.prototype.render = function render() {
    var backgroundColor = 'transparent';
    if (this.props.previousValue !== this.props.value) {
      var bgColor = _utilsHexToRgb2['default'](this.props.theme.base06);
      backgroundColor = 'rgba(' + bgColor.r + ', ' + bgColor.g + ', ' + bgColor.b + ', 0.1)';
    }
    return _react2['default'].createElement(
      'li',
      { style: _extends({}, styles.base, { backgroundColor: backgroundColor }), onClick: this.handleClick.bind(this) },
      _react2['default'].createElement(
        'label',
        { style: _extends({}, styles.label, {
            color: this.props.theme.base0D
          }) },
        this.props.keyName,
        ':'
      ),
      _react2['default'].createElement(
        'span',
        { style: { color: this.props.theme.base0B } },
        '"',
        this.props.value,
        '"'
      )
    );
  };

  var _JSONStringNode = JSONStringNode;
  JSONStringNode = _reactMixin2['default'].decorate(_mixins.SquashClickEventMixin)(JSONStringNode) || JSONStringNode;
  return JSONStringNode;
})(_react2['default'].Component);

exports['default'] = JSONStringNode;
module.exports = exports['default'];
},{"../../utils/hexToRgb":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/hexToRgb.js","./mixins":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/index.js","react":"react","react-mixin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/grab-node.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objType = require('./obj-type');

var _objType2 = _interopRequireDefault(_objType);

var _JSONObjectNode = require('./JSONObjectNode');

var _JSONObjectNode2 = _interopRequireDefault(_JSONObjectNode);

var _JSONArrayNode = require('./JSONArrayNode');

var _JSONArrayNode2 = _interopRequireDefault(_JSONArrayNode);

var _JSONStringNode = require('./JSONStringNode');

var _JSONStringNode2 = _interopRequireDefault(_JSONStringNode);

var _JSONNumberNode = require('./JSONNumberNode');

var _JSONNumberNode2 = _interopRequireDefault(_JSONNumberNode);

var _JSONBooleanNode = require('./JSONBooleanNode');

var _JSONBooleanNode2 = _interopRequireDefault(_JSONBooleanNode);

var _JSONNullNode = require('./JSONNullNode');

var _JSONNullNode2 = _interopRequireDefault(_JSONNullNode);

exports['default'] = function (key, value, prevValue, theme) {
  var nodeType = _objType2['default'](value);
  if (nodeType === 'Object') {
    return _react2['default'].createElement(_JSONObjectNode2['default'], { data: value, previousData: prevValue, theme: theme, keyName: key, key: key });
  } else if (nodeType === 'Array') {
    return _react2['default'].createElement(_JSONArrayNode2['default'], { data: value, previousData: prevValue, theme: theme, keyName: key, key: key });
  } else if (nodeType === 'String') {
    return _react2['default'].createElement(_JSONStringNode2['default'], { keyName: key, previousValue: prevValue, theme: theme, value: value, key: key });
  } else if (nodeType === 'Number') {
    return _react2['default'].createElement(_JSONNumberNode2['default'], { keyName: key, previousValue: prevValue, theme: theme, value: value, key: key });
  } else if (nodeType === 'Boolean') {
    return _react2['default'].createElement(_JSONBooleanNode2['default'], { keyName: key, previousValue: prevValue, theme: theme, value: value, key: key });
  } else if (nodeType === 'Null') {
    return _react2['default'].createElement(_JSONNullNode2['default'], { keyName: key, previousValue: prevValue, theme: theme, value: value, key: key });
  }
  return false;
};

module.exports = exports['default'];
},{"./JSONArrayNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONArrayNode.js","./JSONBooleanNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONBooleanNode.js","./JSONNullNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONNullNode.js","./JSONNumberNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONNumberNode.js","./JSONObjectNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONObjectNode.js","./JSONStringNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONStringNode.js","./obj-type":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/obj-type.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/index.js":[function(require,module,exports){
// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objType = require('./obj-type');

var _objType2 = _interopRequireDefault(_objType);

var _JSONObjectNode = require('./JSONObjectNode');

var _JSONObjectNode2 = _interopRequireDefault(_JSONObjectNode);

var _JSONArrayNode = require('./JSONArrayNode');

var _JSONArrayNode2 = _interopRequireDefault(_JSONArrayNode);

var styles = {
  tree: {
    border: 0,
    padding: 0,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 2,
    marginRight: 0,
    fontSize: '0.90em',
    listStyle: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none'
  }
};

var JSONTree = (function (_React$Component) {
  _inherits(JSONTree, _React$Component);

  _createClass(JSONTree, null, [{
    key: 'propTypes',
    value: {
      data: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired
    },
    enumerable: true
  }]);

  function JSONTree(props) {
    _classCallCheck(this, JSONTree);

    _React$Component.call(this, props);
  }

  JSONTree.prototype.render = function render() {
    var nodeType = _objType2['default'](this.props.data);
    var rootNode = false;
    var keyName = this.props.keyName || 'root';
    if (nodeType === 'Object') {
      rootNode = _react2['default'].createElement(_JSONObjectNode2['default'], { theme: this.props.theme, data: this.props.data, previousData: this.props.previousData, keyName: keyName, initialExpanded: true });
    } else if (nodeType === 'Array') {
      rootNode = _react2['default'].createElement(_JSONArrayNode2['default'], { theme: this.props.theme, data: this.props.data, previousData: this.props.previousData, initialExpanded: true, keyName: keyName });
    }
    return _react2['default'].createElement(
      'ul',
      { style: _extends({}, styles.tree, this.props.style) },
      rootNode
    );
  };

  return JSONTree;
})(_react2['default'].Component);

exports['default'] = JSONTree;
module.exports = exports['default'];
},{"./JSONArrayNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONArrayNode.js","./JSONObjectNode":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/JSONObjectNode.js","./obj-type":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/obj-type.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/expanded-state-handler.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDeepEqual = require('../../../utils/deepEqual');

var _utilsDeepEqual2 = _interopRequireDefault(_utilsDeepEqual);

exports['default'] = {
  handleClick: function handleClick(e) {
    e.stopPropagation();
    this.setState({
      expanded: !this.state.expanded
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    // resets our caches and flags we need to build child nodes again
    this.renderedChildren = [];
    this.itemString = false;
    this.needsChildNodes = true;
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !_utilsDeepEqual2['default'](this.state, nextState) || !_utilsDeepEqual2['default'](this.props, nextProps);
  }
};
module.exports = exports['default'];
},{"../../../utils/deepEqual":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/deepEqual.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/index.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _squashClickEvent = require('./squash-click-event');

exports.SquashClickEventMixin = _interopRequire(_squashClickEvent);

var _expandedStateHandler = require('./expanded-state-handler');

exports.ExpandedStateHandlerMixin = _interopRequire(_expandedStateHandler);
},{"./expanded-state-handler":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/expanded-state-handler.js","./squash-click-event":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/squash-click-event.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/mixins/squash-click-event.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = {
  handleClick: function handleClick(e) {
    e.stopPropagation();
  }
};
module.exports = exports["default"];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/obj-type.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports["default"] = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

module.exports = exports["default"];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitor.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LogMonitorEntry = require('./LogMonitorEntry');

var _LogMonitorEntry2 = _interopRequireDefault(_LogMonitorEntry);

var _LogMonitorButton = require('./LogMonitorButton');

var _LogMonitorButton2 = _interopRequireDefault(_LogMonitorButton);

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

var styles = {
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300
  },
  buttonBar: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: 'transparent',
    zIndex: 1,
    display: 'flex'
  },
  elements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    bottom: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
};

var LogMonitor = (function () {
  function LogMonitor() {
    _classCallCheck(this, LogMonitor);

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
  }

  LogMonitor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var node = _react.findDOMNode(this.refs.elements);
    if (!node) {
      this.scrollDown = true;
    } else if (this.props.stagedActions.length < nextProps.stagedActions.length) {
      var scrollTop = node.scrollTop;
      var offsetHeight = node.offsetHeight;
      var scrollHeight = node.scrollHeight;

      this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 20;
    } else {
      this.scrollDown = false;
    }
  };

  LogMonitor.prototype.componentDidUpdate = function componentDidUpdate() {
    var node = _react.findDOMNode(this.refs.elements);
    if (!node) {
      return;
    }
    if (this.scrollDown) {
      var offsetHeight = node.offsetHeight;
      var scrollHeight = node.scrollHeight;

      node.scrollTop = scrollHeight - offsetHeight;
      this.scrollDown = false;
    }
  };

  LogMonitor.prototype.handleRollback = function handleRollback() {
    this.props.rollback();
  };

  LogMonitor.prototype.handleSweep = function handleSweep() {
    this.props.sweep();
  };

  LogMonitor.prototype.handleCommit = function handleCommit() {
    this.props.commit();
  };

  LogMonitor.prototype.handleToggleAction = function handleToggleAction(index) {
    this.props.toggleAction(index);
  };

  LogMonitor.prototype.handleReset = function handleReset() {
    this.props.reset();
  };

  LogMonitor.prototype.handleKeyPress = function handleKeyPress(event) {
    var monitorState = this.props.monitorState;

    if (event.ctrlKey && event.keyCode === 72) {
      // Ctrl+H
      event.preventDefault();
      this.props.setMonitorState(_extends({}, monitorState, {
        isVisible: !monitorState.isVisible
      }));
    }
  };

  LogMonitor.prototype.render = function render() {
    var elements = [];
    var _props = this.props;
    var monitorState = _props.monitorState;
    var skippedActions = _props.skippedActions;
    var stagedActions = _props.stagedActions;
    var computedStates = _props.computedStates;
    var select = _props.select;

    var theme = undefined;
    if (typeof this.props.theme === 'string') {
      if (typeof themes[this.props.theme] !== 'undefined') {
        theme = themes[this.props.theme];
      } else {
        console.warn('DevTools theme ' + this.props.theme + ' not found, defaulting to nicinabox');
        theme = themes.nicinabox;
      }
    } else {
      theme = this.props.theme;
    }
    if (!monitorState.isVisible) {
      return null;
    }

    for (var i = 0; i < stagedActions.length; i++) {
      var action = stagedActions[i];
      var _computedStates$i = computedStates[i];
      var state = _computedStates$i.state;
      var error = _computedStates$i.error;

      var previousState = undefined;
      if (i > 0) {
        previousState = computedStates[i - 1].state;
      }
      elements.push(_react2['default'].createElement(_LogMonitorEntry2['default'], { key: i,
        index: i,
        theme: theme,
        select: select,
        action: action,
        state: state,
        previousState: previousState,
        collapsed: skippedActions[i],
        error: error,
        onActionClick: this.handleToggleAction.bind(this) }));
    }

    return _react2['default'].createElement(
      'div',
      { style: _extends({}, styles.container, { backgroundColor: theme.base00 }) },
      _react2['default'].createElement(
        'div',
        { style: _extends({}, styles.buttonBar, { borderColor: theme.base02 }) },
        _react2['default'].createElement(
          _LogMonitorButton2['default'],
          { theme: theme, onClick: this.handleReset.bind(this) },
          'Reset'
        ),
        _react2['default'].createElement(
          _LogMonitorButton2['default'],
          { theme: theme, onClick: this.handleRollback.bind(this), enabled: computedStates.length },
          'Revert'
        ),
        _react2['default'].createElement(
          _LogMonitorButton2['default'],
          { theme: theme, onClick: this.handleSweep.bind(this), enabled: Object.keys(skippedActions).some(function (key) {
              return skippedActions[key];
            }) },
          'Sweep'
        ),
        _react2['default'].createElement(
          _LogMonitorButton2['default'],
          { theme: theme, onClick: this.handleCommit.bind(this), enabled: computedStates.length > 1 },
          'Commit'
        )
      ),
      _react2['default'].createElement(
        'div',
        { style: styles.elements, ref: 'elements' },
        elements
      )
    );
  };

  _createClass(LogMonitor, null, [{
    key: 'propTypes',
    value: {
      computedStates: _react.PropTypes.array.isRequired,
      currentStateIndex: _react.PropTypes.number.isRequired,
      monitorState: _react.PropTypes.object.isRequired,
      stagedActions: _react.PropTypes.array.isRequired,
      skippedActions: _react.PropTypes.object.isRequired,
      reset: _react.PropTypes.func.isRequired,
      commit: _react.PropTypes.func.isRequired,
      rollback: _react.PropTypes.func.isRequired,
      sweep: _react.PropTypes.func.isRequired,
      toggleAction: _react.PropTypes.func.isRequired,
      jumpToState: _react.PropTypes.func.isRequired,
      setMonitorState: _react.PropTypes.func.isRequired,
      select: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      select: function select(state) {
        return state;
      },
      monitorState: { isVisible: true },
      theme: 'nicinabox'
    },
    enumerable: true
  }]);

  return LogMonitor;
})();

exports['default'] = LogMonitor;
module.exports = exports['default'];
},{"./LogMonitorButton":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitorButton.js","./LogMonitorEntry":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitorEntry.js","./themes":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/index.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitorButton.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBrighten = require('../utils/brighten');

var _utilsBrighten2 = _interopRequireDefault(_utilsBrighten);

var styles = {
  base: {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: 3,
    padding: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 5,
    marginBottom: 5,
    flexGrow: 1,
    display: 'inline-block',
    fontSize: '0.8em'
  }
};

var LogMonitorButton = (function (_React$Component) {
  _inherits(LogMonitorButton, _React$Component);

  function LogMonitorButton(props) {
    _classCallCheck(this, LogMonitorButton);

    _React$Component.call(this, props);
    this.state = {
      hovered: false,
      active: false
    };
  }

  LogMonitorButton.prototype.handleMouseEnter = function handleMouseEnter() {
    this.setState({ hovered: true });
  };

  LogMonitorButton.prototype.handleMouseLeave = function handleMouseLeave() {
    this.setState({ hovered: false });
  };

  LogMonitorButton.prototype.handleMouseDown = function handleMouseDown() {
    this.setState({ active: true });
  };

  LogMonitorButton.prototype.handleMouseUp = function handleMouseUp() {
    this.setState({ active: false });
  };

  LogMonitorButton.prototype.onClick = function onClick() {
    if (!this.props.enabled) {
      return;
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  LogMonitorButton.prototype.render = function render() {
    var style = _extends({}, styles.base, {
      backgroundColor: this.props.theme.base02
    });
    if (this.props.enabled && this.state.hovered) {
      style = _extends({}, style, {
        backgroundColor: _utilsBrighten2['default'](this.props.theme.base02, 0.2)
      });
    }
    if (!this.props.enabled) {
      style = _extends({}, style, {
        opacity: 0.2,
        cursor: 'text',
        backgroundColor: 'transparent'
      });
    }
    return _react2['default'].createElement(
      'a',
      { onMouseEnter: this.handleMouseEnter.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this),
        onMouseDown: this.handleMouseDown.bind(this),
        onMouseUp: this.handleMouseUp.bind(this),
        style: style, onClick: this.onClick.bind(this) },
      this.props.children
    );
  };

  return LogMonitorButton;
})(_react2['default'].Component);

exports['default'] = LogMonitorButton;
module.exports = exports['default'];
},{"../utils/brighten":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/brighten.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitorEntry.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _JSONTree = require('./JSONTree');

var _JSONTree2 = _interopRequireDefault(_JSONTree);

var _LogMonitorEntryAction = require('./LogMonitorEntryAction');

var _LogMonitorEntryAction2 = _interopRequireDefault(_LogMonitorEntryAction);

var styles = {
  entry: {
    display: 'block',
    WebkitUserSelect: 'none'
  },
  tree: {
    paddingLeft: 0
  }
};

var LogMonitorEntry = (function () {
  function LogMonitorEntry() {
    _classCallCheck(this, LogMonitorEntry);
  }

  LogMonitorEntry.prototype.printState = function printState(state, error) {
    var errorText = error;
    if (!errorText) {
      try {
        return _react2['default'].createElement(_JSONTree2['default'], {
          theme: this.props.theme,
          keyName: 'state',
          data: this.props.select(state),
          previousData: this.props.select(this.props.previousState),
          style: styles.tree });
      } catch (err) {
        errorText = 'Error selecting state.';
      }
    }
    return _react2['default'].createElement(
      'div',
      { style: {
          color: this.props.theme.base09,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 35
        } },
      errorText
    );
  };

  LogMonitorEntry.prototype.handleActionClick = function handleActionClick() {
    var _props = this.props;
    var index = _props.index;
    var onActionClick = _props.onActionClick;

    if (index > 0) {
      onActionClick(index);
    }
  };

  LogMonitorEntry.prototype.render = function render() {
    var _props2 = this.props;
    var index = _props2.index;
    var error = _props2.error;
    var action = _props2.action;
    var state = _props2.state;
    var collapsed = _props2.collapsed;

    var styleEntry = {
      opacity: collapsed ? 0.5 : 1,
      cursor: index > 0 ? 'pointer' : 'default'
    };
    return _react2['default'].createElement(
      'div',
      { style: { textDecoration: collapsed ? 'line-through' : 'none' } },
      _react2['default'].createElement(_LogMonitorEntryAction2['default'], {
        theme: this.props.theme,
        collapsed: collapsed,
        action: action,
        onClick: this.handleActionClick.bind(this),
        style: _extends({}, styles.entry, styleEntry) }),
      !collapsed && _react2['default'].createElement(
        'div',
        null,
        this.printState(state, error)
      )
    );
  };

  _createClass(LogMonitorEntry, null, [{
    key: 'propTypes',
    value: {
      index: _react.PropTypes.number.isRequired,
      state: _react.PropTypes.object.isRequired,
      action: _react.PropTypes.object.isRequired,
      select: _react.PropTypes.func.isRequired,
      error: _react.PropTypes.string,
      onActionClick: _react.PropTypes.func.isRequired,
      collapsed: _react.PropTypes.bool
    },
    enumerable: true
  }]);

  return LogMonitorEntry;
})();

exports['default'] = LogMonitorEntry;
module.exports = exports['default'];
},{"./JSONTree":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/index.js","./LogMonitorEntryAction":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitorEntryAction.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitorEntryAction.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _JSONTree = require('./JSONTree');

var _JSONTree2 = _interopRequireDefault(_JSONTree);

var styles = {
  actionBar: {
    paddingTop: 8,
    paddingBottom: 7,
    paddingLeft: 16
  },
  payload: {
    margin: 0,
    overflow: 'auto'
  }
};

var LogMonitorAction = (function (_React$Component) {
  _inherits(LogMonitorAction, _React$Component);

  function LogMonitorAction() {
    _classCallCheck(this, LogMonitorAction);

    _React$Component.apply(this, arguments);
  }

  LogMonitorAction.prototype.renderPayload = function renderPayload(payload) {
    return _react2['default'].createElement(
      'div',
      { style: _extends({}, styles.payload, {
          backgroundColor: this.props.theme.base00
        }) },
      Object.keys(payload).length > 0 ? _react2['default'].createElement(_JSONTree2['default'], { theme: this.props.theme, keyName: 'action', data: payload }) : ''
    );
  };

  LogMonitorAction.prototype.render = function render() {
    var _props$action = this.props.action;
    var type = _props$action.type;

    var payload = _objectWithoutProperties(_props$action, ['type']);

    return _react2['default'].createElement(
      'div',
      { style: _extends({
          backgroundColor: this.props.theme.base02,
          color: this.props.theme.base06
        }, this.props.style) },
      _react2['default'].createElement(
        'div',
        { style: styles.actionBar,
          onClick: this.props.onClick },
        type
      ),
      !this.props.collapsed ? this.renderPayload(payload) : ''
    );
  };

  return LogMonitorAction;
})(_react2['default'].Component);

exports['default'] = LogMonitorAction;
module.exports = exports['default'];
},{"./JSONTree":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/JSONTree/index.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/index.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createDevTools = require('../createDevTools');

var _createDevTools2 = _interopRequireDefault(_createDevTools);

var DevTools = _createDevTools2['default'](_react2['default']);
exports.DevTools = DevTools;

var _LogMonitor = require('./LogMonitor');

exports.LogMonitor = _interopRequire(_LogMonitor);

var _DebugPanel = require('./DebugPanel');

exports.DebugPanel = _interopRequire(_DebugPanel);
},{"../createDevTools":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/createDevTools.js","./DebugPanel":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/DebugPanel.js","./LogMonitor":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/LogMonitor.js","react":"react"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/apathy.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'apathy',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#031A16',
  base01: '#0B342D',
  base02: '#184E45',
  base03: '#2B685E',
  base04: '#5F9C92',
  base05: '#81B5AC',
  base06: '#A7CEC8',
  base07: '#D2E7E4',
  base08: '#3E9688',
  base09: '#3E7996',
  base0A: '#3E4C96',
  base0B: '#883E96',
  base0C: '#963E4C',
  base0D: '#96883E',
  base0E: '#4C963E',
  base0F: '#3E965B'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/ashes.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'ashes',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#1C2023',
  base01: '#393F45',
  base02: '#565E65',
  base03: '#747C84',
  base04: '#ADB3BA',
  base05: '#C7CCD1',
  base06: '#DFE2E5',
  base07: '#F3F4F5',
  base08: '#C7AE95',
  base09: '#C7C795',
  base0A: '#AEC795',
  base0B: '#95C7AE',
  base0C: '#95AEC7',
  base0D: '#AE95C7',
  base0E: '#C795AE',
  base0F: '#C79595'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-dune.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier dune',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)',
  base00: '#20201d',
  base01: '#292824',
  base02: '#6e6b5e',
  base03: '#7d7a68',
  base04: '#999580',
  base05: '#a6a28c',
  base06: '#e8e4cf',
  base07: '#fefbec',
  base08: '#d73737',
  base09: '#b65611',
  base0A: '#cfb017',
  base0B: '#60ac39',
  base0C: '#1fad83',
  base0D: '#6684e1',
  base0E: '#b854d4',
  base0F: '#d43552'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-forest.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier forest',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest)',
  base00: '#1b1918',
  base01: '#2c2421',
  base02: '#68615e',
  base03: '#766e6b',
  base04: '#9c9491',
  base05: '#a8a19f',
  base06: '#e6e2e0',
  base07: '#f1efee',
  base08: '#f22c40',
  base09: '#df5320',
  base0A: '#d5911a',
  base0B: '#5ab738',
  base0C: '#00ad9c',
  base0D: '#407ee7',
  base0E: '#6666ea',
  base0F: '#c33ff3'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-heath.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier heath',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath)',
  base00: '#1b181b',
  base01: '#292329',
  base02: '#695d69',
  base03: '#776977',
  base04: '#9e8f9e',
  base05: '#ab9bab',
  base06: '#d8cad8',
  base07: '#f7f3f7',
  base08: '#ca402b',
  base09: '#a65926',
  base0A: '#bb8a35',
  base0B: '#379a37',
  base0C: '#159393',
  base0D: '#516aec',
  base0E: '#7b59c0',
  base0F: '#cc33cc'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-lakeside.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier lakeside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside/)',
  base00: '#161b1d',
  base01: '#1f292e',
  base02: '#516d7b',
  base03: '#5a7b8c',
  base04: '#7195a8',
  base05: '#7ea2b4',
  base06: '#c1e4f6',
  base07: '#ebf8ff',
  base08: '#d22d72',
  base09: '#935c25',
  base0A: '#8a8a0f',
  base0B: '#568c3b',
  base0C: '#2d8f6f',
  base0D: '#257fad',
  base0E: '#5d5db1',
  base0F: '#b72dd2'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-seaside.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'atelier seaside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside/)',
  base00: '#131513',
  base01: '#242924',
  base02: '#5e6e5e',
  base03: '#687d68',
  base04: '#809980',
  base05: '#8ca68c',
  base06: '#cfe8cf',
  base07: '#f0fff0',
  base08: '#e6193c',
  base09: '#87711d',
  base0A: '#c3c322',
  base0B: '#29a329',
  base0C: '#1999b3',
  base0D: '#3d62f5',
  base0E: '#ad2bee',
  base0F: '#e619c3'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/bespin.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'bespin',
  author: 'jan t. sott',
  base00: '#28211c',
  base01: '#36312e',
  base02: '#5e5d5c',
  base03: '#666666',
  base04: '#797977',
  base05: '#8a8986',
  base06: '#9d9b97',
  base07: '#baae9e',
  base08: '#cf6a4c',
  base09: '#cf7d34',
  base0A: '#f9ee98',
  base0B: '#54be0d',
  base0C: '#afc4db',
  base0D: '#5ea6ea',
  base0E: '#9b859d',
  base0F: '#937121'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/brewer.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'brewer',
  author: 'timothée poisot (http://github.com/tpoisot)',
  base00: '#0c0d0e',
  base01: '#2e2f30',
  base02: '#515253',
  base03: '#737475',
  base04: '#959697',
  base05: '#b7b8b9',
  base06: '#dadbdc',
  base07: '#fcfdfe',
  base08: '#e31a1c',
  base09: '#e6550d',
  base0A: '#dca060',
  base0B: '#31a354',
  base0C: '#80b1d3',
  base0D: '#3182bd',
  base0E: '#756bb1',
  base0F: '#b15928'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/bright.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/chalk.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'chalk',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#f5f5f5',
  base08: '#fb9fb1',
  base09: '#eda987',
  base0A: '#ddb26f',
  base0B: '#acc267',
  base0C: '#12cfc0',
  base0D: '#6fc2ef',
  base0E: '#e1a3ee',
  base0F: '#deaf8f'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/codeschool.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'codeschool',
  author: 'brettof86',
  base00: '#232c31',
  base01: '#1c3657',
  base02: '#2a343a',
  base03: '#3f4944',
  base04: '#84898c',
  base05: '#9ea7a6',
  base06: '#a7cfa3',
  base07: '#b5d8f6',
  base08: '#2a5491',
  base09: '#43820d',
  base0A: '#a03b1e',
  base0B: '#237986',
  base0C: '#b02f30',
  base0D: '#484d79',
  base0E: '#c59820',
  base0F: '#c98344'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/colors.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'colors',
  author: 'mrmrs (http://clrs.cc)',
  base00: '#111111',
  base01: '#333333',
  base02: '#555555',
  base03: '#777777',
  base04: '#999999',
  base05: '#bbbbbb',
  base06: '#dddddd',
  base07: '#ffffff',
  base08: '#ff4136',
  base09: '#ff851b',
  base0A: '#ffdc00',
  base0B: '#2ecc40',
  base0C: '#7fdbff',
  base0D: '#0074d9',
  base0E: '#b10dc9',
  base0F: '#85144b'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/default.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'default',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#181818',
  base01: '#282828',
  base02: '#383838',
  base03: '#585858',
  base04: '#b8b8b8',
  base05: '#d8d8d8',
  base06: '#e8e8e8',
  base07: '#f8f8f8',
  base08: '#ab4642',
  base09: '#dc9656',
  base0A: '#f7ca88',
  base0B: '#a1b56c',
  base0C: '#86c1b9',
  base0D: '#7cafc2',
  base0E: '#ba8baf',
  base0F: '#a16946'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/eighties.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'eighties',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2d2d2d',
  base01: '#393939',
  base02: '#515151',
  base03: '#747369',
  base04: '#a09f93',
  base05: '#d3d0c8',
  base06: '#e8e6df',
  base07: '#f2f0ec',
  base08: '#f2777a',
  base09: '#f99157',
  base0A: '#ffcc66',
  base0B: '#99cc99',
  base0C: '#66cccc',
  base0D: '#6699cc',
  base0E: '#cc99cc',
  base0F: '#d27b53'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/embers.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'embers',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#16130F',
  base01: '#2C2620',
  base02: '#433B32',
  base03: '#5A5047',
  base04: '#8A8075',
  base05: '#A39A90',
  base06: '#BEB6AE',
  base07: '#DBD6D1',
  base08: '#826D57',
  base09: '#828257',
  base0A: '#6D8257',
  base0B: '#57826D',
  base0C: '#576D82',
  base0D: '#6D5782',
  base0E: '#82576D',
  base0F: '#825757'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/flat.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'flat',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2C3E50',
  base01: '#34495E',
  base02: '#7F8C8D',
  base03: '#95A5A6',
  base04: '#BDC3C7',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ECF0F1',
  base08: '#E74C3C',
  base09: '#E67E22',
  base0A: '#F1C40F',
  base0B: '#2ECC71',
  base0C: '#1ABC9C',
  base0D: '#3498DB',
  base0E: '#9B59B6',
  base0F: '#be643c'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/google.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/grayscale.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'grayscale',
  author: 'alexandre gavioli (https://github.com/alexx2/)',
  base00: '#101010',
  base01: '#252525',
  base02: '#464646',
  base03: '#525252',
  base04: '#ababab',
  base05: '#b9b9b9',
  base06: '#e3e3e3',
  base07: '#f7f7f7',
  base08: '#7c7c7c',
  base09: '#999999',
  base0A: '#a0a0a0',
  base0B: '#8e8e8e',
  base0C: '#868686',
  base0D: '#686868',
  base0E: '#747474',
  base0F: '#5e5e5e'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/greenscreen.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'green screen',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#001100',
  base01: '#003300',
  base02: '#005500',
  base03: '#007700',
  base04: '#009900',
  base05: '#00bb00',
  base06: '#00dd00',
  base07: '#00ff00',
  base08: '#007700',
  base09: '#009900',
  base0A: '#007700',
  base0B: '#00bb00',
  base0C: '#005500',
  base0D: '#009900',
  base0E: '#00bb00',
  base0F: '#005500'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/harmonic.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'harmonic16',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#0b1c2c',
  base01: '#223b54',
  base02: '#405c79',
  base03: '#627e99',
  base04: '#aabcce',
  base05: '#cbd6e2',
  base06: '#e5ebf1',
  base07: '#f7f9fb',
  base08: '#bf8b56',
  base09: '#bfbf56',
  base0A: '#8bbf56',
  base0B: '#56bf8b',
  base0C: '#568bbf',
  base0D: '#8b56bf',
  base0E: '#bf568b',
  base0F: '#bf5656'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/hopscotch.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'hopscotch',
  author: 'jan t. sott',
  base00: '#322931',
  base01: '#433b42',
  base02: '#5c545b',
  base03: '#797379',
  base04: '#989498',
  base05: '#b9b5b8',
  base06: '#d5d3d5',
  base07: '#ffffff',
  base08: '#dd464c',
  base09: '#fd8b19',
  base0A: '#fdcc59',
  base0B: '#8fc13e',
  base0C: '#149b93',
  base0D: '#1290bf',
  base0E: '#c85e7c',
  base0F: '#b33508'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/index.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _threezerotwofour = require('./threezerotwofour');

exports.threezerotwofour = _interopRequire(_threezerotwofour);

var _apathy = require('./apathy');

exports.apathy = _interopRequire(_apathy);

var _ashes = require('./ashes');

exports.ashes = _interopRequire(_ashes);

var _atelierDune = require('./atelier-dune');

exports.atelierDune = _interopRequire(_atelierDune);

var _atelierForest = require('./atelier-forest');

exports.atelierForest = _interopRequire(_atelierForest);

var _atelierHeath = require('./atelier-heath');

exports.atelierHeath = _interopRequire(_atelierHeath);

var _atelierLakeside = require('./atelier-lakeside');

exports.atelierLakeside = _interopRequire(_atelierLakeside);

var _atelierSeaside = require('./atelier-seaside');

exports.atelierSeaside = _interopRequire(_atelierSeaside);

var _bespin = require('./bespin');

exports.bespin = _interopRequire(_bespin);

var _brewer = require('./brewer');

exports.brewer = _interopRequire(_brewer);

var _bright = require('./bright');

exports.bright = _interopRequire(_bright);

var _chalk = require('./chalk');

exports.chalk = _interopRequire(_chalk);

var _codeschool = require('./codeschool');

exports.codeschool = _interopRequire(_codeschool);

var _colors = require('./colors');

exports.colors = _interopRequire(_colors);

var _default = require('./default');

exports['default'] = _interopRequire(_default);

var _eighties = require('./eighties');

exports.eighties = _interopRequire(_eighties);

var _embers = require('./embers');

exports.embers = _interopRequire(_embers);

var _flat = require('./flat');

exports.flat = _interopRequire(_flat);

var _google = require('./google');

exports.google = _interopRequire(_google);

var _grayscale = require('./grayscale');

exports.grayscale = _interopRequire(_grayscale);

var _greenscreen = require('./greenscreen');

exports.greenscreen = _interopRequire(_greenscreen);

var _harmonic = require('./harmonic');

exports.harmonic = _interopRequire(_harmonic);

var _hopscotch = require('./hopscotch');

exports.hopscotch = _interopRequire(_hopscotch);

var _isotope = require('./isotope');

exports.isotope = _interopRequire(_isotope);

var _marrakesh = require('./marrakesh');

exports.marrakesh = _interopRequire(_marrakesh);

var _mocha = require('./mocha');

exports.mocha = _interopRequire(_mocha);

var _monokai = require('./monokai');

exports.monokai = _interopRequire(_monokai);

var _ocean = require('./ocean');

exports.ocean = _interopRequire(_ocean);

var _paraiso = require('./paraiso');

exports.paraiso = _interopRequire(_paraiso);

var _pop = require('./pop');

exports.pop = _interopRequire(_pop);

var _railscasts = require('./railscasts');

exports.railscasts = _interopRequire(_railscasts);

var _shapeshifter = require('./shapeshifter');

exports.shapeshifter = _interopRequire(_shapeshifter);

var _solarized = require('./solarized');

exports.solarized = _interopRequire(_solarized);

var _summerfruit = require('./summerfruit');

exports.summerfruit = _interopRequire(_summerfruit);

var _tomorrow = require('./tomorrow');

exports.tomorrow = _interopRequire(_tomorrow);

var _tube = require('./tube');

exports.tube = _interopRequire(_tube);

var _twilight = require('./twilight');

exports.twilight = _interopRequire(_twilight);

var _nicinabox = require('./nicinabox');

exports.nicinabox = _interopRequire(_nicinabox);
},{"./apathy":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/apathy.js","./ashes":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/ashes.js","./atelier-dune":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-dune.js","./atelier-forest":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-forest.js","./atelier-heath":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-heath.js","./atelier-lakeside":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-lakeside.js","./atelier-seaside":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/atelier-seaside.js","./bespin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/bespin.js","./brewer":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/brewer.js","./bright":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/bright.js","./chalk":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/chalk.js","./codeschool":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/codeschool.js","./colors":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/colors.js","./default":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/default.js","./eighties":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/eighties.js","./embers":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/embers.js","./flat":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/flat.js","./google":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/google.js","./grayscale":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/grayscale.js","./greenscreen":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/greenscreen.js","./harmonic":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/harmonic.js","./hopscotch":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/hopscotch.js","./isotope":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/isotope.js","./marrakesh":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/marrakesh.js","./mocha":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/mocha.js","./monokai":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/monokai.js","./nicinabox":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/nicinabox.js","./ocean":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/ocean.js","./paraiso":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/paraiso.js","./pop":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/pop.js","./railscasts":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/railscasts.js","./shapeshifter":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/shapeshifter.js","./solarized":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/solarized.js","./summerfruit":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/summerfruit.js","./threezerotwofour":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/threezerotwofour.js","./tomorrow":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/tomorrow.js","./tube":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/tube.js","./twilight":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/twilight.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/isotope.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'isotope',
  author: 'jan t. sott',
  base00: '#000000',
  base01: '#404040',
  base02: '#606060',
  base03: '#808080',
  base04: '#c0c0c0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#ff0000',
  base09: '#ff9900',
  base0A: '#ff0099',
  base0B: '#33ff00',
  base0C: '#00ffff',
  base0D: '#0066ff',
  base0E: '#cc00ff',
  base0F: '#3300ff'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/marrakesh.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'marrakesh',
  author: 'alexandre gavioli (http://github.com/alexx2/)',
  base00: '#201602',
  base01: '#302e00',
  base02: '#5f5b17',
  base03: '#6c6823',
  base04: '#86813b',
  base05: '#948e48',
  base06: '#ccc37a',
  base07: '#faf0a5',
  base08: '#c35359',
  base09: '#b36144',
  base0A: '#a88339',
  base0B: '#18974e',
  base0C: '#75a738',
  base0D: '#477ca1',
  base0E: '#8868b3',
  base0F: '#b3588e'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/mocha.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'mocha',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#3B3228',
  base01: '#534636',
  base02: '#645240',
  base03: '#7e705a',
  base04: '#b8afad',
  base05: '#d0c8c6',
  base06: '#e9e1dd',
  base07: '#f5eeeb',
  base08: '#cb6077',
  base09: '#d28b71',
  base0A: '#f4bc87',
  base0B: '#beb55b',
  base0C: '#7bbda4',
  base0D: '#8ab3b5',
  base0E: '#a89bb9',
  base0F: '#bb9584'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/monokai.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/nicinabox.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'nicinabox',
  author: 'nicinabox (http://github.com/nicinabox)',
  base00: '#2A2F3A',
  base01: '#3C444F',
  base02: '#4F5A65',
  base03: '#BEBEBE',
  base04: '#b0b0b0', // unmodified
  base05: '#d0d0d0', // unmodified
  base06: '#FFFFFF',
  base07: '#f5f5f5', // unmodified
  base08: '#fb9fb1', // unmodified
  base09: '#FC6D24',
  base0A: '#ddb26f', // unmodified
  base0B: '#A1C659',
  base0C: '#12cfc0', // unmodified
  base0D: '#6FB3D2',
  base0E: '#D381C3',
  base0F: '#deaf8f' // unmodified
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/ocean.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'ocean',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2b303b',
  base01: '#343d46',
  base02: '#4f5b66',
  base03: '#65737e',
  base04: '#a7adba',
  base05: '#c0c5ce',
  base06: '#dfe1e8',
  base07: '#eff1f5',
  base08: '#bf616a',
  base09: '#d08770',
  base0A: '#ebcb8b',
  base0B: '#a3be8c',
  base0C: '#96b5b4',
  base0D: '#8fa1b3',
  base0E: '#b48ead',
  base0F: '#ab7967'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/paraiso.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'paraiso',
  author: 'jan t. sott',
  base00: '#2f1e2e',
  base01: '#41323f',
  base02: '#4f424c',
  base03: '#776e71',
  base04: '#8d8687',
  base05: '#a39e9b',
  base06: '#b9b6b0',
  base07: '#e7e9db',
  base08: '#ef6155',
  base09: '#f99b15',
  base0A: '#fec418',
  base0B: '#48b685',
  base0C: '#5bc4bf',
  base0D: '#06b6ef',
  base0E: '#815ba4',
  base0F: '#e96ba8'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/pop.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'pop',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#eb008a',
  base09: '#f29333',
  base0A: '#f8ca12',
  base0B: '#37b349',
  base0C: '#00aabb',
  base0D: '#0e5a94',
  base0E: '#b31e8d',
  base0F: '#7a2d00'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/railscasts.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'railscasts',
  author: 'ryan bates (http://railscasts.com)',
  base00: '#2b2b2b',
  base01: '#272935',
  base02: '#3a4055',
  base03: '#5a647e',
  base04: '#d4cfc9',
  base05: '#e6e1dc',
  base06: '#f4f1ed',
  base07: '#f9f7f3',
  base08: '#da4939',
  base09: '#cc7833',
  base0A: '#ffc66d',
  base0B: '#a5c261',
  base0C: '#519f50',
  base0D: '#6d9cbe',
  base0E: '#b6b3eb',
  base0F: '#bc9458'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/shapeshifter.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'shapeshifter',
  author: 'tyler benziger (http://tybenz.com)',
  base00: '#000000',
  base01: '#040404',
  base02: '#102015',
  base03: '#343434',
  base04: '#555555',
  base05: '#ababab',
  base06: '#e0e0e0',
  base07: '#f9f9f9',
  base08: '#e92f2f',
  base09: '#e09448',
  base0A: '#dddd13',
  base0B: '#0ed839',
  base0C: '#23edda',
  base0D: '#3b48e3',
  base0E: '#f996e2',
  base0F: '#69542d'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/solarized.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'solarized',
  author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
  base00: '#002b36',
  base01: '#073642',
  base02: '#586e75',
  base03: '#657b83',
  base04: '#839496',
  base05: '#93a1a1',
  base06: '#eee8d5',
  base07: '#fdf6e3',
  base08: '#dc322f',
  base09: '#cb4b16',
  base0A: '#b58900',
  base0B: '#859900',
  base0C: '#2aa198',
  base0D: '#268bd2',
  base0E: '#6c71c4',
  base0F: '#d33682'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/summerfruit.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'summerfruit',
  author: 'christopher corley (http://cscorley.github.io/)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#B0B0B0',
  base05: '#D0D0D0',
  base06: '#E0E0E0',
  base07: '#FFFFFF',
  base08: '#FF0086',
  base09: '#FD8900',
  base0A: '#ABA800',
  base0B: '#00C918',
  base0C: '#1faaaa',
  base0D: '#3777E6',
  base0E: '#AD00A1',
  base0F: '#cc6633'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/threezerotwofour.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'threezerotwofour',
  author: 'jan t. sott (http://github.com/idleberg)',
  base00: '#090300',
  base01: '#3a3432',
  base02: '#4a4543',
  base03: '#5c5855',
  base04: '#807d7c',
  base05: '#a5a2a2',
  base06: '#d6d5d4',
  base07: '#f7f7f7',
  base08: '#db2d20',
  base09: '#e8bbd0',
  base0A: '#fded02',
  base0B: '#01a252',
  base0C: '#b5e4f4',
  base0D: '#01a0e4',
  base0E: '#a16a94',
  base0F: '#cdab53'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/tomorrow.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'tomorrow',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#cc6666',
  base09: '#de935f',
  base0A: '#f0c674',
  base0B: '#b5bd68',
  base0C: '#8abeb7',
  base0D: '#81a2be',
  base0E: '#b294bb',
  base0F: '#a3685a'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/tube.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'london tube',
  author: 'jan t. sott',
  base00: '#231f20',
  base01: '#1c3f95',
  base02: '#5a5758',
  base03: '#737171',
  base04: '#959ca1',
  base05: '#d9d8d8',
  base06: '#e7e7e8',
  base07: '#ffffff',
  base08: '#ee2e24',
  base09: '#f386a1',
  base0A: '#ffd204',
  base0B: '#00853e',
  base0C: '#85cebc',
  base0D: '#009ddc',
  base0E: '#98005d',
  base0F: '#b06110'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/react/themes/twilight.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = {
  scheme: 'twilight',
  author: 'david hart (http://hart-dev.com)',
  base00: '#1e1e1e',
  base01: '#323537',
  base02: '#464b50',
  base03: '#5f5a60',
  base04: '#838184',
  base05: '#a7a7a7',
  base06: '#c3c3c3',
  base07: '#ffffff',
  base08: '#cf6a4c',
  base09: '#cda869',
  base0A: '#f9ee98',
  base0B: '#8f9d6a',
  base0C: '#afc4db',
  base0D: '#7587a6',
  base0E: '#9b859d',
  base0F: '#9b703f'
};
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/brighten.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (hexColor, lightness) {
  var hex = String(hexColor).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  var lum = lightness || 0;

  var rgb = '#';
  var c = undefined;
  for (var i = 0; i < 3; ++i) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
};

module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/deepEqual.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
function deepEqual(x, y) {
  if (typeof x === 'object' && x !== null && (typeof y === 'object' && y !== null)) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }
    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  } else if (x !== y) {
    return false;
  }
  return true;
}

exports['default'] = deepEqual;
module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/lib/utils/hexToRgb.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports["default"] = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

module.exports = exports["default"];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/index.js":[function(require,module,exports){
var mixin = require('smart-mixin');
var assign = require('object-assign');

var mixinProto = mixin({
  // lifecycle stuff is as you'd expect
  componentDidMount: mixin.MANY,
  componentWillMount: mixin.MANY,
  componentWillReceiveProps: mixin.MANY,
  shouldComponentUpdate: mixin.ONCE,
  componentWillUpdate: mixin.MANY,
  componentDidUpdate: mixin.MANY,
  componentWillUnmount: mixin.MANY,
  getChildContext: mixin.MANY_MERGED
});

function setDefaultProps(reactMixin) {
  var getDefaultProps = reactMixin.getDefaultProps;

  if (getDefaultProps) {
    reactMixin.defaultProps = getDefaultProps();

    delete reactMixin.getDefaultProps;
  }
}

function setInitialState(reactMixin) {
  var getInitialState = reactMixin.getInitialState;
  var componentWillMount = reactMixin.componentWillMount;

  function applyInitialState(instance) {
    var state = instance.state || {};
    assign(state, getInitialState.call(instance));
    instance.state = state;
  }

  if (getInitialState) {
    if (!componentWillMount) {
      reactMixin.componentWillMount = function() {
        applyInitialState(this);
      };
    } else {
      reactMixin.componentWillMount = function() {
        applyInitialState(this);
        componentWillMount.call(this);
      };
    }

    delete reactMixin.getInitialState;
  }
}

function mixinClass(reactClass, reactMixin) {
  setDefaultProps(reactMixin);
  setInitialState(reactMixin);

  var prototypeMethods = {};
  var staticProps = {};

  Object.keys(reactMixin).forEach(function(key) {
    if (key === 'mixins') {
      return; // Handled below to ensure proper order regardless of property iteration order
    }
    if (key === 'statics') {
      return; // gets special handling
    } else if (typeof reactMixin[key] === 'function') {
      prototypeMethods[key] = reactMixin[key];
    } else {
      staticProps[key] = reactMixin[key];
    }
  });

  mixinProto(reactClass.prototype, prototypeMethods);

  var mergePropTypes = function(left, right, key) {
    if (!left) return right;
    if (!right) return left;

    var result = {};
    Object.keys(left).forEach(function(leftKey) {
      if (!right[leftKey]) {
        result[leftKey] = left[leftKey];
      }
    });

    Object.keys(right).forEach(function(rightKey) {
      if (left[rightKey]) {
        result[rightKey] = function checkBothContextTypes() {
          return right[rightKey].apply(this, arguments) && left[rightKey].apply(this, arguments);
        };
      } else {
        result[rightKey] = right[rightKey];
      }
    });

    return result;
  };

  mixin({
    childContextTypes: mergePropTypes,
    contextTypes: mergePropTypes,
    propTypes: mixin.MANY_MERGED_LOOSE,
    defaultProps: mixin.MANY_MERGED_LOOSE
  })(reactClass, staticProps);

  // statics is a special case because it merges directly onto the class
  if (reactMixin.statics) {
    Object.getOwnPropertyNames(reactMixin.statics).forEach(function(key) {
      var left = reactClass[key];
      var right = reactMixin.statics[key];

      if (left !== undefined && right !== undefined) {
        throw new TypeError('Cannot mixin statics because statics.' + key + ' and Component.' + key + ' are defined.');
      }

      reactClass[key] = left !== undefined ? left : right;
    });
  }

  // If more mixins are defined, they need to run. This emulate's react's behavior.
  // See behavior in code at:
  // https://github.com/facebook/react/blob/41aa3496aa632634f650edbe10d617799922d265/src/isomorphic/classic/class/ReactClass.js#L468
  // Note the .reverse(). In React, a fresh constructor is created, then all mixins are mixed in recursively,
  // then the actual spec is mixed in last.
  //
  // With ES6 classes, the properties are already there, so smart-mixin mixes functions (a, b) -> b()a(), which is
  // the opposite of how React does it. If we reverse this array, we basically do the whole logic in reverse,
  // which makes the result the same. See the test for more.
  // See also:
  // https://github.com/facebook/react/blob/41aa3496aa632634f650edbe10d617799922d265/src/isomorphic/classic/class/ReactClass.js#L853
  if (reactMixin.mixins) {
    reactMixin.mixins.reverse().forEach(mixinClass.bind(null, reactClass));
  }

  return reactClass;
}

module.exports = (function() {
  var reactMixin = mixinProto;

  reactMixin.onClass = function(reactClass, mixin) {
    return mixinClass(reactClass, mixin);
  };

  reactMixin.decorate = function(mixin) {
    return function(reactClass) {
      return reactMixin.onClass(reactClass, mixin);
    };
  };

  return reactMixin;
})();

},{"object-assign":"object-assign","smart-mixin":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/node_modules/smart-mixin/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-mixin/node_modules/smart-mixin/index.js":[function(require,module,exports){
var objToStr = function(x){ return Object.prototype.toString.call(x); };

var thrower = function(error){
    throw error;
};

var mixins = module.exports = function makeMixinFunction(rules, _opts){
    var opts = _opts || {};
    if (!opts.unknownFunction) {
        opts.unknownFunction = mixins.ONCE;
    }

    if (!opts.nonFunctionProperty) {
        opts.nonFunctionProperty = function(left, right, key){
            if (left !== undefined && right !== undefined) {
                var getTypeName = function(obj){
                    if (obj && obj.constructor && obj.constructor.name) {
                        return obj.constructor.name;
                    }
                    else {
                        return objToStr(obj).slice(8, -1);
                    }
                };
                throw new TypeError('Cannot mixin key ' + key + ' because it is provided by multiple sources, '
                        + 'and the types are ' + getTypeName(left) + ' and ' + getTypeName(right));
            }
            return left === undefined ? right : left;
        };
    }

    function setNonEnumerable(target, key, value){
        if (key in target){
            target[key] = value;
        }
        else {
            Object.defineProperty(target, key, {
                value: value,
                writable: true,
                configurable: true
            });
        }
    }

    return function applyMixin(source, mixin){
        Object.keys(mixin).forEach(function(key){
            var left = source[key], right = mixin[key], rule = rules[key];

            // this is just a weird case where the key was defined, but there's no value
            // behave like the key wasn't defined
            if (left === undefined && right === undefined) return;

            var wrapIfFunction = function(thing){
                return typeof thing !== "function" ? thing
                : function(){
                    return thing.call(this, arguments);
                };
            };

            // do we have a rule for this key?
            if (rule) {
                // may throw here
                var fn = rule(left, right, key);
                setNonEnumerable(source, key, wrapIfFunction(fn));
                return;
            }

            var leftIsFn = typeof left === "function";
            var rightIsFn = typeof right === "function";

            // check to see if they're some combination of functions or undefined
            // we already know there's no rule, so use the unknown function behavior
            if (leftIsFn && right === undefined
             || rightIsFn && left === undefined
             || leftIsFn && rightIsFn) {
                // may throw, the default is ONCE so if both are functions
                // the default is to throw
                setNonEnumerable(source, key, wrapIfFunction(opts.unknownFunction(left, right, key)));
                return;
            }

            // we have no rule for them, one may be a function but one or both aren't
            // our default is MANY_MERGED_LOOSE which will merge objects, concat arrays
            // and throw if there's a type mismatch or both are primitives (how do you merge 3, and "foo"?)
            source[key] = opts.nonFunctionProperty(left, right, key);
        });
    };
};

mixins._mergeObjects = function(obj1, obj2) {
    var assertObject = function(obj, obj2){
        var type = objToStr(obj);
        if (type !== '[object Object]') {
            var displayType = obj.constructor ? obj.constructor.name : 'Unknown';
            var displayType2 = obj2.constructor ? obj2.constructor.name : 'Unknown';
            thrower('cannot merge returned value of type ' + displayType + ' with an ' + displayType2);
        }
    };

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        return obj1.concat(obj2);
    }

    assertObject(obj1, obj2);
    assertObject(obj2, obj1);

    var result = {};
    Object.keys(obj1).forEach(function(k){
        if (Object.prototype.hasOwnProperty.call(obj2, k)) {
            thrower('cannot merge returns because both have the ' + JSON.stringify(k) + ' key');
        }
        result[k] = obj1[k];
    });

    Object.keys(obj2).forEach(function(k){
        // we can skip the conflict check because all conflicts would already be found
        result[k] = obj2[k];
    });
    return result;

}

// define our built-in mixin types
mixins.ONCE = function(left, right, key){
    if (left && right) {
        throw new TypeError('Cannot mixin ' + key + ' because it has a unique constraint.');
    }

    var fn = left || right;

    return function(args){
        return fn.apply(this, args);
    };
};

mixins.MANY = function(left, right, key){
    return function(args){
        if (right) right.apply(this, args);
        return left ? left.apply(this, args) : undefined;
    };
};

mixins.MANY_MERGED_LOOSE = function(left, right, key) {
    if(left && right) {
        return mixins._mergeObjects(left, right);
    }

    return left || right;
}

mixins.MANY_MERGED = function(left, right, key){
    return function(args){
        var res1 = right && right.apply(this, args);
        var res2 = left && left.apply(this, args);
        if (res1 && res2) {
            return mixins._mergeObjects(res1, res2)
        }
        return res2 || res1;
    };
};


mixins.REDUCE_LEFT = function(_left, _right, key){
    var left = _left || function(x){ return x };
    var right = _right || function(x){ return x };
    return function(args){
        return right.call(this, left.apply(this, args));
    };
};

mixins.REDUCE_RIGHT = function(_left, _right, key){
    var left = _left || function(x){ return x };
    var right = _right || function(x){ return x };
    return function(args){
        return left.call(this, right.apply(this, args));
    };
};


},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/components/createAll.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = createAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createProvider = require('./createProvider');

var _createProvider2 = _interopRequireDefault(_createProvider);

var _createConnect = require('./createConnect');

var _createConnect2 = _interopRequireDefault(_createConnect);

function createAll(React) {
  var Provider = _createProvider2['default'](React);
  var connect = _createConnect2['default'](React);

  return { Provider: Provider, connect: connect };
}

module.exports = exports['default'];
},{"./createConnect":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/components/createConnect.js","./createProvider":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/components/createProvider.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/components/createConnect.js":[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createConnect;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilsCreateStoreShape = require('../utils/createStoreShape');

var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

var _utilsShallowEqualScalar = require('../utils/shallowEqualScalar');

var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);

var _utilsShallowEqual = require('../utils/shallowEqual');

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _utilsIsPlainObject = require('../utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var _utilsWrapActionCreators = require('../utils/wrapActionCreators');

var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var defaultMapStateToProps = function defaultMapStateToProps() {
  return {};
};
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
  return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
  return _extends({}, parentProps, stateProps, dispatchProps);
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function areStatePropsEqual(stateProps, nextStateProps) {
  var isRefEqual = stateProps === nextStateProps;
  if (isRefEqual || typeof stateProps !== 'object' || typeof nextStateProps !== 'object') {
    return isRefEqual;
  }

  return _utilsShallowEqual2['default'](stateProps, nextStateProps);
}

// Helps track hot reloading.
var nextVersion = 0;

function createConnect(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var shouldSubscribe = Boolean(mapStateToProps);
    var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
    var finalMapDispatchToProps = _utilsIsPlainObject2['default'](mapDispatchToProps) ? _utilsWrapActionCreators2['default'](mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
    var finalMergeProps = mergeProps || defaultMergeProps;

    // Helps track hot reloading.
    var version = nextVersion++;

    return function (DecoratedComponent) {
      return (function (_Component) {
        _inherits(Connect, _Component);

        Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
          return this.isSubscribed() && !areStatePropsEqual(this.state.stateProps, nextState.stateProps) || !_utilsShallowEqualScalar2['default'](this.props, nextProps);
        };

        _createClass(Connect, null, [{
          key: 'displayName',
          value: 'Connect(' + getDisplayName(DecoratedComponent) + ')',
          enumerable: true
        }, {
          key: 'DecoratedComponent',
          value: DecoratedComponent,
          enumerable: true
        }, {
          key: 'contextTypes',
          value: {
            store: storeShape.isRequired
          },
          enumerable: true
        }]);

        function Connect(props, context) {
          _classCallCheck(this, Connect);

          _Component.call(this, props, context);
          this.version = version;
          this.setUnderlyingRef = this.setUnderlyingRef.bind(this);
          this.state = _extends({}, this.mapState(props, context), this.mapDispatch(context));
        }

        Connect.prototype.isSubscribed = function isSubscribed() {
          return typeof this.unsubscribe === 'function';
        };

        Connect.prototype.trySubscribe = function trySubscribe() {
          if (shouldSubscribe && !this.unsubscribe) {
            this.unsubscribe = this.context.store.subscribe(this.handleChange.bind(this));
            this.handleChange();
          }
        };

        Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
          if (this.isSubscribed()) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        };

        Connect.prototype.componentDidMount = function componentDidMount() {
          this.trySubscribe();
        };

        Connect.prototype.componentWillUpdate = function componentWillUpdate() {
          if (process.env.NODE_ENV !== 'production') {
            if (this.version === version) {
              return;
            }

            // We are hot reloading!
            this.version = version;

            // Update the state and bindings.
            this.trySubscribe();
            this.setState(_extends({}, this.mapState(), this.mapDispatch()));
          }
        };

        Connect.prototype.componentWillUnmount = function componentWillUnmount() {
          this.tryUnsubscribe();
        };

        Connect.prototype.handleChange = function handleChange() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

          var nextState = this.mapState(props, this.context);
          if (!areStatePropsEqual(this.state.stateProps, nextState.stateProps)) {
            this.setState(nextState);
          }
        };

        Connect.prototype.mapState = function mapState() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

          var state = context.store.getState();
          var stateProps = finalMapStateToProps(state);

          _invariant2['default'](_utilsIsPlainObject2['default'](stateProps), '`mapStateToProps` must return an object. Instead received %s.', stateProps);

          return { stateProps: stateProps };
        };

        Connect.prototype.mapDispatch = function mapDispatch() {
          var context = arguments.length <= 0 || arguments[0] === undefined ? this.context : arguments[0];
          var dispatch = context.store.dispatch;

          var dispatchProps = finalMapDispatchToProps(dispatch);

          _invariant2['default'](_utilsIsPlainObject2['default'](dispatchProps), '`mapDispatchToProps` must return an object. Instead received %s.', dispatchProps);

          return { dispatchProps: dispatchProps };
        };

        Connect.prototype.merge = function merge() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
          var state = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];
          var stateProps = state.stateProps;
          var dispatchProps = state.dispatchProps;

          var merged = finalMergeProps(stateProps, dispatchProps, props);

          _invariant2['default'](_utilsIsPlainObject2['default'](merged), '`mergeProps` must return an object. Instead received %s.', merged);

          return merged;
        };

        Connect.prototype.getUnderlyingRef = function getUnderlyingRef() {
          return this.underlyingRef;
        };

        Connect.prototype.setUnderlyingRef = function setUnderlyingRef(instance) {
          this.underlyingRef = instance;
        };

        Connect.prototype.render = function render() {
          return React.createElement(DecoratedComponent, _extends({ ref: this.setUnderlyingRef
          }, this.merge()));
        };

        return Connect;
      })(Component);
    };
  };
}

module.exports = exports['default'];
}).call(this,require('_process'))

},{"../utils/createStoreShape":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/createStoreShape.js","../utils/isPlainObject":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/isPlainObject.js","../utils/shallowEqual":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/shallowEqual.js","../utils/shallowEqualScalar":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/shallowEqualScalar.js","../utils/wrapActionCreators":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/wrapActionCreators.js","_process":"/Users/Ben/Projects/Ruby/doublejump/node_modules/browserify/node_modules/process/browser.js","invariant":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/node_modules/invariant/browser.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/components/createProvider.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createProvider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilsCreateStoreShape = require('../utils/createStoreShape');

var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

function createProvider(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

  return (function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      return { store: this.state.store };
    };

    _createClass(Provider, null, [{
      key: 'childContextTypes',
      value: {
        store: storeShape.isRequired
      },
      enumerable: true
    }, {
      key: 'propTypes',
      value: {
        children: PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      _Component.call(this, props, context);
      this.state = { store: props.store };
    }

    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var store = this.state.store;
      var nextStore = nextProps.store;

      if (store !== nextStore) {
        var nextReducer = nextStore.getReducer();
        store.replaceReducer(nextReducer);
      }
    };

    Provider.prototype.render = function render() {
      var children = this.props.children;

      return children();
    };

    return Provider;
  })(Component);
}

module.exports = exports['default'];
},{"../utils/createStoreShape":"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/createStoreShape.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/createStoreShape.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = createStoreShape;

function createStoreShape(PropTypes) {
  return PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  });
}

module.exports = exports["default"];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/isPlainObject.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = isPlainObject;
var fnToString = function fnToString(fn) {
  return Function.prototype.toString.call(fn);
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

  if (proto === null) {
    return true;
  }

  var constructor = proto.constructor;

  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
}

module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/shallowEqual.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = shallowEqual;

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = exports["default"];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/shallowEqualScalar.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = shallowEqualScalar;

function shallowEqualScalar(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i])) {
      return false;
    }

    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];

    if (valA !== valB || typeof valA === 'object' || typeof valB === 'object') {
      return false;
    }
  }

  return true;
}

module.exports = exports['default'];
},{}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/lib/utils/wrapActionCreators.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = wrapActionCreators;

var _redux = require('redux');

function wrapActionCreators(actionCreators) {
  return function (dispatch) {
    return _redux.bindActionCreators(actionCreators, dispatch);
  };
}

module.exports = exports['default'];
},{"redux":"redux"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/redux-devtools/node_modules/react-redux/node_modules/invariant/browser.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":"/Users/Ben/Projects/Ruby/doublejump/node_modules/browserify/node_modules/process/browser.js"}]},{},["/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/app.jsx"])


//# sourceMappingURL=app_bundle.js.map