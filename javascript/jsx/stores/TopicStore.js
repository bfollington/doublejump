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

    get(id, callback) {
        if (topics[id]) {
            return topics[id];
        } else {
            this.getAll((data) => {
                callback(data[id]);
            });
        }
    }

    getList(ids, callback) {
        var result = [];

        this.getAll( (topics) => {
            ids.forEach(id => {
                result.push(topics[id]);
            });

            callback(result);
        } );
    }

    getAll(callback) {
        if (fetchedAllFromServer) {
            callback(topics);
        } else {
            $.get(`/api/topics`, function(data) {

                data.topics.forEach(topic => {
                    topics[topic["_id"]["$oid"]] = topic;
                });

                fetchedAllFromServer = true;
                callback(topics);
            });
        }
    }
}
