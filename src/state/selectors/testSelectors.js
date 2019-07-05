export const getUserId = (state) => {
    if (state.test) {
        return state.test.userId
    }
    return null;
}

export const getQuestions = (state) => {
    if (state.test) {
        return state.test.questions
    }
    return null;
}