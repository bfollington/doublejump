import {EventEmitter} from "events";

export class Store extends EventEmitter {
    constructor(actions) {
        super();

        this.actions = {};

        for (var key in actions) {
            this.actions[key] = this.emit.bind(this, key);

            this.addListener(key, this[actions[key]]);
            this.addListener(key, this.onChange.bind(this, key));
        }
    }

    onChange(key, data) {
        if (typeof data === "string") {
            console.error("Data passed to an event should be an object to enable appending of metadata.");
        }

        data.eventType = key;
        this.emit("change", data);
    }
}
