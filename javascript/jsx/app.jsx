import {Router} from './router.jsx';
import {ModuleStore} from 'stores/ModuleStore';
import {TopicStore} from 'stores/TopicStore';
import {ProjectStore} from 'stores/ProjectStore';
var React = require("react");

import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import project from 'reducers/Project';
import module from 'reducers/Module';
import topic from 'reducers/Topic';

window.app = { domRoot: document.getElementById('mountpoint') };

window.flux = {
    stores: {
        "module": new ModuleStore(),
        "topic": new TopicStore(),
        "project": new ProjectStore()
    }
};

const finalCreateStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    createStore
);

window.store = finalCreateStore(combineReducers({
    project,
    topic,
    module
}));

$.ajaxPrefilter(function(options, originalOptions, xhr) {
    if ( !options.crossDomain ) {
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    }
});

React.initializeTouchEvents(true);

var router = new Router();
router.start();
