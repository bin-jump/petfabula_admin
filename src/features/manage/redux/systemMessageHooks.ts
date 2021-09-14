import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import {
  ManageState,
  SystemNotificationForm,
  SystemNotification,
} from './types';
import {
  ManageLoadSystemMessageActionType,
  ManageCreateSystemMessageActionType,
  ManageUpdateSystemMessageActionType,
  ManageRemoveSystemMessageActionType,
} from './actionTypes';
import { ActionBase, fillOffsetResponseData } from '../../shared';

export const useLoadSytemNotification = () => {
  const dispatch = useDispatch();
  const { notifications, pending, error, total, size, page } = useSelector(
    (state: AppState) => ({
      notifications: state.manage.systemNotifications.data,
      pending: state.manage.systemNotifications.pending,
      error: state.manage.systemNotifications.error,
      total: state.manage.systemNotifications.total,
      size: state.manage.systemNotifications.size,
      page: state.manage.systemNotifications.page,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (page: number, size: number) => {
      dispatch({
        type: ManageLoadSystemMessageActionType.BEGIN,
        payload: { page, size },
      });
    },
    [dispatch],
  );

  return {
    loadNotifications: boundAction,
    notifications,
    pending,
    error,
    total,
    size,
    page,
  };
};

export const useCreateSystemNotification = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.createSystemNotification.data,
      pending: state.manage.createSystemNotification.pending,
      error: state.manage.createSystemNotification.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data: SystemNotificationForm) => {
      dispatch({
        type: ManageCreateSystemMessageActionType.BEGIN,
        payload: data,
      });
    },
    [dispatch],
  );

  return {
    createNotification: boundAction,
    result,
    pending,
    error,
  };
};

export const useUpdateSystemNotification = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.updateSystemNotification.data,
      pending: state.manage.updateSystemNotification.pending,
      error: state.manage.updateSystemNotification.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data: SystemNotification) => {
      dispatch({
        type: ManageUpdateSystemMessageActionType.BEGIN,
        payload: data,
      });
    },
    [dispatch],
  );

  return {
    updateNotification: boundAction,
    result,
    pending,
    error,
  };
};

export const useRemoveSystemNotification = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.removeSystemNotification.data,
      pending: state.manage.removeSystemNotification.pending,
      error: state.manage.removeSystemNotification.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (notificationId: number) => {
      dispatch({
        type: ManageRemoveSystemMessageActionType.BEGIN,
        payload: { notificationId },
      });
    },
    [dispatch],
  );

  return {
    removeNotification: boundAction,
    result,
    pending,
    error,
  };
};

export const systemNotificationReducer = {
  [ManageLoadSystemMessageActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      systemNotifications: {
        ...state.systemNotifications,
        pending: true,
        error: null,
      },
    };
  },
  [ManageLoadSystemMessageActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      systemNotifications: fillOffsetResponseData(
        state.systemNotifications,
        action,
      ),
    };
  },
  [ManageLoadSystemMessageActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      systemNotifications: {
        ...state.systemNotifications,
        pending: false,
        error: action.error,
      },
    };
  },

  //create
  [ManageCreateSystemMessageActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createSystemNotification: {
        ...state.createSystemNotification,
        pending: true,
        error: null,
      },
    };
  },
  [ManageCreateSystemMessageActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createSystemNotification: {
        ...state.createSystemNotification,
        data: action.payload,
        pending: false,
      },
    };
  },
  [ManageCreateSystemMessageActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createSystemNotification: {
        ...state.createSystemNotification,
        pending: false,
        error: action.error,
      },
    };
  },

  // update
  [ManageUpdateSystemMessageActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateSystemNotification: {
        ...state.updateSystemNotification,
        pending: true,
        error: null,
      },
    };
  },
  [ManageUpdateSystemMessageActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const notifications = state.systemNotifications.data;
    const notification = action.payload as SystemNotification;
    return {
      ...state,
      updateSystemNotification: {
        ...state.updateSystemNotification,
        data: action.payload,
        pending: false,
      },
      systemNotifications: {
        ...state.systemNotifications,
        data: notifications.map((item) => {
          if (item.id == notification.id) {
            return notification;
          }
          return item;
        }),
      },
    };
  },
  [ManageUpdateSystemMessageActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateSystemNotification: {
        ...state.updateSystemNotification,
        pending: false,
        error: action.error,
      },
    };
  },

  // remove
  [ManageRemoveSystemMessageActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeSystemNotification: {
        ...state.removeSystemNotification,
        pending: true,
        error: null,
      },
    };
  },
  [ManageRemoveSystemMessageActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const notifications = state.systemNotifications.data;
    return {
      ...state,
      removeSystemNotification: {
        ...state.removeSystemNotification,
        data: action.payload,
        pending: false,
      },
      systemNotifications: {
        ...state.systemNotifications,
        data: notifications.filter((item) => item.id != action.payload.id),
      },
    };
  },
  [ManageRemoveSystemMessageActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeSystemNotification: {
        ...state.removeSystemNotification,
        pending: false,
        error: action.error,
      },
    };
  },
};
