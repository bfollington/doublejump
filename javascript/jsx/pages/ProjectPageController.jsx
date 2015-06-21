import {ProjectStart} from '../components/ProjectStart.react.jsx';
var React = require("react");

export function ProjectPageController(ctx, next) {
    React.render(<ProjectStart context={ctx} />, window.app.domRoot);
}
