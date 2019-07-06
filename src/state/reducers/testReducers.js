import { 
    FETCH_TEST_SUCCESS,
    FETCH_TEST_FAILURE,
    ANSWERED_QUESTION_CORRECT,
    ANSWERED_QUESTION_WRONG, 
    SUBMIT_SCORE_DONE,
} from '../actions/testActions';

const initialState = { done: false, numberCorrect: 0, questionIndex: 0, submittedScore: false }
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
        case ANSWERED_QUESTION_CORRECT:
            return Object.assign({}, state, {
                numberCorrect: state.numberCorrect + 1,
                questionIndex: state.questionIndex + 1,
            });
        case ANSWERED_QUESTION_WRONG:
            return Object.assign({}, state, {
                numberCorrect: state.numberCorrect,
                questionIndex: state.questionIndex + 1,
            });
        case SUBMIT_SCORE_DONE:
            return Object.assign({}, state, {
                submittedScore: true,
            });
        default:
            return state;
    }
};