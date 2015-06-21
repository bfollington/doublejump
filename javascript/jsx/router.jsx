import page from 'page';
import {ProjectPageController} from './pages/ProjectPageController.jsx';
import {ModuleViewPageController} from './pages/ModuleViewPageController.jsx';
import {EditModulePageController} from './pages/EditModulePageController.jsx';
import {Test} from './components/Test.react.jsx';
var React = require("react");


const render = (component) => React.render(
    component,
    window.app.domRoot
);

var baseRoute = "/concepts";

var routes = {};

routes['/'] = ProjectPageController;

routes['/test'] = function() {
    render(<Test />);
};

routes['/project/:project/:module'] = ModuleViewPageController;
routes['/edit'] = EditModulePageController;
routes['/edit/:module'] = EditModulePageController;

export class Router {
    constructor()
    {
        this.baseRoute = "/concepts";
    }

    start()
    {

        page('*', function(ctx,  next) {
            if (ctx.init) {
                next();
            } else {
                window.app.domRoot.classList.add('transition');
                setTimeout(function(){
                    window.app.domRoot.classList.remove('transition');
                    next();
                }, 300);
            }
        });

        for (var i in routes)
        {
            page(baseRoute + i, routes[i]);
        }

        page(this.baseRoute + '/*', function() {

        });

        page();
    }
}
