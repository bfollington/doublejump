import {Store} from 'stores/Store';

var actions = {
};

var projects = {};
var fetchedAll = false;

export class ProjectStore extends Store {

    constructor() {
        super(actions);
    }

    getMetadata(project, callback) {
        if (projects[project] && projects[project].metadata) {
            callback(projects[project].metadata);
        } else {

            if (projects[project]) {
                // Project is cached, metadata isn't
                this.fetchMetadata(project, callback);
            } else {
                // Nothing cached
                this.getProject(project, function(data) {
                    this.fetchMetadata(project, callback);
                });
            }

        }
    }

    fetchMetadata(project, callback) {
        $.get(`/concepts/all_data/${project}`, {}, function(data) {
            projects[project].metadata = data;
        });
    }

    getProject(project, callback) {
        if (projects[project]) {
            callback(projects[project]);
        } else {
            $.get(`/concepts/project/${project}`, {}, function(data) {
                projects[project] = data.project;
            });
        }
    }
}
