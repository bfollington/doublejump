export var Store = {};

var fluxLocation;
var stores = [];

Store.init = function(opts) {

    fluxLocation = opts.fluxLocation || window.flux || {};

    if (opts.store || opts.stores) {
        this.stores = this.stores || {};

        // If a list was given
        for (var i = 0; i < opts.stores.length; i++) {
            if (fluxLocation.stores[opts.stores[i]] !== undefined) {
                this.stores[opts.stores[i]] = fluxLocation.stores[opts.stores[i]];
                stores.push(opts.stores[i]);
            } else {
                warnForNonExistantStore(this, opts.stores[i]);
            }
        }

        // Or a single store
        if (opts.store) {
            this.stores[opts.store] = fluxLocation.stores[opts.store];
            stores.push(opts.store);

            if (fluxLocation.stores[opts.store] === undefined) {
                warnForNonExistantStore(this, opts.store);
            }
        }

    }
};

Store.componentDidMount = function() {
    console.log("Hello from store mixin");

    if (this.onChange) {
        stores.forEach(store => {
            fluxLocation.stores[store].addListener("change", this.onChange.bind(this));
        });
    }
};

Store.componentDidUnmount = function() {
    console.log("Goodbye from store mixin", this);

    if (this.onChange) {
        stores.forEach(store => {
            fluxLocation.stores[store].removeListener("change", this.onChange.bind(this));
        });
    }
};

// Default impl should update state using new data
//Store.onChange

function warnForNonExistantStore(ctx, name) {
    console.warn("The store specified does not exist.", {storeName: name, context: ctx});
}
