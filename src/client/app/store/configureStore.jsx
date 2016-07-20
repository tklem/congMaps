import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers/index.jsx';

export default function configureStore(preloadedState) {

  let store = createStore(
    rootReducer,
    preloadedState,
    compose(
    	applyMiddleware(thunkMiddleware, promiseMiddleware),
    	window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}