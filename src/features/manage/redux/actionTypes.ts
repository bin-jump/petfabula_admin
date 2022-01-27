import { createAsyncActionType } from '../../shared';

export const ManageLoadReportsActionType = createAsyncActionType(
  'MANAGE_LOAD_REPORTS',
);
export const ManageLoadReportDetailActionType = createAsyncActionType(
  'MANAGE_LOAD_REPORT_DETAIL',
);

export const ManageRemovePostActionType =
  createAsyncActionType('MANAGE_REMOVE_POST');
export const ManageRemoveQuestionActionType = createAsyncActionType(
  'MANAGE_REMOVE_QUESTION',
);
export const ManageRemoveAnswerActionType = createAsyncActionType(
  'MANAGE_REMOVE_ANSWER',
);

export const ManageLoadFeedbacksActionType = createAsyncActionType(
  'MANAGE_LOAD_FEEDBACKS',
);

export const ManageLoadSystemMessageActionType = createAsyncActionType(
  'MANAGE_LOAD_SYSTEM_MESSAGE',
);
export const ManageCreateSystemMessageActionType = createAsyncActionType(
  'MANAGE_CREATE_SYSTEM_MESSAGE',
);
export const ManageUpdateSystemMessageActionType = createAsyncActionType(
  'MANAGE_UPDATE_SYSTEM_MESSAGE',
);
export const ManageRemoveSystemMessageActionType = createAsyncActionType(
  'MANAGE_REMOVE_SYSTEM_MESSAGE',
);

export const LoadUserAgreementActionType = createAsyncActionType(
  'MANAGE_LOAD_USER_AGREEMENT',
);
export const LoadPrivacyAgreementActionType = createAsyncActionType(
  'MANAGE_LOAD_PRIVACY_AGREEMENT',
);
export const UpdateDocumentActionType = createAsyncActionType(
  'MANAGE_UPDATE_DOCUMENT',
);

export const LoadTopicCategoriesActionType = createAsyncActionType(
  'MANAGE_LOAD_TOPIC_CATEGORIES',
);
export const CreateTopicActionType = createAsyncActionType(
  'MANAGE_CREATE_TOPIC',
);
export const CreateTopicCategoryActionType = createAsyncActionType(
  'MANAGE_CREATE_TOPIC_CATEGORY',
);
export const UpdateTopicActionType = createAsyncActionType(
  'MANAGE_UPDATE_TOPIC',
);
export const UpdateTopicCategoryActionType = createAsyncActionType(
  'MANAGE_UPDATE_TOPIC_CATEGORY',
);
export const RemoveTopicActionType = createAsyncActionType(
  'MANAGE_REMOVE_TOPIC',
);
export const RemoveTopicCategoryActionType = createAsyncActionType(
  'MANAGE_REMOVE_TOPIC_CATEGORY',
);

export const LoadPetCategoryActionType = createAsyncActionType(
  'MANAGE_LOAD_PET_CATEGORIES',
);
export const CreatePetBreedActionType = createAsyncActionType(
  'MANAGE_CREATE_PET_BREED',
);
export const UpdatePetBreedActionType = createAsyncActionType(
  'MANAGE_UPDATE_PET_BREED',
);

export const LoadPrefecturesActionType = createAsyncActionType(
  'MANAGE_LOAD_PREFECTURES',
);
export const CreateCityActionType = createAsyncActionType('MANAGE_CREATE_CITY');
export const UpdateCityActionType = createAsyncActionType('MANAGE_UPDATE_CITY');

export const LoadUsersActionType = createAsyncActionType('MANAGE_LOAD_USERS');
export const LoadUserDetailActionType = createAsyncActionType(
  'MANAGE_LOAD_USER_DETAIL',
);
export const CreateRestrictionActionType = createAsyncActionType(
  'MANAGE_CREATE_RESTRICTION',
);
export const RemoveRestrictionActionType = createAsyncActionType(
  'MANAGE_REMOVE_RESTRICTION',
);

export const LoadTestUsersActionType = createAsyncActionType(
  'MANAGE_LOAD_TSET_USERS',
);
export const CreateTestUserActionType = createAsyncActionType(
  'MANAGE_CREATE_TSET_USER',
);
export const UpdateTestUserAuthActionType = createAsyncActionType(
  'MANAGE_UPDATE_TSET_USER_AUTH',
);
