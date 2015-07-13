import {ViewModulePage} from './ViewModulePage.jsx';
var React = require("react");

export function ViewModulePageController(ctx, next) {
    React.render(<ViewModulePage context={ctx} project={ctx.params.project} module={ctx.params.module} />, window.app.domRoot);
}
