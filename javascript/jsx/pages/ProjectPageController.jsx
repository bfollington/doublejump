import {BasePage} from './BasePage.jsx';
import {ProjectStartPage} from 'pages/ProjectStartPage.jsx';
import React from "react";

export function ProjectPageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <ProjectStartPage context={ctx} project={ctx.params.project} /> }
        </BasePage>,
        window.app.domRoot
    );
}
