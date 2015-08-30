import {
    GET_NOTIFICATION, CLEAR_NOTIFICATION
} from "actions/Notification";

import clone from "./Util.js";

function notifications(state = {
    currentNotification: {}
}, action) {
    switch (action.type) {

    case GET_NOTIFICATION:
        return clone(state, {
            currentNotification: action.data
        });

    case CLEAR_NOTIFICATION:
        return clone(state, {
            currentNotification: {}
        });

    default:
        return state;

    }
}

export default notifications;
