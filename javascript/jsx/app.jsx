import {Router} from './router.jsx';

window.app = { domRoot: document.getElementById('content') };

$.ajaxPrefilter(function(options, originalOptions, xhr) {
    if ( !options.crossDomain ) {
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    }
});

React.initializeTouchEvents(true);

var router = new Router();
router.start();
