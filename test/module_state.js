jest.dontMock("redux");
var redux = require("redux");

var getStore = require.requireActual("test/getStore");

var SAMPLE_MODULE = {
    id: "123",
    name: "Test Module",
    topics: []
};

var OTHER_SAMPLE_MODULE = {
    id: "234",
    name: "Another Module",
    topics: []
};

describe('Module State', function() {
    it('REQUEST_MODULE', function() {
        var mod = require.requireActual('actions/Module');
        var store = getStore(redux);

        store.dispatch(mod.requestModule(SAMPLE_MODULE.id));

        // console.log(store.getState());
        expect(store.getState().module.items[SAMPLE_MODULE.id].isFetching).toBeTruthy();
    });

    it('RECEIVE_MODULE', function() {
        var mod = require.requireActual('actions/Module');
        var store = getStore(redux);

        store.dispatch(mod.receiveModule(SAMPLE_MODULE.id, SAMPLE_MODULE));

        expect(store.getState().module.items[SAMPLE_MODULE.id].isFetching).toBeFalsy();
        expect(store.getState().module.items[SAMPLE_MODULE.id].data.name).toBe(SAMPLE_MODULE.name);
    });

    it('REQUEST_MODULES', function() {
        var mod = require.requireActual('actions/Module');
        var store = getStore(redux);

        store.dispatch(mod.requestModules());

        // console.log(store.getState());
        expect(store.getState().module.areFetching).toBeTruthy();
    });

    it('RECEIVE_MODULES', function() {
        var mod = require.requireActual('actions/Module');
        var store = getStore(redux);

        store.dispatch(mod.receiveModules([
            OTHER_SAMPLE_MODULE
        ]));

        // console.log(store.getState().module);
        expect(store.getState().module.areFetching).toBeFalsy();
        expect(store.getState().module.items[OTHER_SAMPLE_MODULE.id].data.name).toBe(OTHER_SAMPLE_MODULE.name);
    });

    it('RECEIVE_MODULES with several at a time', function() {
        var mod = require.requireActual('actions/Module');
        var store = getStore(redux);

        store.dispatch(mod.receiveModules([
            OTHER_SAMPLE_MODULE,
            SAMPLE_MODULE
        ]));

        expect(store.getState().module.areFetching).toBeFalsy();
        expect(store.getState().module.items[OTHER_SAMPLE_MODULE.id].data.name).toBe(OTHER_SAMPLE_MODULE.name);
        expect(store.getState().module.items[SAMPLE_MODULE.id].data.name).toBe(SAMPLE_MODULE.name);
    });

    it('RECEIVE_MODULES and preserves state', function() {
        var mod = require.requireActual('actions/Module');
        var store = getStore(redux);

        store.dispatch(mod.receiveModules([
            OTHER_SAMPLE_MODULE
        ]));

        // console.log(store.getState().module);
        expect(store.getState().module.areFetching).toBeFalsy();
        expect(store.getState().module.items[OTHER_SAMPLE_MODULE.id].data.name).toBe(OTHER_SAMPLE_MODULE.name);

        store.dispatch(mod.receiveModules([
            SAMPLE_MODULE
        ]));

        expect(store.getState().module.items[SAMPLE_MODULE.id].data.name).toBe(SAMPLE_MODULE.name);
        expect(store.getState().module.items[OTHER_SAMPLE_MODULE.id].data.name).toBe(OTHER_SAMPLE_MODULE.name);
    });
});
