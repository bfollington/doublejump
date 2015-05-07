import {EditModulePage} from './EditModulePage.jsx';

export function EditModulePageController(ctx, next) {
    React.render(<EditModulePage context={ctx} />, window.app.domRoot);
}
