import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTest } from './state/actions/testActions';
import { getQuestions, getUserId } from './state/selectors/testSelectors';
import App from './App';

class AppContainer extends Component {

    componentWillMount() {
        const { testId } = this.props.match.params;
        this.props.fetchTest(testId);
    }
    render() {
        return(
            <App userId={this.props.userId} questions={this.props.questions}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {    
        questions: getQuestions(state),
        userId: getUserId(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTest: (testId) => dispatch(fetchTest(testId)),
    };
};

const InjectedAppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

export default InjectedAppContainer;