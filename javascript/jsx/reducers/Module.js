import {
    REQUEST_MODULE, RECEIVE_MODULE,
    REQUEST_MODULES, RECEIVE_MODULES,
    receiveModule
} from "actions/Module";

import clone from "./Util.js";

function moduleData(
    state = {
        isFetching: false,
        isFetchingNextModules: false,
        didInvalidate: false,
        data: {},
        contents: [],
        topics: []
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
            data: action.data.learning_module,
            contents: action.data.contents,            //TODO: make a contents store and reference by id instead
            topics: action.data.learning_module.topic_ids.map(id => id.$oid)
        });



    default:
        return state;

    }

}

function module(state = {
    areFetching: false,
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
                modules[module._id.$oid],
                receiveModule(
                    module._id.$oid,
                    { learning_module: module }
                )
            );

            modules[module._id.$oid] = test;

        });

        return clone(state, {
            items: clone(state.items, modules)
        });


    case REQUEST_MODULE:
    case RECEIVE_MODULE:
        return clone(state, {
            items: {
                [action.id]: moduleData(state[action.id], action)
            }
        });

    default:
        return state;

    }
}

export default module;
