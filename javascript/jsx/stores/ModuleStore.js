import {Store} from 'stores/Store';

var actions = {
    "addModule": "onAddModule",
    "addComment": "onAddComment",
    "updateModule": "onUpdateModule"
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

    onAddComment(data) {
        var content;

        modules[data.module].contents.forEach(c => {
            if (c._id.$oid == data.id) {
                content = c;
            }
        });

        content.comments = content.comments || [];
        content.comments.push({text: data.text});
    }

    onUpdateModule(data) {
        console.log("On update module");
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
