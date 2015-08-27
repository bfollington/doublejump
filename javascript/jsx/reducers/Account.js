import {
    REQUEST_ACCOUNT, RECEIVE_ACCOUNT,
} from "actions/Account";

import clone from "./Util.js";

function accountData(
    state = {
        isFetching: false,
        data: {}
    },
    action) {

    switch (action.type) {

    case REQUEST_ACCOUNT:
        return clone(state, {
            isFetching: true
        });

    case RECEIVE_ACCOUNT:
        return clone(state, {
            data: action.data,
            isFetching: false
        });

    default:
        return state;
    }

}

function account(state = {
    currentAccount: null
}, action) {
    switch (action.type) {

    case REQUEST_ACCOUNT:
    case RECEIVE_ACCOUNT:
        return clone(state, {
            currentAccount: accountData(state.currentAccount, action)
        });

    default:
        return state;

    }
}

export default account;
