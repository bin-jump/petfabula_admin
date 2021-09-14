import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fork, all, spawn } from 'redux-saga/effects';
import rootReducer from './rootReducer';
import { loginRootSaga } from '../features/login/redux';
import { manageRootSaga } from '../features/manage/redux';
import { logHandleMiddleware } from './logHandleMiddleware';
import { toastHandleMiddleware } from './toastHandleMiddleware';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  logHandleMiddleware,
  toastHandleMiddleware,
  sagaMiddleware,
];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

function* rootSaga() {
  yield all([fork(loginRootSaga), fork(manageRootSaga)]);
}

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof rootReducer>;
export default store;
