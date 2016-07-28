import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import promiseMiddleware from 'redux-promise-middleware'


export default function configureStore(preloadedState) {
  const logger = createLogger()
  const promiseMid= promiseMiddleware()

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, promiseMid, logger)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
