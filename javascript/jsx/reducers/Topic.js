import {
    REQUEST_TOPICS, RECEIVE_TOPICS
} from "actions/Topic";

import clone from "./Util.js";

function topics(state = {
    areFetching: false,
    didInvalidate: false,
    items: {}
}, action) {
    switch (action.type) {

    case REQUEST_TOPICS:
        return clone(state, {
            areFetching: true,
            didInvalidate: false
        });

    case RECEIVE_TOPICS:
        var topicsDict = {};
        action.data.topics.forEach(topic => {
            topicsDict[topic["_id"]["$oid"]] = topic;
        });

        return clone(state, {
            areFetching: false,
            didInvalidate: false,
            items: topicsDict
        });

    default:
        return state;

    }
}

export default topics;
