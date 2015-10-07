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

API.register = function(name, surname, username, email, password, password_confirmation, callback) {
    $.post(`/api/register/`, JSON.stringify({name, surname, username, email, password, password_confirmation}), callback);
}

API.auth = function(email, password, callback) {
    $.post(`/api/auth/`, JSON.stringify({email, password}), callback);
}

API.unauth = function(callback) {
    $.post(`/api/unauth/`, callback);
}

API.addComment = function(contentId, commentText, callback) {
    $.post(`/api/add_comment/${contentId}`, JSON.stringify({text: commentText}), callback);
}

API.mostAppropriateTopic = function(module, topic, callback) {
    $.post(`/api/most_appropriate_topic/`, JSON.stringify({module, topic}), callback);
}

API.moduleDifficulty = function(module, difficulty, callback) {
    $.post(`/api/module_difficulty/`, JSON.stringify({module, difficulty}), callback);
}

module.exports = API;
