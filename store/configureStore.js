import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import promiseMiddleware from 'redux-promise-middleware'


export default function configureStore(preloadedState) {
  const promiseMid= promiseMiddleware()

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, promiseMid)
  )

  return store
}
