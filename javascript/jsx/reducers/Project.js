import {
    REQUEST_PROJECT, RECEIVE_PROJECT,
    REQUEST_PROJECTS, RECEIVE_PROJECTS,
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
            data: clone(state.data, {
                metadata: action.metadata
            })
        });

    case UPDATE_METADATA:
        return clone(state, {
            data: clone(state.data, {
                metadata: action.metadata
            })
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

function project(state = {
    areFetching: false,
    didInvalidate: false,
    items: {}
}, action) {
    switch (action.type) {

    case REQUEST_PROJECT:
    case RECEIVE_PROJECT:
    case RECEIVE_METADATA:
    case UPDATE_METADATA:
        return clone(state, {
            items: clone(state.items, {
                [action.id]: projectData(state.items[action.id], action)
            })
        });

    case REQUEST_NEXT_MODULES:
    case RECEIVE_NEXT_MODULES:
        return clone(state, {
            items: clone(state.items, {
                [action.project]: projectData(state.items[action.project], action)
            })
        });

    case REQUEST_PROJECTS:
        return clone(state, {
            areFetching: true,
            didInvalidate: false
        });

    case RECEIVE_PROJECTS:
        var projectsDict = {};
        action.data.forEach(project => {
            projectsDict[project["slug"]] = project;
        });

        return clone(state, {
            areFetching: false,
            didInvalidate: false,
            items: clone(state.items, projectsDict)
        });

    default:
        return state;

    }
}

export default project;
