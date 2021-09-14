import { all, fork } from 'redux-saga/effects';
import { createSagaWatcher } from '../../shared';
import {
  ManageLoadReportsActionType,
  ManageLoadReportDetailActionType,
  ManageRemoveAnswerActionType,
  ManageRemoveQuestionActionType,
  ManageRemovePostActionType,
  ManageLoadFeedbacksActionType,
  ManageLoadSystemMessageActionType,
  ManageCreateSystemMessageActionType,
  ManageUpdateSystemMessageActionType,
  ManageRemoveSystemMessageActionType,
  LoadUserAgreementActionType,
  LoadPrivacyAgreementActionType,
  UpdateDocumentActionType,
} from './actionTypes';

const watchLoadReports = createSagaWatcher({
  url: `/api/admin/reports`,
  method: 'GET',
  asyncAction: ManageLoadReportsActionType,
  watchType: 'LATEST',
});

const watchLoadReportDetail = createSagaWatcher({
  createUrl: (payload) => {
    return `/api/admin/reports/${payload.reportId}`;
  },
  method: 'GET',
  asyncAction: ManageLoadReportDetailActionType,
  watchType: 'LATEST',
});

const watchRemovePost = createSagaWatcher({
  createUrl: (payload) => {
    return `/api/admin/posts/${payload.postId}`;
  },
  method: 'DELETE',
  asyncAction: ManageRemovePostActionType,
  watchType: 'EVERY',
});

const watchRemoveQuestion = createSagaWatcher({
  createUrl: (payload) => {
    return `/api/admin/questions/${payload.postId}`;
  },
  method: 'DELETE',
  asyncAction: ManageRemoveQuestionActionType,
  watchType: 'EVERY',
});

const watchRemoveAnswer = createSagaWatcher({
  createUrl: (payload) => {
    return `/api/admin/answers/${payload.postId}`;
  },
  method: 'DELETE',
  asyncAction: ManageRemoveAnswerActionType,
  watchType: 'EVERY',
});

const watchLoadFeedbacks = createSagaWatcher({
  url: `/api/admin/feedbacks`,
  method: 'GET',
  asyncAction: ManageLoadFeedbacksActionType,
  watchType: 'LATEST',
});

const watchLoadSystemNotifications = createSagaWatcher({
  url: `/api/admin/system-notifications`,
  method: 'GET',
  asyncAction: ManageLoadSystemMessageActionType,
  watchType: 'LATEST',
});

const watchCreateSystemNotification = createSagaWatcher({
  url: `/api/admin/system-notifications`,
  method: 'POST',
  asyncAction: ManageCreateSystemMessageActionType,
  watchType: 'EVERY',
});

const watchUpdateSystemNotification = createSagaWatcher({
  url: `/api/admin/system-notifications`,
  method: 'PUT',
  asyncAction: ManageUpdateSystemMessageActionType,
  watchType: 'EVERY',
});

const watchRemoveSystemNotification = createSagaWatcher({
  createUrl: (payload) => {
    return `/api/admin/system-notifications/${payload.notificationId}`;
  },
  method: 'DELETE',
  asyncAction: ManageRemoveSystemMessageActionType,
  watchType: 'EVERY',
});

const watchLoadUserAgreement = createSagaWatcher({
  url: `/api/document/user-agreement`,
  method: 'GET',
  asyncAction: LoadUserAgreementActionType,
  watchType: 'LATEST',
});

const watchLoadUPrivacyAgreement = createSagaWatcher({
  url: `/api/document/privacy-agreement`,
  method: 'GET',
  asyncAction: LoadPrivacyAgreementActionType,
  watchType: 'LATEST',
});

const watchUpdateDocument = createSagaWatcher({
  url: `/api/admin/document`,
  method: 'PUT',
  asyncAction: UpdateDocumentActionType,
  watchType: 'EVERY',
});

export function* manageRootSaga() {
  yield all([
    fork(watchLoadReports),
    fork(watchLoadReportDetail),
    fork(watchRemoveQuestion),
    fork(watchRemovePost),
    fork(watchRemoveAnswer),

    fork(watchLoadFeedbacks),

    fork(watchLoadSystemNotifications),
    fork(watchCreateSystemNotification),
    fork(watchUpdateSystemNotification),
    fork(watchRemoveSystemNotification),

    fork(watchLoadUserAgreement),
    fork(watchLoadUPrivacyAgreement),
    fork(watchUpdateDocument),
  ]);
}
