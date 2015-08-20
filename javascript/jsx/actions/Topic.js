
export const REQUEST_TOPICS = "REQUEST_TOPICS";
export function requestTopics() {
    return {type: REQUEST_TOPICS};
}

export const RECEIVE_TOPICS = "RECEIVE_TOPICS";
export function receiveTopics(data) {
    return {type: RECEIVE_TOPICS, data};
}

export function fetchTopics() {


    return new Promise( (resolve, reject) => {

        window.store.dispatch(requestTopics());

        $.get(`/api/topics`, data => {
            window.store.dispatch(receiveTopics(data));
            resolve();
        });
    });
}
