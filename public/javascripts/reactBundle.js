(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./javascript/jsx/app.jsx":[function(require,module,exports){
/** @jsx React.DOM */"use strict";

var Router = require("./router.jsx").Router;

window.app = { domRoot: document.getElementById("content") };

React.initializeTouchEvents(true);

var router = new Router();
router.start();

},{"./router.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/router.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Component.jsx":[function(require,module,exports){
/** @jsx React.DOM */"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
//const React = require("react");

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

},{}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/ProjectStart.react.jsx":[function(require,module,exports){
/** @jsx React.DOM */"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Component = require("../Component.jsx").Component;

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
                    name: "Bob"
                };
            }
        },
        navigate: {
            value: function navigate(e) {
                console.log("Navigated");
                page("/concepts/test");
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

},{"../Component.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Component.jsx","page":"/Users/Ben/Projects/Ruby/doublejump/node_modules/page/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Test.react.jsx":[function(require,module,exports){
/** @jsx React.DOM */"use strict";

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

},{"../Component.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/Component.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectPageController.jsx":[function(require,module,exports){
/** @jsx React.DOM */"use strict";

exports.ProjectPageController = ProjectPageController;
Object.defineProperty(exports, "__esModule", {
    value: true
});

var ProjectStart = require("../components/ProjectStart.react.jsx").ProjectStart;

function ProjectPageController(ctx, next) {
    React.render(React.createElement(ProjectStart, null), window.app.domRoot);
}

},{"../components/ProjectStart.react.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/ProjectStart.react.jsx"}],"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/router.jsx":[function(require,module,exports){
/** @jsx React.DOM */"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var page = _interopRequire(require("page"));

var ProjectPageController = require("./pages/ProjectPageController.jsx").ProjectPageController;

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

},{"./components/Test.react.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/components/Test.react.jsx","./pages/ProjectPageController.jsx":"/Users/Ben/Projects/Ruby/doublejump/javascript/jsx/pages/ProjectPageController.jsx","page":"/Users/Ben/Projects/Ruby/doublejump/node_modules/page/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/page/index.js":[function(require,module,exports){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;

  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {String|Function} path
   * @param {Function} fn...
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(path);
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {String}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {String} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) window.addEventListener('click', onclick, false);
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    window.removeEventListener('click', onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @param {Boolean} dispatch
   * @return {Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {String} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object} [state]
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {String} from - if param 'to' is undefined redirects to 'from'
   * @param {String} [to]
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(to);
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @return {Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Object} ctx
   * @api private
   */

  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */

  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {str} URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @param {String} path
   * @param {Object} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @param {String} path
   * @param {Object} options.
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options.sensitive,
      options.strict);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {String} path
   * @param {Object} params
   * @return {Boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };

  /**
   * Handle "populate" events.
   */

  function onpopstate(e) {
    if (e.state) {
      var path = e.state.path;
      page.replace(path, e.state);
    } else {
      page.show(location.pathname + location.hash, undefined, undefined, false);
    }
  }

  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    var el = e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.getAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // same page
    var orig = path;

    path = path.replace(base, '');
    if (hashbang) path = path.replace('#!', '');



    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

},{"path-to-regexp":"/Users/Ben/Projects/Ruby/doublejump/node_modules/page/node_modules/path-to-regexp/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/page/node_modules/path-to-regexp/index.js":[function(require,module,exports){
var isArray = require('isarray');

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)" => [undefined, undefined, undefined, "\d+", undefined]
  '([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?',
  // Match regexp special characters that are always escaped.
  '([.+*?=^!:${}()[\\]|\\/])'
].join('|'), 'g');

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name:      i,
        delimiter: null,
        optional:  false,
        repeat:    false
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}

/**
 * Replace the specific tags with regexp strings.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @return {String}
 */
function replacePath (path, keys) {
  var index = 0;

  function replace (_, escaped, prefix, key, capture, group, suffix, escape) {
    if (escaped) {
      return escaped;
    }

    if (escape) {
      return '\\' + escape;
    }

    var repeat   = suffix === '+' || suffix === '*';
    var optional = suffix === '?' || suffix === '*';

    keys.push({
      name:      key || index++,
      delimiter: prefix || '/',
      optional:  optional,
      repeat:    repeat
    });

    prefix = prefix ? ('\\' + prefix) : '';
    capture = escapeGroup(capture || group || '[^' + (prefix || '\\/') + ']+?');

    if (repeat) {
      capture = capture + '(?:' + prefix + capture + ')*';
    }

    if (optional) {
      return '(?:' + prefix + '(' + capture + '))?';
    }

    // Basic parameter support.
    return prefix + '(' + capture + ')';
  }

  return path.replace(PATH_REGEXP, replace);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || [];

  if (!isArray(keys)) {
    options = keys;
    keys = [];
  } else if (!options) {
    options = {};
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options);
  }

  if (isArray(path)) {
    return arrayToRegexp(path, keys, options);
  }

  var strict = options.strict;
  var end = options.end !== false;
  var route = replacePath(path, keys);
  var endsWithSlash = path.charAt(path.length - 1) === '/';

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

},{"isarray":"/Users/Ben/Projects/Ruby/doublejump/node_modules/page/node_modules/path-to-regexp/node_modules/isarray/index.js"}],"/Users/Ben/Projects/Ruby/doublejump/node_modules/page/node_modules/path-to-regexp/node_modules/isarray/index.js":[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}]},{},["./javascript/jsx/app.jsx"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9hcHAuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvQ29tcG9uZW50LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvUHJvamVjdFN0YXJ0LnJlYWN0LmpzeCIsIi9Vc2Vycy9CZW4vUHJvamVjdHMvUnVieS9kb3VibGVqdW1wL2phdmFzY3JpcHQvanN4L2NvbXBvbmVudHMvVGVzdC5yZWFjdC5qc3giLCIvVXNlcnMvQmVuL1Byb2plY3RzL1J1YnkvZG91YmxlanVtcC9qYXZhc2NyaXB0L2pzeC9wYWdlcy9Qcm9qZWN0UGFnZUNvbnRyb2xsZXIuanN4IiwiL1VzZXJzL0Jlbi9Qcm9qZWN0cy9SdWJ5L2RvdWJsZWp1bXAvamF2YXNjcmlwdC9qc3gvcm91dGVyLmpzeCIsIm5vZGVfbW9kdWxlcy9wYWdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BhZ2Uvbm9kZV9tb2R1bGVzL3BhdGgtdG8tcmVnZXhwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BhZ2Uvbm9kZV9tb2R1bGVzL3BhdGgtdG8tcmVnZXhwL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7SUNBUSxNQUFNLFdBQU8sY0FBYyxFQUEzQixNQUFNOztBQUVkLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOztBQUU3RCxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWxDLElBQUksTUFBTSxH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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2tCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge1JvdXRlcn0gZnJvbSAnLi9yb3V0ZXIuanN4Jztcblxud2luZG93LmFwcCA9IHsgZG9tUm9vdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSB9O1xuXG5SZWFjdC5pbml0aWFsaXplVG91Y2hFdmVudHModHJ1ZSk7XG5cbnZhciByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5yb3V0ZXIuc3RhcnQoKTtcbiIsIi8vY29uc3QgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbmV4cG9ydCBjbGFzcyBNaXhpbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KClcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSlcbiAgICB7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpXG4gICAge1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKVxuICAgIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICAgIHRoaXMubWl4aW5zID0gW107XG4gICAgfVxuXG4gICAgYWRkTWl4aW4obWl4aW4pXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5wdXNoKG1peGluKTtcbiAgICAgICAgbWl4aW4uY29tcG9uZW50ID0gdGhpcztcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5taXhpbnMuZm9yRWFjaCggZnVuY3Rpb24obWl4aW4pIHtcbiAgICAgICAgICAgIG1peGluLmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKVxuICAgIHtcbiAgICAgICAgdGhpcy5taXhpbnMuZm9yRWFjaCggZnVuY3Rpb24obWl4aW4pIHtcbiAgICAgICAgICAgIG1peGluLmNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpXG4gICAge1xuICAgICAgICB0aGlzLm1peGlucy5mb3JFYWNoKCBmdW5jdGlvbihtaXhpbikge1xuICAgICAgICAgICAgbWl4aW4uY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5taXhpbnMuZm9yRWFjaCggZnVuY3Rpb24obWl4aW4pIHtcbiAgICAgICAgICAgIG1peGluLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9Db21wb25lbnQuanN4JztcbmltcG9ydCBwYWdlIGZyb20gJ3BhZ2UnO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXJ0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxuICAgIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIH1cblxuICAgIGdldFN0YXRlKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWVsZDogXCJ2YWx1ZVwiLFxuICAgICAgICAgICAgbmFtZTogXCJCb2JcIlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG5hdmlnYXRlKGUpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRlZFwiKTtcbiAgICAgICAgcGFnZShcIi9jb25jZXB0cy90ZXN0XCIpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XG4gICAgICAgICAgICAgICAgPGgyPlN0YXJ0IGEgTmV3IFByb2plY3Q8L2gyPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvY29uY2VwdHMvdGVzdFwiPkdvIHRvIHRlc3Q8L2E+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXBcIiByb2xlPVwiZ3JvdXBcIiBvbkNsaWNrPXt0aGlzLm5hdmlnYXRlLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xpY2sgbWUgdG8gQWRkIERhdGFcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIENsaWNrIG1lIHRvIFJlcGxheSBEYXRhXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBDbGljayBtZSB0byBSZXNldCBEYXRhXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4uL0NvbXBvbmVudC5qc3gnXG5cbmV4cG9ydCBjbGFzcyBUZXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxoMT5UZXN0PC9oMT5cbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtQcm9qZWN0U3RhcnR9IGZyb20gJy4uL2NvbXBvbmVudHMvUHJvamVjdFN0YXJ0LnJlYWN0LmpzeCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBQcm9qZWN0UGFnZUNvbnRyb2xsZXIoY3R4LCBuZXh0KSB7XG4gICAgUmVhY3QucmVuZGVyKDxQcm9qZWN0U3RhcnQgLz4sIHdpbmRvdy5hcHAuZG9tUm9vdCk7XG59XG4iLCJpbXBvcnQgcGFnZSBmcm9tICdwYWdlJztcbmltcG9ydCB7UHJvamVjdFBhZ2VDb250cm9sbGVyfSBmcm9tICcuL3BhZ2VzL1Byb2plY3RQYWdlQ29udHJvbGxlci5qc3gnO1xuaW1wb3J0IHtUZXN0fSBmcm9tICcuL2NvbXBvbmVudHMvVGVzdC5yZWFjdC5qc3gnO1xuXG5cbmNvbnN0IHJlbmRlciA9IChjb21wb25lbnQpID0+IFJlYWN0LnJlbmRlcihcbiAgICBjb21wb25lbnQsXG4gICAgd2luZG93LmFwcC5kb21Sb290XG4pO1xuXG52YXIgYmFzZVJvdXRlID0gXCIvY29uY2VwdHNcIjtcblxudmFyIHJvdXRlcyA9IHt9O1xuXG5yb3V0ZXNbJy8nXSA9IFByb2plY3RQYWdlQ29udHJvbGxlcjtcblxucm91dGVzWycvdGVzdCddID0gZnVuY3Rpb24oKSB7XG4gICAgcmVuZGVyKDxUZXN0IC8+KTtcbn07XG5cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuYmFzZVJvdXRlID0gXCIvY29uY2VwdHNcIjtcbiAgICB9XG5cbiAgICBzdGFydCgpXG4gICAge1xuXG4gICAgICAgIHBhZ2UoJyonLCBmdW5jdGlvbihjdHgsICBuZXh0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmluaXQpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hcHAuZG9tUm9vdC5jbGFzc0xpc3QuYWRkKCd0cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYXBwLmRvbVJvb3QuY2xhc3NMaXN0LnJlbW92ZSgndHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiByb3V0ZXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2UoYmFzZVJvdXRlICsgaSwgcm91dGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhZ2UodGhpcy5iYXNlUm91dGUgKyAnLyonLCBmdW5jdGlvbigpIHtcblxuICAgICAgICB9KTtcblxuICAgICAgICBwYWdlKCk7XG4gICAgfVxufVxuIiwiICAvKiBnbG9iYWxzIHJlcXVpcmUsIG1vZHVsZSAqL1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAgICovXG5cbiAgdmFyIHBhdGh0b1JlZ2V4cCA9IHJlcXVpcmUoJ3BhdGgtdG8tcmVnZXhwJyk7XG5cbiAgLyoqXG4gICAqIE1vZHVsZSBleHBvcnRzLlxuICAgKi9cblxuICBtb2R1bGUuZXhwb3J0cyA9IHBhZ2U7XG5cbiAgLyoqXG4gICAqIFRvIHdvcmsgcHJvcGVybHkgd2l0aCB0aGUgVVJMXG4gICAqIGhpc3RvcnkubG9jYXRpb24gZ2VuZXJhdGVkIHBvbHlmaWxsIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZvdGUvSFRNTDUtSGlzdG9yeS1BUElcbiAgICovXG5cbiAgdmFyIGxvY2F0aW9uID0gKCd1bmRlZmluZWQnICE9PSB0eXBlb2Ygd2luZG93KSAmJiAod2luZG93Lmhpc3RvcnkubG9jYXRpb24gfHwgd2luZG93LmxvY2F0aW9uKTtcblxuICAvKipcbiAgICogUGVyZm9ybSBpbml0aWFsIGRpc3BhdGNoLlxuICAgKi9cblxuICB2YXIgZGlzcGF0Y2ggPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZWNvZGUgVVJMIGNvbXBvbmVudHMgKHF1ZXJ5IHN0cmluZywgcGF0aG5hbWUsIGhhc2gpLlxuICAgKiBBY2NvbW1vZGF0ZXMgYm90aCByZWd1bGFyIHBlcmNlbnQgZW5jb2RpbmcgYW5kIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBmb3JtYXQuXG4gICAqL1xuICB2YXIgZGVjb2RlVVJMQ29tcG9uZW50cyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEJhc2UgcGF0aC5cbiAgICovXG5cbiAgdmFyIGJhc2UgPSAnJztcblxuICAvKipcbiAgICogUnVubmluZyBmbGFnLlxuICAgKi9cblxuICB2YXIgcnVubmluZztcblxuICAvKipcbiAgICogSGFzaEJhbmcgb3B0aW9uXG4gICAqL1xuXG4gIHZhciBoYXNoYmFuZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBjb250ZXh0LCBmb3IgY2FwdHVyaW5nXG4gICAqIHBhZ2UgZXhpdCBldmVudHMuXG4gICAqL1xuXG4gIHZhciBwcmV2Q29udGV4dDtcblxuICAvKipcbiAgICogUmVnaXN0ZXIgYHBhdGhgIHdpdGggY2FsbGJhY2sgYGZuKClgLFxuICAgKiBvciByb3V0ZSBgcGF0aGAsIG9yIHJlZGlyZWN0aW9uLFxuICAgKiBvciBgcGFnZS5zdGFydCgpYC5cbiAgICpcbiAgICogICBwYWdlKGZuKTtcbiAgICogICBwYWdlKCcqJywgZm4pO1xuICAgKiAgIHBhZ2UoJy91c2VyLzppZCcsIGxvYWQsIHVzZXIpO1xuICAgKiAgIHBhZ2UoJy91c2VyLycgKyB1c2VyLmlkLCB7IHNvbWU6ICd0aGluZycgfSk7XG4gICAqICAgcGFnZSgnL3VzZXIvJyArIHVzZXIuaWQpO1xuICAgKiAgIHBhZ2UoJy9mcm9tJywgJy90bycpXG4gICAqICAgcGFnZSgpO1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gcGF0aFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbi4uLlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBwYWdlKHBhdGgsIGZuKSB7XG4gICAgLy8gPGNhbGxiYWNrPlxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgcGF0aCkge1xuICAgICAgcmV0dXJuIHBhZ2UoJyonLCBwYXRoKTtcbiAgICB9XG5cbiAgICAvLyByb3V0ZSA8cGF0aD4gdG8gPGNhbGxiYWNrIC4uLj5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZuKSB7XG4gICAgICB2YXIgcm91dGUgPSBuZXcgUm91dGUocGF0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBwYWdlLmNhbGxiYWNrcy5wdXNoKHJvdXRlLm1pZGRsZXdhcmUoYXJndW1lbnRzW2ldKSk7XG4gICAgICB9XG4gICAgICAvLyBzaG93IDxwYXRoPiB3aXRoIFtzdGF0ZV1cbiAgICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgcGF0aCkge1xuICAgICAgcGFnZVsnc3RyaW5nJyA9PT0gdHlwZW9mIGZuID8gJ3JlZGlyZWN0JyA6ICdzaG93J10ocGF0aCwgZm4pO1xuICAgICAgLy8gc3RhcnQgW29wdGlvbnNdXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2Uuc3RhcnQocGF0aCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9ucy5cbiAgICovXG5cbiAgcGFnZS5jYWxsYmFja3MgPSBbXTtcbiAgcGFnZS5leGl0cyA9IFtdO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhdGggYmVpbmcgcHJvY2Vzc2VkXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBwYWdlLmN1cnJlbnQgPSAnJztcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHBhZ2VzIG5hdmlnYXRlZCB0by5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICpcbiAgICogICAgIHBhZ2UubGVuID09IDA7XG4gICAqICAgICBwYWdlKCcvbG9naW4nKTtcbiAgICogICAgIHBhZ2UubGVuID09IDE7XG4gICAqL1xuXG4gIHBhZ2UubGVuID0gMDtcblxuICAvKipcbiAgICogR2V0IG9yIHNldCBiYXNlcGF0aCB0byBgcGF0aGAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHBhZ2UuYmFzZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZiAoMCA9PT0gYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGJhc2U7XG4gICAgYmFzZSA9IHBhdGg7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJpbmQgd2l0aCB0aGUgZ2l2ZW4gYG9wdGlvbnNgLlxuICAgKlxuICAgKiBPcHRpb25zOlxuICAgKlxuICAgKiAgICAtIGBjbGlja2AgYmluZCB0byBjbGljayBldmVudHMgW3RydWVdXG4gICAqICAgIC0gYHBvcHN0YXRlYCBiaW5kIHRvIHBvcHN0YXRlIFt0cnVlXVxuICAgKiAgICAtIGBkaXNwYXRjaGAgcGVyZm9ybSBpbml0aWFsIGRpc3BhdGNoIFt0cnVlXVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBwYWdlLnN0YXJ0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChydW5uaW5nKSByZXR1cm47XG4gICAgcnVubmluZyA9IHRydWU7XG4gICAgaWYgKGZhbHNlID09PSBvcHRpb25zLmRpc3BhdGNoKSBkaXNwYXRjaCA9IGZhbHNlO1xuICAgIGlmIChmYWxzZSA9PT0gb3B0aW9ucy5kZWNvZGVVUkxDb21wb25lbnRzKSBkZWNvZGVVUkxDb21wb25lbnRzID0gZmFsc2U7XG4gICAgaWYgKGZhbHNlICE9PSBvcHRpb25zLnBvcHN0YXRlKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBvbnBvcHN0YXRlLCBmYWxzZSk7XG4gICAgaWYgKGZhbHNlICE9PSBvcHRpb25zLmNsaWNrKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbmNsaWNrLCBmYWxzZSk7XG4gICAgaWYgKHRydWUgPT09IG9wdGlvbnMuaGFzaGJhbmcpIGhhc2hiYW5nID0gdHJ1ZTtcbiAgICBpZiAoIWRpc3BhdGNoKSByZXR1cm47XG4gICAgdmFyIHVybCA9IChoYXNoYmFuZyAmJiB+bG9jYXRpb24uaGFzaC5pbmRleE9mKCcjIScpKSA/IGxvY2F0aW9uLmhhc2guc3Vic3RyKDIpICsgbG9jYXRpb24uc2VhcmNoIDogbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggKyBsb2NhdGlvbi5oYXNoO1xuICAgIHBhZ2UucmVwbGFjZSh1cmwsIG51bGwsIHRydWUsIGRpc3BhdGNoKTtcbiAgfTtcblxuICAvKipcbiAgICogVW5iaW5kIGNsaWNrIGFuZCBwb3BzdGF0ZSBldmVudCBoYW5kbGVycy5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgcGFnZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFydW5uaW5nKSByZXR1cm47XG4gICAgcGFnZS5jdXJyZW50ID0gJyc7XG4gICAgcGFnZS5sZW4gPSAwO1xuICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbmNsaWNrLCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgb25wb3BzdGF0ZSwgZmFsc2UpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTaG93IGBwYXRoYCB3aXRoIG9wdGlvbmFsIGBzdGF0ZWAgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBkaXNwYXRjaFxuICAgKiBAcmV0dXJuIHtDb250ZXh0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBwYWdlLnNob3cgPSBmdW5jdGlvbihwYXRoLCBzdGF0ZSwgZGlzcGF0Y2gsIHB1c2gpIHtcbiAgICB2YXIgY3R4ID0gbmV3IENvbnRleHQocGF0aCwgc3RhdGUpO1xuICAgIHBhZ2UuY3VycmVudCA9IGN0eC5wYXRoO1xuICAgIGlmIChmYWxzZSAhPT0gZGlzcGF0Y2gpIHBhZ2UuZGlzcGF0Y2goY3R4KTtcbiAgICBpZiAoZmFsc2UgIT09IGN0eC5oYW5kbGVkICYmIGZhbHNlICE9PSBwdXNoKSBjdHgucHVzaFN0YXRlKCk7XG4gICAgcmV0dXJuIGN0eDtcbiAgfTtcblxuICAvKipcbiAgICogR29lcyBiYWNrIGluIHRoZSBoaXN0b3J5XG4gICAqIEJhY2sgc2hvdWxkIGFsd2F5cyBsZXQgdGhlIGN1cnJlbnQgcm91dGUgcHVzaCBzdGF0ZSBhbmQgdGhlbiBnbyBiYWNrLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCAtIGZhbGxiYWNrIHBhdGggdG8gZ28gYmFjayBpZiBubyBtb3JlIGhpc3RvcnkgZXhpc3RzLCBpZiB1bmRlZmluZWQgZGVmYXVsdHMgdG8gcGFnZS5iYXNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGVdXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHBhZ2UuYmFjayA9IGZ1bmN0aW9uKHBhdGgsIHN0YXRlKSB7XG4gICAgaWYgKHBhZ2UubGVuID4gMCkge1xuICAgICAgLy8gdGhpcyBtYXkgbmVlZCBtb3JlIHRlc3RpbmcgdG8gc2VlIGlmIGFsbCBicm93c2Vyc1xuICAgICAgLy8gd2FpdCBmb3IgdGhlIG5leHQgdGljayB0byBnbyBiYWNrIGluIGhpc3RvcnlcbiAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgICAgcGFnZS5sZW4tLTtcbiAgICB9IGVsc2UgaWYgKHBhdGgpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhZ2Uuc2hvdyhwYXRoLCBzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9ZWxzZXtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhZ2Uuc2hvdyhiYXNlLCBzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cblxuICAvKipcbiAgICogUmVnaXN0ZXIgcm91dGUgdG8gcmVkaXJlY3QgZnJvbSBvbmUgcGF0aCB0byBvdGhlclxuICAgKiBvciBqdXN0IHJlZGlyZWN0IHRvIGFub3RoZXIgcm91dGVcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGZyb20gLSBpZiBwYXJhbSAndG8nIGlzIHVuZGVmaW5lZCByZWRpcmVjdHMgdG8gJ2Zyb20nXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdG9dXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBwYWdlLnJlZGlyZWN0ID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgICAvLyBEZWZpbmUgcm91dGUgZnJvbSBhIHBhdGggdG8gYW5vdGhlclxuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGZyb20gJiYgJ3N0cmluZycgPT09IHR5cGVvZiB0bykge1xuICAgICAgcGFnZShmcm9tLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcGFnZS5yZXBsYWNlKHRvKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXYWl0IGZvciB0aGUgcHVzaCBzdGF0ZSBhbmQgcmVwbGFjZSBpdCB3aXRoIGFub3RoZXJcbiAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBmcm9tICYmICd1bmRlZmluZWQnID09PSB0eXBlb2YgdG8pIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhZ2UucmVwbGFjZShmcm9tKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVwbGFjZSBgcGF0aGAgd2l0aCBvcHRpb25hbCBgc3RhdGVgIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEByZXR1cm4ge0NvbnRleHR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG5cbiAgcGFnZS5yZXBsYWNlID0gZnVuY3Rpb24ocGF0aCwgc3RhdGUsIGluaXQsIGRpc3BhdGNoKSB7XG4gICAgdmFyIGN0eCA9IG5ldyBDb250ZXh0KHBhdGgsIHN0YXRlKTtcbiAgICBwYWdlLmN1cnJlbnQgPSBjdHgucGF0aDtcbiAgICBjdHguaW5pdCA9IGluaXQ7XG4gICAgY3R4LnNhdmUoKTsgLy8gc2F2ZSBiZWZvcmUgZGlzcGF0Y2hpbmcsIHdoaWNoIG1heSByZWRpcmVjdFxuICAgIGlmIChmYWxzZSAhPT0gZGlzcGF0Y2gpIHBhZ2UuZGlzcGF0Y2goY3R4KTtcbiAgICByZXR1cm4gY3R4O1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCB0aGUgZ2l2ZW4gYGN0eGAuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHBhZ2UuZGlzcGF0Y2ggPSBmdW5jdGlvbihjdHgpIHtcbiAgICB2YXIgcHJldiA9IHByZXZDb250ZXh0LFxuICAgICAgaSA9IDAsXG4gICAgICBqID0gMDtcblxuICAgIHByZXZDb250ZXh0ID0gY3R4O1xuXG4gICAgZnVuY3Rpb24gbmV4dEV4aXQoKSB7XG4gICAgICB2YXIgZm4gPSBwYWdlLmV4aXRzW2orK107XG4gICAgICBpZiAoIWZuKSByZXR1cm4gbmV4dEVudGVyKCk7XG4gICAgICBmbihwcmV2LCBuZXh0RXhpdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV4dEVudGVyKCkge1xuICAgICAgdmFyIGZuID0gcGFnZS5jYWxsYmFja3NbaSsrXTtcblxuICAgICAgaWYgKGN0eC5wYXRoICE9PSBwYWdlLmN1cnJlbnQpIHtcbiAgICAgICAgY3R4LmhhbmRsZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFmbikgcmV0dXJuIHVuaGFuZGxlZChjdHgpO1xuICAgICAgZm4oY3R4LCBuZXh0RW50ZXIpO1xuICAgIH1cblxuICAgIGlmIChwcmV2KSB7XG4gICAgICBuZXh0RXhpdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50ZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFVuaGFuZGxlZCBgY3R4YC4gV2hlbiBpdCdzIG5vdCB0aGUgaW5pdGlhbFxuICAgKiBwb3BzdGF0ZSB0aGVuIHJlZGlyZWN0LiBJZiB5b3Ugd2lzaCB0byBoYW5kbGVcbiAgICogNDA0cyBvbiB5b3VyIG93biB1c2UgYHBhZ2UoJyonLCBjYWxsYmFjaylgLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRleHR9IGN0eFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gdW5oYW5kbGVkKGN0eCkge1xuICAgIGlmIChjdHguaGFuZGxlZCkgcmV0dXJuO1xuICAgIHZhciBjdXJyZW50O1xuXG4gICAgaWYgKGhhc2hiYW5nKSB7XG4gICAgICBjdXJyZW50ID0gYmFzZSArIGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIyEnLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnQgPSBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudCA9PT0gY3R4LmNhbm9uaWNhbFBhdGgpIHJldHVybjtcbiAgICBwYWdlLnN0b3AoKTtcbiAgICBjdHguaGFuZGxlZCA9IGZhbHNlO1xuICAgIGxvY2F0aW9uLmhyZWYgPSBjdHguY2Fub25pY2FsUGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBleGl0IHJvdXRlIG9uIGBwYXRoYCB3aXRoXG4gICAqIGNhbGxiYWNrIGBmbigpYCwgd2hpY2ggd2lsbCBiZSBjYWxsZWRcbiAgICogb24gdGhlIHByZXZpb3VzIGNvbnRleHQgd2hlbiBhIG5ld1xuICAgKiBwYWdlIGlzIHZpc2l0ZWQuXG4gICAqL1xuICBwYWdlLmV4aXQgPSBmdW5jdGlvbihwYXRoLCBmbikge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHBhZ2UuZXhpdCgnKicsIHBhdGgpO1xuICAgIH1cblxuICAgIHZhciByb3V0ZSA9IG5ldyBSb3V0ZShwYXRoKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgcGFnZS5leGl0cy5wdXNoKHJvdXRlLm1pZGRsZXdhcmUoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgVVJMIGVuY29kaW5nIGZyb20gdGhlIGdpdmVuIGBzdHJgLlxuICAgKiBBY2NvbW1vZGF0ZXMgd2hpdGVzcGFjZSBpbiBib3RoIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgKiBhbmQgcmVndWxhciBwZXJjZW50LWVuY29kZWQgZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJ9IFVSTCBjb21wb25lbnQgdG8gZGVjb2RlXG4gICAqL1xuICBmdW5jdGlvbiBkZWNvZGVVUkxFbmNvZGVkVVJJQ29tcG9uZW50KHZhbCkge1xuICAgIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykgeyByZXR1cm4gdmFsOyB9XG4gICAgcmV0dXJuIGRlY29kZVVSTENvbXBvbmVudHMgPyBkZWNvZGVVUklDb21wb25lbnQodmFsLnJlcGxhY2UoL1xcKy9nLCAnICcpKSA6IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGEgbmV3IFwicmVxdWVzdFwiIGBDb250ZXh0YFxuICAgKiB3aXRoIHRoZSBnaXZlbiBgcGF0aGAgYW5kIG9wdGlvbmFsIGluaXRpYWwgYHN0YXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIENvbnRleHQocGF0aCwgc3RhdGUpIHtcbiAgICBpZiAoJy8nID09PSBwYXRoWzBdICYmIDAgIT09IHBhdGguaW5kZXhPZihiYXNlKSkgcGF0aCA9IGJhc2UgKyAoaGFzaGJhbmcgPyAnIyEnIDogJycpICsgcGF0aDtcbiAgICB2YXIgaSA9IHBhdGguaW5kZXhPZignPycpO1xuXG4gICAgdGhpcy5jYW5vbmljYWxQYXRoID0gcGF0aDtcbiAgICB0aGlzLnBhdGggPSBwYXRoLnJlcGxhY2UoYmFzZSwgJycpIHx8ICcvJztcbiAgICBpZiAoaGFzaGJhbmcpIHRoaXMucGF0aCA9IHRoaXMucGF0aC5yZXBsYWNlKCcjIScsICcnKSB8fCAnLyc7XG5cbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQudGl0bGU7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlIHx8IHt9O1xuICAgIHRoaXMuc3RhdGUucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5xdWVyeXN0cmluZyA9IH5pID8gZGVjb2RlVVJMRW5jb2RlZFVSSUNvbXBvbmVudChwYXRoLnNsaWNlKGkgKyAxKSkgOiAnJztcbiAgICB0aGlzLnBhdGhuYW1lID0gZGVjb2RlVVJMRW5jb2RlZFVSSUNvbXBvbmVudCh+aSA/IHBhdGguc2xpY2UoMCwgaSkgOiBwYXRoKTtcbiAgICB0aGlzLnBhcmFtcyA9IHt9O1xuXG4gICAgLy8gZnJhZ21lbnRcbiAgICB0aGlzLmhhc2ggPSAnJztcbiAgICBpZiAoIWhhc2hiYW5nKSB7XG4gICAgICBpZiAoIX50aGlzLnBhdGguaW5kZXhPZignIycpKSByZXR1cm47XG4gICAgICB2YXIgcGFydHMgPSB0aGlzLnBhdGguc3BsaXQoJyMnKTtcbiAgICAgIHRoaXMucGF0aCA9IHBhcnRzWzBdO1xuICAgICAgdGhpcy5oYXNoID0gZGVjb2RlVVJMRW5jb2RlZFVSSUNvbXBvbmVudChwYXJ0c1sxXSkgfHwgJyc7XG4gICAgICB0aGlzLnF1ZXJ5c3RyaW5nID0gdGhpcy5xdWVyeXN0cmluZy5zcGxpdCgnIycpWzBdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvc2UgYENvbnRleHRgLlxuICAgKi9cblxuICBwYWdlLkNvbnRleHQgPSBDb250ZXh0O1xuXG4gIC8qKlxuICAgKiBQdXNoIHN0YXRlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgcGFnZS5sZW4rKztcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSh0aGlzLnN0YXRlLCB0aGlzLnRpdGxlLCBoYXNoYmFuZyAmJiB0aGlzLnBhdGggIT09ICcvJyA/ICcjIScgKyB0aGlzLnBhdGggOiB0aGlzLmNhbm9uaWNhbFBhdGgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBjb250ZXh0IHN0YXRlLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBDb250ZXh0LnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUodGhpcy5zdGF0ZSwgdGhpcy50aXRsZSwgaGFzaGJhbmcgJiYgdGhpcy5wYXRoICE9PSAnLycgPyAnIyEnICsgdGhpcy5wYXRoIDogdGhpcy5jYW5vbmljYWxQYXRoKTtcbiAgfTtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBgUm91dGVgIHdpdGggdGhlIGdpdmVuIEhUVFAgYHBhdGhgLFxuICAgKiBhbmQgYW4gYXJyYXkgb2YgYGNhbGxiYWNrc2AgYW5kIGBvcHRpb25zYC5cbiAgICpcbiAgICogT3B0aW9uczpcbiAgICpcbiAgICogICAtIGBzZW5zaXRpdmVgICAgIGVuYWJsZSBjYXNlLXNlbnNpdGl2ZSByb3V0ZXNcbiAgICogICAtIGBzdHJpY3RgICAgICAgIGVuYWJsZSBzdHJpY3QgbWF0Y2hpbmcgZm9yIHRyYWlsaW5nIHNsYXNoZXNcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBSb3V0ZShwYXRoLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5wYXRoID0gKHBhdGggPT09ICcqJykgPyAnKC4qKScgOiBwYXRoO1xuICAgIHRoaXMubWV0aG9kID0gJ0dFVCc7XG4gICAgdGhpcy5yZWdleHAgPSBwYXRodG9SZWdleHAodGhpcy5wYXRoLFxuICAgICAgdGhpcy5rZXlzID0gW10sXG4gICAgICBvcHRpb25zLnNlbnNpdGl2ZSxcbiAgICAgIG9wdGlvbnMuc3RyaWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvc2UgYFJvdXRlYC5cbiAgICovXG5cbiAgcGFnZS5Sb3V0ZSA9IFJvdXRlO1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gcm91dGUgbWlkZGxld2FyZSB3aXRoXG4gICAqIHRoZSBnaXZlbiBjYWxsYmFjayBgZm4oKWAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBSb3V0ZS5wcm90b3R5cGUubWlkZGxld2FyZSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbihjdHgsIG5leHQpIHtcbiAgICAgIGlmIChzZWxmLm1hdGNoKGN0eC5wYXRoLCBjdHgucGFyYW1zKSkgcmV0dXJuIGZuKGN0eCwgbmV4dCk7XG4gICAgICBuZXh0KCk7XG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhpcyByb3V0ZSBtYXRjaGVzIGBwYXRoYCwgaWYgc29cbiAgICogcG9wdWxhdGUgYHBhcmFtc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFJvdXRlLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKHBhdGgsIHBhcmFtcykge1xuICAgIHZhciBrZXlzID0gdGhpcy5rZXlzLFxuICAgICAgcXNJbmRleCA9IHBhdGguaW5kZXhPZignPycpLFxuICAgICAgcGF0aG5hbWUgPSB+cXNJbmRleCA/IHBhdGguc2xpY2UoMCwgcXNJbmRleCkgOiBwYXRoLFxuICAgICAgbSA9IHRoaXMucmVnZXhwLmV4ZWMoZGVjb2RlVVJJQ29tcG9uZW50KHBhdGhuYW1lKSk7XG5cbiAgICBpZiAoIW0pIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBtLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpIC0gMV07XG4gICAgICB2YXIgdmFsID0gZGVjb2RlVVJMRW5jb2RlZFVSSUNvbXBvbmVudChtW2ldKTtcbiAgICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCB8fCAhKGhhc093blByb3BlcnR5LmNhbGwocGFyYW1zLCBrZXkubmFtZSkpKSB7XG4gICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBcInBvcHVsYXRlXCIgZXZlbnRzLlxuICAgKi9cblxuICBmdW5jdGlvbiBvbnBvcHN0YXRlKGUpIHtcbiAgICBpZiAoZS5zdGF0ZSkge1xuICAgICAgdmFyIHBhdGggPSBlLnN0YXRlLnBhdGg7XG4gICAgICBwYWdlLnJlcGxhY2UocGF0aCwgZS5zdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2Uuc2hvdyhsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLmhhc2gsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBcImNsaWNrXCIgZXZlbnRzLlxuICAgKi9cblxuICBmdW5jdGlvbiBvbmNsaWNrKGUpIHtcblxuICAgIGlmICgxICE9PSB3aGljaChlKSkgcmV0dXJuO1xuXG4gICAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkgcmV0dXJuO1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcblxuXG5cbiAgICAvLyBlbnN1cmUgbGlua1xuICAgIHZhciBlbCA9IGUudGFyZ2V0O1xuICAgIHdoaWxlIChlbCAmJiAnQScgIT09IGVsLm5vZGVOYW1lKSBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgaWYgKCFlbCB8fCAnQScgIT09IGVsLm5vZGVOYW1lKSByZXR1cm47XG5cblxuXG4gICAgLy8gSWdub3JlIGlmIHRhZyBoYXNcbiAgICAvLyAxLiBcImRvd25sb2FkXCIgYXR0cmlidXRlXG4gICAgLy8gMi4gcmVsPVwiZXh0ZXJuYWxcIiBhdHRyaWJ1dGVcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8IGVsLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCcpIHJldHVybjtcblxuICAgIC8vIGVuc3VyZSBub24taGFzaCBmb3IgdGhlIHNhbWUgcGF0aFxuICAgIHZhciBsaW5rID0gZWwuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgaWYgKCFoYXNoYmFuZyAmJiBlbC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgKGVsLmhhc2ggfHwgJyMnID09PSBsaW5rKSkgcmV0dXJuO1xuXG5cblxuICAgIC8vIENoZWNrIGZvciBtYWlsdG86IGluIHRoZSBocmVmXG4gICAgaWYgKGxpbmsgJiYgbGluay5pbmRleE9mKCdtYWlsdG86JykgPiAtMSkgcmV0dXJuO1xuXG4gICAgLy8gY2hlY2sgdGFyZ2V0XG4gICAgaWYgKGVsLnRhcmdldCkgcmV0dXJuO1xuXG4gICAgLy8geC1vcmlnaW5cbiAgICBpZiAoIXNhbWVPcmlnaW4oZWwuaHJlZikpIHJldHVybjtcblxuXG5cbiAgICAvLyByZWJ1aWxkIHBhdGhcbiAgICB2YXIgcGF0aCA9IGVsLnBhdGhuYW1lICsgZWwuc2VhcmNoICsgKGVsLmhhc2ggfHwgJycpO1xuXG4gICAgLy8gc2FtZSBwYWdlXG4gICAgdmFyIG9yaWcgPSBwYXRoO1xuXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZShiYXNlLCAnJyk7XG4gICAgaWYgKGhhc2hiYW5nKSBwYXRoID0gcGF0aC5yZXBsYWNlKCcjIScsICcnKTtcblxuXG5cbiAgICBpZiAoYmFzZSAmJiBvcmlnID09PSBwYXRoKSByZXR1cm47XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcGFnZS5zaG93KG9yaWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGJ1dHRvbi5cbiAgICovXG5cbiAgZnVuY3Rpb24gd2hpY2goZSkge1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICByZXR1cm4gbnVsbCA9PT0gZS53aGljaCA/IGUuYnV0dG9uIDogZS53aGljaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBgaHJlZmAgaXMgdGhlIHNhbWUgb3JpZ2luLlxuICAgKi9cblxuICBmdW5jdGlvbiBzYW1lT3JpZ2luKGhyZWYpIHtcbiAgICB2YXIgb3JpZ2luID0gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdG5hbWU7XG4gICAgaWYgKGxvY2F0aW9uLnBvcnQpIG9yaWdpbiArPSAnOicgKyBsb2NhdGlvbi5wb3J0O1xuICAgIHJldHVybiAoaHJlZiAmJiAoMCA9PT0gaHJlZi5pbmRleE9mKG9yaWdpbikpKTtcbiAgfVxuXG4gIHBhZ2Uuc2FtZU9yaWdpbiA9IHNhbWVPcmlnaW47XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcblxuLyoqXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcGF0aFRvUmVnZXhwO1xuXG4vKipcbiAqIFRoZSBtYWluIHBhdGggbWF0Y2hpbmcgcmVnZXhwIHV0aWxpdHkuXG4gKlxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xudmFyIFBBVEhfUkVHRVhQID0gbmV3IFJlZ0V4cChbXG4gIC8vIE1hdGNoIGVzY2FwZWQgY2hhcmFjdGVycyB0aGF0IHdvdWxkIG90aGVyd2lzZSBhcHBlYXIgaW4gZnV0dXJlIG1hdGNoZXMuXG4gIC8vIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIGVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgdGhhdCB3b24ndCB0cmFuc2Zvcm0uXG4gICcoXFxcXFxcXFwuKScsXG4gIC8vIE1hdGNoIEV4cHJlc3Mtc3R5bGUgcGFyYW1ldGVycyBhbmQgdW4tbmFtZWQgcGFyYW1ldGVycyB3aXRoIGEgcHJlZml4XG4gIC8vIGFuZCBvcHRpb25hbCBzdWZmaXhlcy4gTWF0Y2hlcyBhcHBlYXIgYXM6XG4gIC8vXG4gIC8vIFwiLzp0ZXN0KFxcXFxkKyk/XCIgPT4gW1wiL1wiLCBcInRlc3RcIiwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgXCI/XCJdXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCJcXGQrXCIsIHVuZGVmaW5lZF1cbiAgJyhbXFxcXC8uXSk/KD86XFxcXDooXFxcXHcrKSg/OlxcXFwoKCg/OlxcXFxcXFxcLnxbXildKSopXFxcXCkpP3xcXFxcKCgoPzpcXFxcXFxcXC58W14pXSkqKVxcXFwpKShbKyo/XSk/JyxcbiAgLy8gTWF0Y2ggcmVnZXhwIHNwZWNpYWwgY2hhcmFjdGVycyB0aGF0IGFyZSBhbHdheXMgZXNjYXBlZC5cbiAgJyhbLisqPz1eIToke30oKVtcXFxcXXxcXFxcL10pJ1xuXS5qb2luKCd8JyksICdnJyk7XG5cbi8qKlxuICogRXNjYXBlIHRoZSBjYXB0dXJpbmcgZ3JvdXAgYnkgZXNjYXBpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCBtZWFuaW5nLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gZ3JvdXBcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZXNjYXBlR3JvdXAgKGdyb3VwKSB7XG4gIHJldHVybiBncm91cC5yZXBsYWNlKC8oWz0hOiRcXC8oKV0pL2csICdcXFxcJDEnKTtcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAge1JlZ0V4cH0gcmVcbiAqIEBwYXJhbSAge0FycmF5fSAga2V5c1xuICogQHJldHVybiB7UmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5cztcbiAgcmV0dXJuIHJlO1xufVxuXG4vKipcbiAqIEdldCB0aGUgZmxhZ3MgZm9yIGEgcmVnZXhwIGZyb20gdGhlIG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZsYWdzIChvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zLnNlbnNpdGl2ZSA/ICcnIDogJ2knO1xufVxuXG4vKipcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHtSZWdFeHB9IHBhdGhcbiAqIEBwYXJhbSAge0FycmF5fSAga2V5c1xuICogQHJldHVybiB7UmVnRXhwfVxuICovXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cCAocGF0aCwga2V5cykge1xuICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxuICB2YXIgZ3JvdXBzID0gcGF0aC5zb3VyY2UubWF0Y2goL1xcKCg/IVxcPykvZyk7XG5cbiAgaWYgKGdyb3Vwcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXlzLnB1c2goe1xuICAgICAgICBuYW1lOiAgICAgIGksXG4gICAgICAgIGRlbGltaXRlcjogbnVsbCxcbiAgICAgICAgb3B0aW9uYWw6ICBmYWxzZSxcbiAgICAgICAgcmVwZWF0OiAgICBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocGF0aCwga2V5cyk7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGFuIGFycmF5IGludG8gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7QXJyYXl9ICBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVnRXhwfVxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBwYXJ0cyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgIHBhcnRzLnB1c2gocGF0aFRvUmVnZXhwKHBhdGhbaV0sIGtleXMsIG9wdGlvbnMpLnNvdXJjZSk7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgnKD86JyArIHBhcnRzLmpvaW4oJ3wnKSArICcpJywgZmxhZ3Mob3B0aW9ucykpO1xuICByZXR1cm4gYXR0YWNoS2V5cyhyZWdleHAsIGtleXMpO1xufVxuXG4vKipcbiAqIFJlcGxhY2UgdGhlIHNwZWNpZmljIHRhZ3Mgd2l0aCByZWdleHAgc3RyaW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSAge0FycmF5fSAga2V5c1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiByZXBsYWNlUGF0aCAocGF0aCwga2V5cykge1xuICB2YXIgaW5kZXggPSAwO1xuXG4gIGZ1bmN0aW9uIHJlcGxhY2UgKF8sIGVzY2FwZWQsIHByZWZpeCwga2V5LCBjYXB0dXJlLCBncm91cCwgc3VmZml4LCBlc2NhcGUpIHtcbiAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgcmV0dXJuIGVzY2FwZWQ7XG4gICAgfVxuXG4gICAgaWYgKGVzY2FwZSkge1xuICAgICAgcmV0dXJuICdcXFxcJyArIGVzY2FwZTtcbiAgICB9XG5cbiAgICB2YXIgcmVwZWF0ICAgPSBzdWZmaXggPT09ICcrJyB8fCBzdWZmaXggPT09ICcqJztcbiAgICB2YXIgb3B0aW9uYWwgPSBzdWZmaXggPT09ICc/JyB8fCBzdWZmaXggPT09ICcqJztcblxuICAgIGtleXMucHVzaCh7XG4gICAgICBuYW1lOiAgICAgIGtleSB8fCBpbmRleCsrLFxuICAgICAgZGVsaW1pdGVyOiBwcmVmaXggfHwgJy8nLFxuICAgICAgb3B0aW9uYWw6ICBvcHRpb25hbCxcbiAgICAgIHJlcGVhdDogICAgcmVwZWF0XG4gICAgfSk7XG5cbiAgICBwcmVmaXggPSBwcmVmaXggPyAoJ1xcXFwnICsgcHJlZml4KSA6ICcnO1xuICAgIGNhcHR1cmUgPSBlc2NhcGVHcm91cChjYXB0dXJlIHx8IGdyb3VwIHx8ICdbXicgKyAocHJlZml4IHx8ICdcXFxcLycpICsgJ10rPycpO1xuXG4gICAgaWYgKHJlcGVhdCkge1xuICAgICAgY2FwdHVyZSA9IGNhcHR1cmUgKyAnKD86JyArIHByZWZpeCArIGNhcHR1cmUgKyAnKSonO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgcmV0dXJuICcoPzonICsgcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpKT8nO1xuICAgIH1cblxuICAgIC8vIEJhc2ljIHBhcmFtZXRlciBzdXBwb3J0LlxuICAgIHJldHVybiBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJyknO1xuICB9XG5cbiAgcmV0dXJuIHBhdGgucmVwbGFjZShQQVRIX1JFR0VYUCwgcmVwbGFjZSk7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIHRoZSBnaXZlbiBwYXRoIHN0cmluZywgcmV0dXJuaW5nIGEgcmVndWxhciBleHByZXNzaW9uLlxuICpcbiAqIEFuIGVtcHR5IGFycmF5IGNhbiBiZSBwYXNzZWQgaW4gZm9yIHRoZSBrZXlzLCB3aGljaCB3aWxsIGhvbGQgdGhlXG4gKiBwbGFjZWhvbGRlciBrZXkgZGVzY3JpcHRpb25zLiBGb3IgZXhhbXBsZSwgdXNpbmcgYC91c2VyLzppZGAsIGBrZXlzYCB3aWxsXG4gKiBjb250YWluIGBbeyBuYW1lOiAnaWQnLCBkZWxpbWl0ZXI6ICcvJywgb3B0aW9uYWw6IGZhbHNlLCByZXBlYXQ6IGZhbHNlIH1dYC5cbiAqXG4gKiBAcGFyYW0gIHsoU3RyaW5nfFJlZ0V4cHxBcnJheSl9IHBhdGhcbiAqIEBwYXJhbSAge0FycmF5fSAgICAgICAgICAgICAgICAgW2tleXNdXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgIFtvcHRpb25zXVxuICogQHJldHVybiB7UmVnRXhwfVxuICovXG5mdW5jdGlvbiBwYXRoVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcbiAga2V5cyA9IGtleXMgfHwgW107XG5cbiAgaWYgKCFpc0FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IGtleXM7XG4gICAga2V5cyA9IFtdO1xuICB9IGVsc2UgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gcmVnZXhwVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucyk7XG4gIH1cblxuICBpZiAoaXNBcnJheShwYXRoKSkge1xuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0O1xuICB2YXIgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlO1xuICB2YXIgcm91dGUgPSByZXBsYWNlUGF0aChwYXRoLCBrZXlzKTtcbiAgdmFyIGVuZHNXaXRoU2xhc2ggPSBwYXRoLmNoYXJBdChwYXRoLmxlbmd0aCAtIDEpID09PSAnLyc7XG5cbiAgLy8gSW4gbm9uLXN0cmljdCBtb2RlIHdlIGFsbG93IGEgc2xhc2ggYXQgdGhlIGVuZCBvZiBtYXRjaC4gSWYgdGhlIHBhdGggdG9cbiAgLy8gbWF0Y2ggYWxyZWFkeSBlbmRzIHdpdGggYSBzbGFzaCwgd2UgcmVtb3ZlIGl0IGZvciBjb25zaXN0ZW5jeS4gVGhlIHNsYXNoXG4gIC8vIGlzIHZhbGlkIGF0IHRoZSBlbmQgb2YgYSBwYXRoIG1hdGNoLCBub3QgaW4gdGhlIG1pZGRsZS4gVGhpcyBpcyBpbXBvcnRhbnRcbiAgLy8gaW4gbm9uLWVuZGluZyBtb2RlLCB3aGVyZSBcIi90ZXN0L1wiIHNob3VsZG4ndCBtYXRjaCBcIi90ZXN0Ly9yb3V0ZVwiLlxuICBpZiAoIXN0cmljdCkge1xuICAgIHJvdXRlID0gKGVuZHNXaXRoU2xhc2ggPyByb3V0ZS5zbGljZSgwLCAtMikgOiByb3V0ZSkgKyAnKD86XFxcXC8oPz0kKSk/JztcbiAgfVxuXG4gIGlmIChlbmQpIHtcbiAgICByb3V0ZSArPSAnJCc7XG4gIH0gZWxzZSB7XG4gICAgLy8gSW4gbm9uLWVuZGluZyBtb2RlLCB3ZSBuZWVkIHRoZSBjYXB0dXJpbmcgZ3JvdXBzIHRvIG1hdGNoIGFzIG11Y2ggYXNcbiAgICAvLyBwb3NzaWJsZSBieSB1c2luZyBhIHBvc2l0aXZlIGxvb2thaGVhZCB0byB0aGUgZW5kIG9yIG5leHQgcGF0aCBzZWdtZW50LlxuICAgIHJvdXRlICs9IHN0cmljdCAmJiBlbmRzV2l0aFNsYXNoID8gJycgOiAnKD89XFxcXC98JCknO1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMobmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpLCBrZXlzKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiJdfQ==
