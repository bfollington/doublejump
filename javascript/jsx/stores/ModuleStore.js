import {Store} from 'stores/Store';

var actions = {
    "addModule": "onAddModule",
    "updateModule": "onUpdateModule",
};

var modules = {};

export class ModuleStore extends Store {

    constructor() {
        super(actions);
    }

    onAddModule(data) {
        console.log("Add module", data);
        modules.push(data);
    }

    onUpdateModule(data) {
        modules[data.id] = data;
    }

    get(id, callback) {

        if (modules[id])
        {
            callback(modules[id]);
            return;
        }

        $.get(`/concepts/concept/${id}`, function(data) {
            modules[id] = data;
            callback(data);
        });
    }

    save(id, callback) {
        $.post(`/concepts/make`, modules[id], callback);
    }
}
