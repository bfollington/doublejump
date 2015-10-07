var React = require("react");

import API from "API";
import page from 'page';

import {DashboardPageController} from './pages/DashboardPageController.jsx';
import {EditModulePageController} from './pages/EditModulePageController.jsx';
import {LoginPageController} from './pages/LoginPageController.jsx';
import {RegisterPageController} from './pages/RegisterPageController.jsx';
import {ModuleBrowserPageController} from './pages/ModuleBrowserPageController.jsx';
import {NewProjectPageController} from './pages/NewProjectPageController.jsx';
import {ProjectPageController} from './pages/ProjectPageController.jsx';
import {ViewModulePageController} from './pages/ViewModulePageController.jsx';

const render = (component) => React.render(
    component,
    window.app.domRoot
);

var baseRoute = "";

var routes = {};

function logout(ctx, next) {
    console.log("Logout");
    API.unauth( res => {
        page("/login");
    });
    next();
}

export function getUnauthedLocations() {
    return [
        "/login",
        "/register"
    ];
}

routes['/'] = NewProjectPageController;
routes['/login'] = LoginPageController;
routes['/register'] = RegisterPageController;
routes['/logout'] = logout;
routes['/dashboard'] = DashboardPageController;
routes['/project/:project'] = ModuleBrowserPageController;
routes['/project/:project/:module'] = ViewModulePageController;
// routes['/browse/:project'] = ModuleBrowserPageController;
routes['/edit'] = EditModulePageController;
routes['/edit/:module'] = EditModulePageController;
routes['/view/:module'] = ViewModulePageController;

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
                // window.app.domRoot.classList.add('transition');
                render(<div />);
                // setTimeout(function(){
                //     window.app.domRoot.classList.remove('transition');
                //     next();
                // }, 300);
                next();
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
