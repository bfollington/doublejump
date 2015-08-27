import {BasePage} from './BasePage.jsx';
import {ProjectPage} from 'pages/ProjectPage.jsx';
import React from "react";

export function ProjectPageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <ProjectPage context={ctx} project={ctx.params.project} /> }
        </BasePage>,
        window.app.domRoot
    );
}
