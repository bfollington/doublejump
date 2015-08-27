
export const REQUEST_ACCOUNT = "REQUEST_ACCOUNT";
export function requestAccount() {
    return {type: REQUEST_ACCOUNT};
}

export const RECEIVE_ACCOUNT = "RECEIVE_ACCOUNT";
export function receiveAccount(data) {
    return {type: RECEIVE_ACCOUNT, data};
}

export function fetchAccount(project) {

    return new Promise( (resolve, reject) => {
        window.store.dispatch(requestAccount());

        $.get(`/api/account`, {},
            data => {
                window.store.dispatch(receiveAccount(data.account));
            }
        );
    });
}
