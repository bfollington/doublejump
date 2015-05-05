import {ModuleViewPage} from './ModuleViewPage.jsx';

export function ModuleViewPageController(ctx, next) {
    React.render(<ModuleViewPage context={ctx} />, window.app.domRoot);
}
