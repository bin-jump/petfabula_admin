import { createReducer, ActionBase } from '../../shared';
import { ManageState } from './types';
import { reportReducer } from './reportHooks';
import { feedbackReducer } from './feedbackHooks';
import { systemNotificationReducer } from './systemMessageHooks';
import { documentReducer } from './documentHooks';

const initialStat: ManageState = {
  reports: {
    data: [],
    pending: false,
    error: null,
    page: 0,
    size: 0,
    total: 0,
  },
  reportDetail: {
    data: null,
    pending: false,
    error: null,
  },

  removePost: {
    data: null,
    pending: false,
    error: null,
  },
  removeQuestion: {
    data: null,
    pending: false,
    error: null,
  },
  removeAnswer: {
    data: null,
    pending: false,
    error: null,
  },

  feedbacks: {
    data: [],
    pending: false,
    error: null,
    page: 0,
    size: 0,
    total: 0,
  },

  systemNotifications: {
    data: [],
    pending: false,
    error: null,
    page: 0,
    size: 0,
    total: 0,
  },
  createSystemNotification: {
    data: null,
    pending: false,
    error: null,
  },
  removeSystemNotification: {
    data: null,
    pending: false,
    error: null,
  },
  updateSystemNotification: {
    data: null,
    pending: false,
    error: null,
  },

  userAgreement: {
    data: null,
    pending: false,
    error: null,
  },
  privacyAgreement: {
    data: null,
    pending: false,
    error: null,
  },
  updateDocument: {
    data: null,
    pending: false,
    error: null,
  },
};

export const manageRootReducer = createReducer<ManageState, ActionBase>(
  initialStat,
  {
    ...reportReducer,
    ...feedbackReducer,
    ...systemNotificationReducer,
    ...documentReducer,
  },
);
