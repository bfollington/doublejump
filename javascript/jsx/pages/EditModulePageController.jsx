import {EditModulePage} from './EditModulePage.jsx';
var React = require("react");

export function EditModulePageController(ctx, next) {
    React.render(<EditModulePage context={ctx} module={ctx.params.module} />, window.app.domRoot);
}
