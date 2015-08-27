
export const REQUEST_PROJECT = "REQUEST_PROJECT";
export function requestProject(id) {
    return {type: REQUEST_PROJECT, id};
}

export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export function receiveProject(id, data) {
    return {type: RECEIVE_PROJECT, id, data};
}

export const REQUEST_PROJECTS = "REQUEST_PROJECTS";
export function requestProjects() {
    return {type: REQUEST_PROJECTS};
}

export const RECEIVE_PROJECTS = "RECEIVE_PROJECTS";
export function receiveProjects(data) {
    return {type: RECEIVE_PROJECTS, data};
}

export const UPDATE_METADATA = "UPDATE_METADATA";
export function updateMetadata(id, metadata) {
    return {type: UPDATE_METADATA, id, metadata};
}

export const REQUEST_NEXT_MODULES = "REQUEST_NEXT_MODULES";
export function requestNextModules(project, module) {
    return {type: REQUEST_NEXT_MODULES, project, module};
}

export const RECEIVE_NEXT_MODULES = "RECEIVE_NEXT_MODULES";
export function receiveNextModules(project, next) {
    return {type: RECEIVE_NEXT_MODULES, project, next};
}

export function fetchProject(project) {

    return new Promise( (resolve, reject) => {
        window.store.dispatch(requestProject(project));

        // TODO, promises and API class?
        $.get(`/api/project/${project}`, {},
            data => {
                window.store.dispatch(receiveProject(project, data.project));
                resolve();
            }
        );
    });
}

export function fetchProjects() {
    return new Promise( (resolve, reject) => {
        window.store.dispatch(requestProjects());

        // TODO, promises and API class?
        $.get(`/api/projects/`, {},
            data => {
                window.store.dispatch(receiveProjects(data.projects));
                resolve();
            }
        );
    });
}

export function fetchNextModules(project, module) {

    return new Promise( (resolve, reject) => {

        window.store.dispatch(requestNextModules(project, module));

        if (module) {
            $.get(`/api/next/${project}/${module}`, {}, data => {
                window.store.dispatch(receiveNextModules(project, data));
                resolve();
            });
        } else {
            $.get(`/api/next/${project}`, {}, data => {
                window.store.dispatch(receiveNextModules(project, data));
                resolve();
            });
        }


    });
}
