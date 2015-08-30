import {
    GET_NOTIFICATION, CLEAR_NOTIFICATION
} from "actions/Notification";

import clone from "./Util.js";

function notifications(state = {
    currentNotification: null
}, action) {
    switch (action.type) {

    case GET_NOTIFICATION:
        return clone(state, {
            currentNotification: action.data
        });

    case CLEAR_NOTIFICATION:
        return clone(state, {
            currentNotification: null
        });

    default:
        return state;

    }
}

export default notifications;
