var API = {};

/**
 * Record a transition between two learning modules.
 * @param  {Module ID} current
 * @param  {Module ID} next
 */
API.transition = function(current, next) {
    $.post("/concepts/transition/", {current: current, next: next});
};

module.exports = API;
