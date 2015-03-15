import {ProjectStart} from '../components/ProjectStart.react.jsx';

export function ProjectPageController(ctx, next) {
    React.render(<ProjectStart />, window.app.domRoot);
}
