import {Store} from 'stores/Store';

var actions = {
    "addModule": "onAddModule",
    "addComment": "onAddComment",
    "updateModule": "onUpdateModule"
};

var modules = {};
var fetchedAll = false;

export class ModuleStore extends Store {

    constructor() {
        super(actions);
    }

    onAddModule(data) {
        console.log("Add module", data);
        modules.push(data);
    }

    onAddComment(data) {
        var content;

        modules[data.module].contents.forEach(c => {
            if (c._id.$oid == data.id) {
                content = c;
            }
        });

        content.comments = content.comments || [];
        content.comments.push({text: data.text});
        this.save(data.module);
    }

    onUpdateModule(data) {
        console.log("On update module");
        modules[data.id] = data;
    }

    fetchAll(callback) {

        if (!fetchedAll) {
            $.get(`/api/modules/`, function(data) {
                modules = data.modules;
                callback(data);
            });
        } else {
            callback(modules);
        }
    }

    finishedModule(project, module, callback) {
        $.post(`/api/finished_module/`, JSON.stringify({project: project, module: module}), callback);
    }

    get(id, callback) {

        if (modules[id])
        {
            callback(modules[id]);
            return;
        }

        $.get(`/api/concept/${id}`, function(data) {
            modules[id] = data;
            callback(data);
        });
    }

    save(id, callback) {

        var data = {
            "module": JSON.stringify(modules[id])
        }

        $.post(`/api/save_module`, data, callback);
    }
}
