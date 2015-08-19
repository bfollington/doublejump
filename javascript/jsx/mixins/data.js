module.exports = function data(actions) {
    return function decorator(target) {

        target.prototype.loadData = function(props) {
            actions(props);
        };

    };
};
