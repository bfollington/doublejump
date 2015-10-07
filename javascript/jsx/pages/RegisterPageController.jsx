import {BasePage} from './BasePage.jsx';
import {RegisterPage} from 'pages/RegisterPage.jsx';
import React from "react";

export function RegisterPageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <RegisterPage context={ctx} /> }
        </BasePage>,
        window.app.domRoot
    );
}
