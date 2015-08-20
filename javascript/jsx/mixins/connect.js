import { connect } from 'react-redux';

module.exports = function connector(stateMapper, dispatchMapper) {
    return function decorator(target) {

        return connect(stateMapper, dispatchMapper)(target);

    };
};
