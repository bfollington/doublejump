var mapping = function(defn) {
    return function decorator(target) {

        for (var i in defn) {
            target.prototype["$" + i] = function() {
                return defn[i](this.props, this.state);
            };
        }

        return target;
    };
};

module.exports = mapping;
