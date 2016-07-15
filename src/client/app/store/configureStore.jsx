import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers/index.jsx';

export default function configureStore(preloadedState) {
  const logger = createLogger();

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, promiseMiddleware, logger)
  );

  return store;
}