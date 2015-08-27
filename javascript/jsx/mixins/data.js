module.exports = function data(actions, callback) {
    return function decorator(target) {

        target.prototype.loadData = function(props) {
            var promises = actions(props);

            var combined = Promise.all(promises);

            // We don't want to swallow these errors!
            combined.catch( (err) => { throw err; } );

            return combined;
        }

        return target;
    };
};
