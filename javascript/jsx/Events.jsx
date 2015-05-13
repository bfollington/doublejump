export class Events {

    static emit(el, ev, data) {
        $(el).trigger(ev, data);
    }

    static subscribe(el, ev, handler) {
        $(el).on(ev, handler);
    }

    static subscribeRoot(ev, handler) {
        $(window.app.domRoot).on(ev, handler);
    }

    static unsubscribe(el, ev) {
        $(el).off(ev);
    }

    static unsubscribeRoot(ev, fn) {
        $(window.app.domRoot).off(ev, fn);
    }

    static unsubscribeAll(el) {
        $(el).off();
    }

    static emitRoot(ev, data) {
        Events.emit(window.app.domRoot, ev, data);
    }

}

export var SaveModuleFormEvent = "event_save_module_form";
