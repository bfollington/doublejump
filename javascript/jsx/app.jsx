import {Router} from './router.jsx';

window.app = { domRoot: document.getElementById('content') };

React.initializeTouchEvents(true);

var router = new Router();
router.start();
