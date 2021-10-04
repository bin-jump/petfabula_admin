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

  // topic
  LoadTopicCategoriesActionType,
  CreateTopicActionType,
  CreateTopicCategoryActionType,
  UpdateTopicActionType,
  UpdateTopicCategoryActionType,
  RemoveTopicActionType,
  RemoveTopicCategoryActionType,

  //pet breed
  LoadPetCategoryActionType,
  CreatePetBreedActionType,
  UpdatePetBreedActionType,

  // city
  LoadPrefecturesActionType,
  CreateCityActionType,
  UpdateCityActionType,
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

// topic
const watchLoadTopicCategories = createSagaWatcher({
  url: `/api/admin/topic-categories`,
  method: 'GET',
  asyncAction: LoadTopicCategoriesActionType,
  watchType: 'LATEST',
});

const watchCreateTopicCategory = createSagaWatcher({
  url: `/api/admin/topic-categories`,
  method: 'POST',
  asyncAction: CreateTopicCategoryActionType,
  watchType: 'EVERY',
});

const watchCreateTopic = createSagaWatcher({
  url: `/api/admin/topics`,
  method: 'POST',
  asyncAction: CreateTopicActionType,
  watchType: 'EVERY',
});

const watchUpdateTopicCategories = createSagaWatcher({
  url: `/api/admin/topic-categories`,
  method: 'PUT',
  asyncAction: UpdateTopicCategoryActionType,
  watchType: 'EVERY',
});

const watchUpdateTopic = createSagaWatcher({
  url: `/api/admin/topics`,
  method: 'PUT',
  asyncAction: UpdateTopicActionType,
  watchType: 'EVERY',
});

const watchRemoveTopic = createSagaWatcher({
  createUrl: (payload) => {
    let url = `/api/admin/topics/${payload.topicId}`;
    return url;
  },
  method: 'DELETE',
  asyncAction: RemoveTopicActionType,
  watchType: 'EVERY',
});

const watchRemoveTopicCategory = createSagaWatcher({
  createUrl: (payload) => {
    let url = `/api/admin/topic-categories/${payload.topicCategoryId}`;
    return url;
  },
  method: 'DELETE',
  asyncAction: RemoveTopicCategoryActionType,
  watchType: 'EVERY',
});

// pet breed
const watchLoadPetCategories = createSagaWatcher({
  url: `/api/admin/pet-categories`,
  method: 'GET',
  asyncAction: LoadPetCategoryActionType,
  watchType: 'LATEST',
});
const watchCreatePetBreed = createSagaWatcher({
  url: `/api/admin/pet-breeds`,
  method: 'POST',
  asyncAction: CreatePetBreedActionType,
  watchType: 'EVERY',
});
const watchUpdatePetBreed = createSagaWatcher({
  url: `/api/admin/pet-breeds`,
  method: 'PUT',
  asyncAction: UpdatePetBreedActionType,
  watchType: 'EVERY',
});

// city
const watchLoadPrefectures = createSagaWatcher({
  url: `/api/admin/prefectures`,
  method: 'GET',
  asyncAction: LoadPrefecturesActionType,
  watchType: 'LATEST',
});
const watchCreateCity = createSagaWatcher({
  url: `/api/admin/cities`,
  method: 'POST',
  asyncAction: CreateCityActionType,
  watchType: 'EVERY',
});
const watchUpdateCity = createSagaWatcher({
  url: `/api/admin/cities`,
  method: 'PUT',
  asyncAction: UpdateCityActionType,
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

    fork(watchLoadTopicCategories),
    fork(watchCreateTopicCategory),
    fork(watchCreateTopic),
    fork(watchUpdateTopicCategories),
    fork(watchUpdateTopic),
    fork(watchRemoveTopicCategory),
    fork(watchRemoveTopic),

    fork(watchLoadPetCategories),
    fork(watchCreatePetBreed),
    fork(watchUpdatePetBreed),

    fork(watchLoadPrefectures),
    fork(watchCreateCity),
    fork(watchUpdateCity),
  ]);
}
