import {EventEmitter} from "events";

export class Store extends EventEmitter {
    constructor(actions) {
        super();

        this.actions = {};

        for (var key in actions) {
            this.actions[key] = (function(data) {
                this.emit(key, data);
            }).bind(this);

            this.addListener(key, this[actions[key]]);
            this.addListener(key, this.onChange.bind(this, key));
        }
    }

    onChange(key, data) {
        data._type = key;
        this.emit("change", data);
    }
}
