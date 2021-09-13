import { all, fork } from 'redux-saga/effects';
import { createSagaWatcher } from '../../shared';
import {
  PasswordLoginUserActionType,
  GetCurrentUserActionType,
  LogoutActionType,
} from './actionTypes';

const watchGetCurrentUser = createSagaWatcher({
  url: `/api/identity/me`,
  method: 'GET',
  asyncAction: GetCurrentUserActionType,
  watchType: 'LATEST',
});

export function* loginRootSaga() {
  yield all([fork(watchGetCurrentUser)]);
}
