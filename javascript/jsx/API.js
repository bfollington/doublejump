var API = {};

/**
 * Record a transition between two learning modules.
 * @param  {Module ID} current
 * @param  {Module ID} next
 */
API.transition = function(current, next) {
    $.post("/concepts/transition/", JSON.stringify({current: current, next: next}));
};

API.finishedModule = function(project, module, callback) {
    $.post(`/concepts/finished_module/`, JSON.stringify({project: project, module: module}), callback);
};

module.exports = API;
