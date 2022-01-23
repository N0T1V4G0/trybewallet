import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, reduxPromise)),
);

export default store;
