import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux'
import { configure } from './config/configStore';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';

const config = configure({});
ReactDOM.render(
    <Provider store={config.store}>
        <Router history={createBrowserHistory()}>
            <div>
                <Route path="/:testId" exact={true} component={AppContainer} />
            </div>
        </Router>
    </Provider>, 
    document.getElementById('root')
);
