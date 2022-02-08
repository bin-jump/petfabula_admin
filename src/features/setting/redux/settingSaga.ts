import { all, fork } from 'redux-saga/effects';
import { createSagaWatcher } from '../../shared';
import { ChangePasswordActionType } from './actionTypes';

const watchChangePassword = createSagaWatcher({
  url: `/api/admin/password`,
  method: 'POST',
  asyncAction: ChangePasswordActionType,
  watchType: 'EVERY',
});

export function* settingRootSaga() {
  yield all([fork(watchChangePassword)]);
}
