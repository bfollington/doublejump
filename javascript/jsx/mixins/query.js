var query = function(defn) {
    return function decorator(target) {

        target.prototype.query = {};

        for (var i in defn) {
            target.prototype.query[i] = defn[i];
        }

        return target;
    };
};

module.exports = query;
