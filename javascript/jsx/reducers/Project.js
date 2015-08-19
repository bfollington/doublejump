import {
    REQUEST_PROJECT, RECEIVE_PROJECT,
    RECEIVE_METADATA, UPDATE_METADATA,
    REQUEST_NEXT_MODULES, RECEIVE_NEXT_MODULES
} from "actions/Project";

import clone from "./Util.js";

function projectData(
    state = {
        isFetching: false,
        isFetchingNextModules: false,
        didInvalidate: false,
        data: {},
        metadata: {},
        nextModules: []
    },
    action) {

    switch (action.type) {

    case REQUEST_PROJECT:
        return clone(state, {
            isFetching: true,
            didInvalidate: false
        });

    case RECEIVE_PROJECT:
        return clone(state, {
            data: action.data
        });

    case RECEIVE_METADATA:
        return clone(state, {
            isFetching: false,
            didInvalidate: false,
            metadata: action.metadata
        });

    case UPDATE_METADATA:
        return clone(state, {
            metadata: action.metadata
        });

    case REQUEST_NEXT_MODULES:
        return clone(state, {
            isFetchingNextModules: true
        });

    case RECEIVE_NEXT_MODULES:
        return clone(state, {
            nextModules: action.next,
            isFetchingNextModules: false
        });

    default:
        return state;

    }

}

function project(state = {}, action) {
    switch (action.type) {

    case REQUEST_PROJECT:
    case RECEIVE_PROJECT:
    case RECEIVE_METADATA:
    case UPDATE_METADATA:
        return clone(state, {
            [action.id]: projectData(state[action.id], action)
        });

    case REQUEST_NEXT_MODULES:
    case RECEIVE_NEXT_MODULES:
        return clone(state, {
            [action.project]: projectData(state[action.project], action)
        });

    default:
        return state;

    }
}

export default project;
