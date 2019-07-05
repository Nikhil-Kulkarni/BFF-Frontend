import { FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE } from '../actions/testActions';

const initialState = { done: false }
export default function accountReducers(state = initialState, action) {
    switch (action.type) {
        case FETCH_TEST_SUCCESS:
            return Object.assign({}, state, {
                success: true,
                done: true,
                questions: action.payload.questions,
                userId: action.payload.userId,
            });
        case FETCH_TEST_FAILURE:
            return Object.assign({}, state, {
                success: false,
                done: true,
            });
        default:
            return state;
    }
};