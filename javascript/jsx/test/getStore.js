jest.dontMock('reducers/Project');
jest.dontMock('reducers/Module');
jest.dontMock('reducers/Topic');
jest.dontMock('reducers/Account');

var project = require('reducers/Project');
var module = require('reducers/Module');
var topic = require('reducers/Topic');
var account = require('reducers/Account');

export default function getStore(redux) {

    // console.log(redux);

    return redux.createStore(
        redux.combineReducers({
            project,
            topic,
            module,
            account
        })
    );
}
