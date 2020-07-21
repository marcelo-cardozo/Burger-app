import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import burgerBuilderReducer from "./store/reducer/burgerBuilder";
import orderReducer from "./store/reducer/order";
import authReducer from "./store/reducer/auth";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {watchAuth, watchBurger} from "./store/sagas";

// NODE_ENV es definido (por defecto) en root->config->env.js
// para que en production no se pueda acceder al redux state usando el redux devtool
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;

const sagaMiddleware = createSagaMiddleware()


const store = createStore(combineReducers({
    burger: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
}), composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurger)

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

