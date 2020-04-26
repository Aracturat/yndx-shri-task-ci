import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from './reducers';
import thunk from 'redux-thunk';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(
		thunk
	))
);
