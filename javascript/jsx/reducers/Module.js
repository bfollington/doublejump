import {
    REQUEST_MODULE, RECEIVE_MODULE,
    REQUEST_MODULES, RECEIVE_MODULES,
    UPDATE_MODULE,
    receiveModule
} from "actions/Module";

import clone from "./Util.js";

function moduleData(
    state = {
        isFetching: false,
        isFetchingNextModules: false,
        didInvalidate: false,
        data: {}
    },
    action) {

    switch (action.type) {

    case REQUEST_MODULE:
        return clone(state, {
            isFetching: true,
            didInvalidate: false
        });

    case RECEIVE_MODULE:

        return clone(state, {
            isFetching: false,
            didInvalidate: false,
            data: action.data
        });



    default:
        return state;

    }

}

function module(state = {
    areFetching: false,
    areUpdating: false,
    items: {}
}, action) {
    switch (action.type) {

    case REQUEST_MODULES:
        return clone(state, {
            areFetching: true
        });

    case RECEIVE_MODULES:
        var modules = {};

        action.data.forEach( module => {

            var test = moduleData(
                modules[module.id],
                receiveModule(module.id, module)
            );

            modules[module.id] = test;

        });

        return clone(state, {
            items: clone(state.items, modules)
        });


    case REQUEST_MODULE:
    case RECEIVE_MODULE:

        return clone(state, {
            areUpdating: false,
            items: {
                [action.id]: moduleData(state[action.id], action)
            }
        });


    case UPDATE_MODULE:

        return clone(state, {
            areUpdating: true
        });

    default:
        return state;

    }
}

export default module;
