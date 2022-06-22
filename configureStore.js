/** @format */

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createRootReducer, rootSaga} from './src/store';

export default function configureStore() {
  const composeEnhancers = composeWithDevTools({name: 'mvp'});
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const store = createStore(
    createRootReducer(),
    {},
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
