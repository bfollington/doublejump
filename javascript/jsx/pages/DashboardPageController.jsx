import {BasePage} from './BasePage.jsx';
import {DashboardPage} from 'pages/DashboardPage.jsx';
import React from "react";

export function DashboardPageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <DashboardPage context={ctx} /> }
        </BasePage>,
        window.app.domRoot
    );
}
