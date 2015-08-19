
export const REQUEST_MODULE = "REQUEST_MODULE";
export function requestModule(id) {
    return {type: REQUEST_MODULE, id};
}

export const RECEIVE_MODULE = "RECEIVE_MODULE";
export function receiveModule(id, data) {
    return {type: RECEIVE_MODULE, id, data};
}

export function fetchModule(module) {
    window.store.dispatch(requestModule(module));

    $.get(`/concepts/concept/${module}`, {}, data => {
        window.store.dispatch(receiveModule(module, data));
    });
}
