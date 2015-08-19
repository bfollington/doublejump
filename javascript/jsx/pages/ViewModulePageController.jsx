import { Provider } from 'react-redux';
import {ViewModulePage} from './ViewModulePage.jsx';
var React = require("react");

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export function ViewModulePageController(ctx, next) {
    React.render(
        <div>
            <Provider store={window.store}>
                { () => <ViewModulePage store={window.store} context={ctx} project={ctx.params.project} module={ctx.params.module} /> }
            </Provider>
            <DebugPanel top right bottom>
                <DevTools store={window.store} monitor={LogMonitor} />
            </DebugPanel>
        </div>,
        window.app.domRoot
    );
}
