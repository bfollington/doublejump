import {BasePage} from './BasePage.jsx';
import {LoginPage} from 'pages/LoginPage.jsx';
import React from "react";

export function LoginPageController(ctx, next) {
    React.render(
        <BasePage>
            { () => <LoginPage context={ctx} /> }
        </BasePage>,
        window.app.domRoot
    );
}
