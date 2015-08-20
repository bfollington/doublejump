import {BasePage} from './BasePage.jsx';
import {ViewModulePage} from './ViewModulePage.jsx';
import React from "react";

export function ViewModulePageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <ViewModulePage context={ctx} project={ctx.params.project} module={ctx.params.module} /> }
        </BasePage>,
        window.app.domRoot
    );
}
