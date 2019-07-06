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

export const getQuestionIndex = (state) => {
    if (state.test) {
        return state.test.questionIndex;
    }
    return 0;
}

export const getNumberCorrect = (state) => {
    if (state.test) {
        return state.test.numberCorrect;
    }
    return null;
}

export const hasSubmittedScore = (state) => {
    if (state.test) {
        return state.test.submittedScore;
    }
    return false;
}