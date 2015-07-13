import {Router} from './router.jsx';
import {ModuleStore} from 'stores/ModuleStore';
import {TopicStore} from 'stores/TopicStore';
import {ProjectStore} from 'stores/ProjectStore';
var React = require("react");

window.app = { domRoot: document.getElementById('content') };

window.flux = {
    stores: {
        "module": new ModuleStore(),
        "topic": new TopicStore(),
        "project": new ProjectStore(),
    }
};

$.ajaxPrefilter(function(options, originalOptions, xhr) {
    if ( !options.crossDomain ) {
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    }
});

React.initializeTouchEvents(true);

var router = new Router();
router.start();
