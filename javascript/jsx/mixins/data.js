module.exports = function data(actions, callback) {
    return function decorator(target) {

        target.prototype.loadData = function(props) {
            var promises = actions(props);
            return Promise.all(promises);
        }

        return target;
    };
};
