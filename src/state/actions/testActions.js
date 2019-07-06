import fetch from 'isomorphic-fetch';
require('dotenv').config();

const baseEndpoint = process.env.REACT_APP_BFF_BASE_ENDPOINT;

export const FETCH_TEST = "FETCH_TEST";
export const FETCH_TEST_SUCCESS = "FETCH_TEST_SUCCESS";
export const FETCH_TEST_FAILURE = "FETCH_TEST_FAILURE";
export const ANSWERED_QUESTION = "ANSWERED_QUESTION";
export const ANSWERED_QUESTION_CORRECT = "ANSWERED_QUESTION_CORRECT";
export const ANSWERED_QUESTION_WRONG = "ANSWERED_QUESTION_WRONG";
export const SUBMIT_SCORE = "SUBMIT_SCORE";
export const SUBMIT_SCORE_DONE = "SUBMIT_SCORE_DONE";

export const submitScore = (userId, name, percentage) => {
    return (dispatch) => {
        return submitScoreRequest(userId, name, percentage).then(([response, json]) => {
            dispatch(submitScoreDone());
        });
    };
}

export const fetchTest = (hotelId) => {
    return (dispatch) => {
        return fetchTestFromNetwork(hotelId).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchTestSuccess(json));
            } else {
                dispatch(fetchTestFailure());
            }
        });
    };
};

export const answeredQuestion = (selectedChoiceId, correctChoiceId) => {
    return (dispatch) => {
        if (selectedChoiceId === correctChoiceId) {
            dispatch(answeredQuestionCorrect());
        } else {
            dispatch(answeredQuestionWrong());
        }
    };
}

const submitScoreDone = () => {
    return {
        type: SUBMIT_SCORE_DONE,
    };
};

const answeredQuestionCorrect = () => {
    return {
        type: ANSWERED_QUESTION_CORRECT,
    };
};

const answeredQuestionWrong = () => {
    return {
        type: ANSWERED_QUESTION_WRONG,
    };
};

const fetchTestSuccess = (payload) => {
    return {
        type: FETCH_TEST_SUCCESS,
        payload
    };
};

const fetchTestFailure = () => {
    return {
        type: FETCH_TEST_FAILURE,
    };
};

const fetchTestFromNetwork = (testId) => {
    const url = `${baseEndpoint}/FetchTest`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            testId,
        })
    })
    .then(response => Promise.all([response, response.json()]));
};

const submitScoreRequest = (userId, name, percentage) => {
    const url = `${baseEndpoint}/SubmitScore`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            name,
            "value": percentage
        })
    })
    .then(response => Promise.all([response, response.json()]));
}