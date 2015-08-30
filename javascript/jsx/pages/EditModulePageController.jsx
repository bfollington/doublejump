import {BasePage} from './BasePage.jsx';
import {EditModulePage} from './EditModulePage.jsx';
var React = require("react");

export function EditModulePageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <EditModulePage context={ctx} module={ctx.params.module} /> }
        </BasePage>,
        window.app.domRoot
    );
}
