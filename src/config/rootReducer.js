import { combineReducers } from 'redux';
import testReducers from '../state/reducers/testReducers';

const rootReducer = combineReducers({
    test: testReducers,
});

export default rootReducer;