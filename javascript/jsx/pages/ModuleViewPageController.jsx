import {ModuleViewPage} from './ModuleViewPage.jsx';
var React = require("react");

export function ModuleViewPageController(ctx, next) {
    React.render(<ModuleViewPage context={ctx} />, window.app.domRoot);
}
