
export const GET_NOTIFICATION = "GET_NOTIFICATION";
export function getNotification(data) {
    return {type: GET_NOTIFICATION, data};
}

export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
export function clearNotification() {
    return {type: CLEAR_NOTIFICATION};
}
