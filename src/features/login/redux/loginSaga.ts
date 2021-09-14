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

const watchLogin = createSagaWatcher({
  url: `/api/identity/signin-email-password`,
  method: 'POST',
  asyncAction: PasswordLoginUserActionType,
  watchType: 'EVERY',
});

const watchLogout = createSagaWatcher({
  url: `/api/identity/logout`,
  method: 'POST',
  asyncAction: LogoutActionType,
  watchType: 'EVERY',
});

export function* loginRootSaga() {
  yield all([fork(watchGetCurrentUser), fork(watchLogin), fork(watchLogout)]);
}
