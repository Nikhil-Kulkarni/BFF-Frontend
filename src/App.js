import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Topbar from './Topbar';
import './App.css';

class App extends Component {

    static propTypes = {
        userId: PropTypes.string,
        questions: PropTypes.array,
        questionIndex: PropTypes.number,
        numberQuestionsCorrect: PropTypes.number,
        onAnsweredQuestion: PropTypes.func,
        submitScore: PropTypes.func,
        hasSubmittedScore: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
    }

    componentWillMount() {
        this.selectedChoice = this.selectedChoice.bind(this);
        this.submitScore = this.submitScore.bind(this);
        this.onNameUpdate = this.onNameUpdate.bind(this);
    }

    onNameUpdate(e) {
        this.setState({
            name: e.target.value,
        });
    }

    selectedChoice(choiceId) {
        const { questions, questionIndex, onAnsweredQuestion } = this.props;
        const correctChoiceId = questions[questionIndex].correctChoiceId;
        onAnsweredQuestion(choiceId, correctChoiceId)
    }

    submitScore() {
        const { 
            numberQuestionsCorrect,
            questions,
            userId,
            submitScore,
        } = this.props;
        const name = this.state.name;
        const percentage = Math.round(numberQuestionsCorrect / questions.length * 100);
        submitScore(userId, name, percentage);
    }

    render() {
        const { 
            userId, 
            questionIndex, 
            questions,
            numberQuestionsCorrect, 
            hasSubmittedScore,
        } = this.props;
        if (hasSubmittedScore) {
            return (
                <div>
                    <Topbar />
                    <div className="loadingDiv">
                        You're done!
                    </div>
                </div>
            );
        }
        else if (questionIndex >= 5) {
            const percentage = Math.round(numberQuestionsCorrect / questions.length * 100);
            return (
                <div>
                    <Topbar />
                    <div className="percentageDiv">
                        {percentage}%
                    </div>
                    <form className="nameFormDiv">
                        <input type="text" className="nameInput" onChange={this.onNameUpdate} />
                    </form>
                    <div className="submitDiv" onClick={(e) => this.submitScore()}>
                        Submit
                    </div>
                </div>
            );
        }
        else if (userId && questions) {
            const question = questions[questionIndex];
            return (
                <div>
                    <Topbar />
                    <div className="questionDiv" key={questionIndex}>
                        {questionIndex + 1}. {question.text}
                        {question.choices.map((choice, index) =>
                            <div className="choiceDiv" onClick={(e) => this.selectedChoice(choice.id)} key={index}>
                                {choice.text}
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Topbar />
                <div className="loadingDiv">
                    Loading...
                </div>
            </div>
        )
    }
}

export default App;