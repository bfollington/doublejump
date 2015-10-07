import React from "react";
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';

import page from "page";

import { HeaderBar } from "components/style/HeaderBar.jsx";
import { Navigation } from "components/style/Navigation.jsx";
import { Footer } from "components/style/Footer.jsx";

import { NotificationCenter } from "components/NotificationCenter.jsx";

import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import project from 'reducers/Project';
import module from 'reducers/Module';
import content from 'reducers/Content';
import topic from 'reducers/Topic';
import notification from 'reducers/Notification';
import account from 'reducers/Account';

import {Condition, Case} from "react-case";

const finalCreateStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    createStore
);

import { fetchAccount } from "actions/Account";

export class BasePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account: false,
            ready: false
        };

        this.store = finalCreateStore(combineReducers({
            project,
            topic,
            module,
            content,
            notification,
            account
        }));

        // Globalise for debugging
        window.store = this.store;
    }

    componentDidMount() {
        fetchAccount();

        console.log("BasePage mounted");

        this.store.subscribe( this.onStoreChange.bind(this) );
    }

    onStoreChange() {

        if (this.store.getState().account.currentAccount.data.success === false) {
            // Avoid redirect loop for unauthed users
            if (window.location.pathname != "/login") {
                console.log("Not authed, redirect");
                page("/login");
            } else {
                this.setState({
                    account: false,
                    ready: true
                });
            }
        } else {
            this.setState({
                account: this.store.getState().account.currentAccount.data,
                ready: true
            });
        }
    }

    render() {

        if (!this.state.ready) return null;

        return (
            <div className="container-fluid">
                <HeaderBar account={this.state.account} />
                <div className="gradient-container">
                    { this.state.account ? <Navigation account={this.state.account} /> : null }
                </div>

                <div className="main-content">

                    <NotificationCenter store={this.store} />

                    <Provider store={this.store}>
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
