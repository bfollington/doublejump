import page from 'page';
import {ProjectPageController} from './pages/ProjectPageController.jsx';
import {Test} from './components/Test.react.jsx';


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

export class Router {
    constructor()
    {
        this.baseRoute = "/concepts";
    }

    start()
    {
        for (var i in routes)
        {
            page(baseRoute + i, routes[i]);
        }

        page(this.baseRoute + '/*', function() {

        });

        page();
    }
}
