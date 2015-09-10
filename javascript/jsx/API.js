var API = {};

/**
 * Record a transition between two learning modules.
 * @param  {Module ID} current
 * @param  {Module ID} next
 */
API.transition = function(current, next) {
    $.post("/api/transition/", JSON.stringify({current, next}));
};

API.finishedModule = function(project, module, callback) {
    $.post(`/api/finished_module/`, JSON.stringify({project, module}), callback);
};

API.startProject = function(name, slug, likedTopics, comfortableTopics, callback) {
    $.post(`/api/project/`, JSON.stringify({title: name, slug, likedTopics, comfortableTopics}), callback);
}

API.mostAppropriateTopic = function(module, topic, callback) {
    $.post(`/api/most_appropriate_topic/`, JSON.stringify({module, topic}), callback);
}

API.moduleDifficulty = function(module, difficulty, callback) {
    $.post(`/api/module_difficulty/`, JSON.stringify({module, difficulty}), callback);
}

module.exports = API;
