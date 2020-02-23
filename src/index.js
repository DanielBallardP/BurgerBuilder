import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurgerBuilder, watchOrders, watchSettings } from './store/sagas';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import burgerStepperReducer from './store/reducers/burgerStepper';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import settingsReducer from './store/reducers/settings';

import 'typeface-roboto';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    burgerStepper: burgerStepperReducer,
    order: orderReducer,
    auth: authReducer,
    settings: settingsReducer});
    
const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);
sagaMiddleware.run(watchSettings);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
