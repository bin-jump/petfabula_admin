import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { ManageState, RestrictionForm, Restriction } from './types';
import {
  LoadUsersActionType,
  LoadUserDetailActionType,
  CreateRestrictionActionType,
  RemoveRestrictionActionType,
} from './actionTypes';
import { ActionBase, fillOffsetResponseData } from '../../shared';

export const useLoadUsers = () => {
  const dispatch = useDispatch();
  const { users, pending, error, total, size, page } = useSelector(
    (state: AppState) => ({
      users: state.manage.users.data,
      pending: state.manage.users.pending,
      error: state.manage.users.error,
      total: state.manage.users.total,
      size: state.manage.users.size,
      page: state.manage.users.page,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (page: number, size: number) => {
      dispatch({
        type: LoadUsersActionType.BEGIN,
        payload: { page, size },
      });
    },
    [dispatch],
  );

  return {
    loadUsers: boundAction,
    users,
    pending,
    error,
    total,
    size,
    page,
  };
};

export const useLoadUserDetail = () => {
  const dispatch = useDispatch();
  const { userDetail, pending, error } = useSelector(
    (state: AppState) => ({
      userDetail: state.manage.userDetail.data,
      pending: state.manage.userDetail.pending,
      error: state.manage.userDetail.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (userId: number) => {
      dispatch({
        type: LoadUserDetailActionType.BEGIN,
        payload: { userId },
      });
    },
    [dispatch],
  );

  return {
    loadUserDetail: boundAction,
    userDetail,
    pending,
    error,
  };
};

export const useCreateRestriction = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.createRestriction.data,
      pending: state.manage.createRestriction.pending,
      error: state.manage.createRestriction.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: RestrictionForm) => {
      dispatch({
        type: CreateRestrictionActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    createRestriction: boundAction,
    result,
    pending,
    error,
  };
};

export const useRemoveRestriction = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.removeRestriction.data,
      pending: state.manage.removeRestriction.pending,
      error: state.manage.removeRestriction.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (userId: number) => {
      dispatch({
        type: RemoveRestrictionActionType.BEGIN,
        payload: { userId },
      });
    },
    [dispatch],
  );

  return {
    removeRestriction: boundAction,
    result,
    pending,
    error,
  };
};

export const userReducer = {
  // load users
  [LoadUsersActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      users: {
        ...state.users,
        pending: true,
        error: null,
      },
    };
  },
  [LoadUsersActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      users: fillOffsetResponseData(state.users, action),
    };
  },
  [LoadUsersActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      users: {
        ...state.users,
        pending: false,
        error: action.error,
      },
    };
  },

  // load user detail
  [LoadUserDetailActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        pending: true,
        error: null,
      },
    };
  },
  [LoadUserDetailActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        data: action.payload,
        pending: false,
      },
    };
  },
  [LoadUserDetailActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        pending: false,
        error: action.error,
      },
    };
  },

  // create restriction
  [CreateRestrictionActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createRestriction: {
        ...state.createRestriction,
        pending: true,
        error: null,
      },
    };
  },
  [CreateRestrictionActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const userDetail = state.userDetail.data;
    const restriction = action.payload as Restriction;
    return {
      ...state,
      createRestriction: {
        ...state.createRestriction,
        data: action.payload,
        pending: false,
      },
      userDetail: {
        ...state.userDetail,
        data: userDetail
          ? {
              ...userDetail,
              restrictExpiration:
                userDetail.id == restriction.participatorId
                  ? restriction.expiration
                  : userDetail.restrictExpiration,
            }
          : userDetail,
      },
    };
  },
  [CreateRestrictionActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createRestriction: {
        ...state.createRestriction,
        pending: false,
        error: action.error,
      },
    };
  },

  // remove restriction
  [RemoveRestrictionActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeRestriction: {
        ...state.removeRestriction,
        pending: true,
        error: null,
      },
    };
  },
  [RemoveRestrictionActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const userDetail = state.userDetail.data;
    const restriction = action.payload as Restriction;
    return {
      ...state,
      removeRestriction: {
        ...state.removeRestriction,
        data: action.payload,
        pending: false,
      },
      userDetail: {
        ...state.userDetail,
        data: userDetail
          ? {
              ...userDetail,
              restrictExpiration:
                userDetail.id == restriction.participatorId
                  ? null
                  : userDetail.restrictExpiration,
            }
          : userDetail,
      },
    };
  },
  [RemoveRestrictionActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeRestriction: {
        ...state.removeRestriction,
        pending: false,
        error: action.error,
      },
    };
  },
};
