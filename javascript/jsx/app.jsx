import {Router} from './router.jsx';
import {ModuleStore} from 'stores/ModuleStore';
var React = require("react");

window.app = { domRoot: document.getElementById('content') };

window.flux = {
    stores: {
        "module": new ModuleStore()
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
