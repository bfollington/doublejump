
export const REQUEST_MODULE = "REQUEST_MODULE";
export function requestModule(id) {
    return {type: REQUEST_MODULE, id};
}

export const RECEIVE_MODULE = "RECEIVE_MODULE";
export function receiveModule(id, data) {
    return {type: RECEIVE_MODULE, id, data};
}

export const REQUEST_MODULES = "REQUEST_MODULES";
export function requestModules() {
    return {type: REQUEST_MODULES};
}

export const RECEIVE_MODULES = "RECEIVE_MODULES";
export function receiveModules(data) {
    return {type: RECEIVE_MODULES, data};
}

export const UPDATE_MODULE = "UPDATE_MODULE";
export function updateModule(data) {
    return {type: UPDATE_MODULE, data};
}

export function saveModule(module) {
    return new Promise( (resolve, reject) => {
        window.store.dispatch(updateModule(module));

        $.post(`/api/concept/`, JSON.stringify(module), data => {
            window.store.dispatch(receiveModule(data.id, data));
            resolve(data);
        });
    });
}

export function fetchModule(module) {

    return new Promise( (resolve, reject) => {
        window.store.dispatch(requestModule(module));

        $.get(`/api/concept/${module}`, {}, data => {
            window.store.dispatch(receiveModule(module, data));
            resolve();
        });
    });
}

export function fetchModules() {

    return new Promise( (resolve, reject) => {
        window.store.dispatch(requestModules());

        $.get(`/api/concepts/`, {}, data => {
            window.store.dispatch(receiveModules(data));
            resolve();
        });
    });
}
