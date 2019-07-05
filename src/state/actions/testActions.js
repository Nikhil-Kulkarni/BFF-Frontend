import fetch from 'isomorphic-fetch';
require('dotenv').config();

const baseEndpoint = process.env.REACT_APP_BFF_BASE_ENDPOINT;

export const FETCH_TEST = "FETCH_TEST";
export const FETCH_TEST_SUCCESS = "FETCH_TEST_SUCCESS";
export const FETCH_TEST_FAILURE = "FETCH_TEST_FAILURE";

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