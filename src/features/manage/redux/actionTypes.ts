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
