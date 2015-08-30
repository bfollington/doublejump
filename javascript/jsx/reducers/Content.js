import {
    REQUEST_CONTENTS, RECEIVE_CONTENTS,
    REQUEST_CONTENT, RECEIVE_CONTENT,
    receiveContent
} from "actions/Content";

import clone from "./Util.js";

function contentData(
    state = {
        isFetching: false,
        didInvalidate: false,
        data: {}
    },
    action) {

    switch (action.type) {

    case REQUEST_CONTENT:
        return clone(state, {
            isFetching: true,
            didInvalidate: false
        });

    case RECEIVE_CONTENT:

        return clone(state, {
            isFetching: false,
            didInvalidate: false,
            data: action.data
        });


    default:
        return state;

    }

}

function content(state = {
    areFetching: false,
    items: {}
}, action) {
    switch (action.type) {

    case REQUEST_CONTENTS:
        return clone(state, {
            areFetching: true
        });

    case RECEIVE_CONTENTS:
        var contents = {};

        action.data.forEach( content => {

            contents[content.id] = contentData(
                contents[content.id],
                receiveContent(
                    content.id,
                    content
                )
            );

        });

        return clone(state, {
            items: clone(state.items, contents)
        });

    case RECEIVE_CONTENT:
        return clone(state.items, {
            [action.id]: contentData(action.data)
        });

    default:
        return state;

    }
}

export default content;
