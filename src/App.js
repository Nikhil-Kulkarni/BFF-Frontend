import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Topbar from './Topbar';
import './App.css';

class App extends Component {

    static propTypes = {
        userId: PropTypes.string,
        questions: PropTypes.array,
    }

    componentWillMount() {
        this.selectedChoice.bind(this);
    }

    selectedChoice(event) {

    }

    render() {
        const { userId, questions } = this.props;
        if (userId && questions) {
            return (
                <div>
                    <Topbar />
                    {questions.map((question, index) =>
                        <div className="questionDiv">
                            {index + 1}. {question.text}
                            {question.choices.map((choice, index) =>
                                <div className="choiceDiv">
                                    {choice.text}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }
        return (
            <div>
                <Topbar />
                NOTHING
            </div>
        )
    }

}

export default App;