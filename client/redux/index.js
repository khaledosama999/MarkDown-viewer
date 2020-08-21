import { createStore, applyMiddleware } from 'redux';
import createSageMiddleWares from 'redux-saga';

import reducers from './reducers';
import { takeEverySetFilePath } from './saga/middlewares';

const sagaMiddleWare = createSageMiddleWares();

/**
 * @type {import('redux').Store}
 */
const Store = createStore(
  reducers,
  { file: '', filePath: null },
  applyMiddleware(sagaMiddleWare),
);

sagaMiddleWare.run(takeEverySetFilePath);

export default Store;
