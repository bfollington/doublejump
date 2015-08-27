import {BasePage} from './BasePage.jsx';
import {ModuleBrowserPage} from 'pages/ModuleBrowserPage.jsx';
import React from "react";

export function ModuleBrowserPageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <ModuleBrowserPage context={ctx} project={ctx.params.project} /> }
        </BasePage>,
        window.app.domRoot
    );
}
