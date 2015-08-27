import React from "react";
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';

export class BasePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Provider store={window.store}>
                    { this.props.children }
                </Provider>
                {/*<DebugPanel top right bottom>
                    <DevTools store={window.store} monitor={LogMonitor} />
                </DebugPanel>*/}
            </div>
        );
    }
}
