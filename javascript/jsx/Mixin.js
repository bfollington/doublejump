

export var Mixin = {};

var reserved = [
    "componentDidUnmount",
    "componentDidMount"
];

Mixin.apply = function(parentComponent, mixin, opts) {

    var key;

    for (var i in reserved) {
        key = reserved[i];

        if (mixin[key] !== undefined) {

            if (!parentComponent[key]) {
                parentComponent[key] = mixin[key].bind(parentComponent);
            } else {
                var one = parentComponent[key].bind(parentComponent);
                var two = mixin[key].bind(parentComponent);

                if (one && two) {
                    parentComponent[key] = function() {
                        one();
                        two();
                    };
                }
            }

            delete mixin[key];
            console.log(key, "was applied");
        }
    }

    for (key in mixin) {
        // Skip init method
        if (key !== "init" && reserved.indexOf(key) == -1) {
            parentComponent[key] = mixin[key].bind(parentComponent);
        }
    }

    if (mixin.init !== undefined) {
        mixin.init.bind(parentComponent)(opts);
    }
};
