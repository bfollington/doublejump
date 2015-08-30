
export const REQUEST_CONTENTS = "REQUEST_CONTENTS";
export function requestContents(moduleId) {
    return {type: REQUEST_CONTENTS, moduleId};
}

export const RECEIVE_CONTENTS = "RECEIVE_CONTENTS";
export function receiveContents(moduleId, data) {
    return {type: RECEIVE_CONTENTS, moduleId, data};
}

export const REQUEST_CONTENT = "REQUEST_CONTENT";
export function requestContent(id) {
    return {type: REQUEST_CONTENT, id};
}

export const RECEIVE_CONTENT = "RECEIVE_CONTENT";
export function receiveContent(id, data) {
    return {type: RECEIVE_CONTENT, id, data};
}

export function fetchContents(moduleId) {

    return new Promise( (resolve, reject) => {
        window.store.dispatch(requestContents(moduleId));

        $.get(`/api/contents/${moduleId}`, {}, data => {
            window.store.dispatch(receiveContents(moduleId, data));
            resolve();
        });
    });
}
