import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTest, answeredQuestion, submitScore } from './state/actions/testActions';
import { getQuestions, getUserId, getQuestionIndex, getNumberCorrect, hasSubmittedScore } from './state/selectors/testSelectors';
import App from './App';

class AppContainer extends Component {

    componentWillMount() {
        const { testId } = this.props.match.params;
        this.props.fetchTest(testId);
    }
    render() {
        return(
            <App 
                userId={this.props.userId} 
                questions={this.props.questions} 
                questionIndex={this.props.questionIndex}
                onAnsweredQuestion={this.props.answeredQuestion}
                numberQuestionsCorrect={this.props.numberQuestionsCorrect}
                submitScore={this.props.submitScore}
                hasSubmittedScore={this.props.hasSubmittedScore}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {    
        questions: getQuestions(state),
        userId: getUserId(state),
        questionIndex: getQuestionIndex(state),
        numberQuestionsCorrect: getNumberCorrect(state),
        hasSubmittedScore: hasSubmittedScore(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTest: (testId) => dispatch(fetchTest(testId)),
        answeredQuestion: (selectedChoiceId, correctChoiceId) => dispatch(answeredQuestion(selectedChoiceId, correctChoiceId)),
        submitScore: (userId, name, percentage) => dispatch(submitScore(userId, name, percentage)),
    };
};

const InjectedAppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

export default InjectedAppContainer;