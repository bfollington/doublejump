import {BasePage} from './BasePage.jsx';
import {NewProjectPage} from 'pages/NewProjectPage.jsx';
import React from "react";

export function NewProjectPageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <NewProjectPage context={ctx} /> }
        </BasePage>,
        window.app.domRoot
    );
}
