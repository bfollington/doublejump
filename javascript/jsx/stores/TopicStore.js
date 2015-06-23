import {Store} from 'stores/Store';

var actions = {
    "addTopic": "onAddTopic"
};

var fetchedAllFromServer = false;
var topics = {};

export class TopicStore extends Store {

    constructor() {
        super(actions);
    }

    onAddTopic(data) {
        console.log("Add topic", data);
        topics.push(data);
    }

    getAll(callback) {
        if (fetchedAllFromServer) {
            callback(topics);
        } else {
            $.get(`/concepts/topics`, function(data) {
                $.extend(topics, data);
                fetchedAllFromServer = true;
                callback(data);
            });
        }
    }
}
