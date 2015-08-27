import React from "react";
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';

import { HeaderBar } from "components/style/HeaderBar.jsx";
import { Navigation } from "components/style/Navigation.jsx";
import { Footer } from "components/style/Footer.jsx";

export class BasePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <HeaderBar account={false} />
                <div className="gradient-container">
                    <Navigation account={false} />
                </div>

                <div className="main-content">



                    <Provider store={window.store}>
                        { this.props.children }
                    </Provider>
                    {/*<DebugPanel top right bottom>
                        <DevTools store={window.store} monitor={LogMonitor} />
                    </DebugPanel>*/}

                </div>

                <Footer />
            </div>
        );
    }
}
