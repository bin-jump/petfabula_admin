import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { EmailPasswordLoginForm, LoginState } from './types';
import {
  GetCurrentUserActionType,
  PasswordLoginUserActionType,
  LogoutActionType,
} from './actionTypes';
import { ActionBase } from '../../shared';

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { sendResult, pending, error } = useSelector(
    (state: AppState) => ({
      sendResult: state.login.currentUser.data,
      pending: state.login.currentUser.pending,
      error: state.login.currentUser.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({ type: GetCurrentUserActionType.BEGIN });
  }, [dispatch]);

  return {
    getCurrentUser: boundAction,
    sendResult,
    pending,
    error,
  };
};

export const usePasswordLogin = () => {
  const dispatch = useDispatch();
  const { sendResult, pending, error } = useSelector(
    (state: AppState) => ({
      sendResult: state.login.passwordLoginResult.data,
      pending: state.login.passwordLoginResult.pending,
      error: state.login.passwordLoginResult.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data: EmailPasswordLoginForm) => {
      dispatch({ type: PasswordLoginUserActionType.BEGIN, payload: data });
    },
    [dispatch],
  );

  return {
    login: boundAction,
    sendResult,
    pending,
    error,
  };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const { sendResult, pending, error } = useSelector(
    (state: AppState) => ({
      sendResult: state.login.logoutResult.data,
      pending: state.login.logoutResult.pending,
      error: state.login.logoutResult.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({ type: LogoutActionType.BEGIN });
  }, [dispatch]);

  return {
    logout: boundAction,
    sendResult,
    pending,
    error,
  };
};

export const loginReducer = {
  [GetCurrentUserActionType.BEGIN]: (
    state: LoginState,
    action: ActionBase,
  ): LoginState => {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        pending: true,
        error: null,
      },
    };
  },
  [GetCurrentUserActionType.SUCCESS]: (
    state: LoginState,
    action: ActionBase,
  ): LoginState => {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        data: action.payload,
        pending: false,
      },
    };
  },
  [GetCurrentUserActionType.FAILURE]: (
    state: LoginState,
    action: ActionBase,
  ): LoginState => {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        pending: false,
        error: action.error,
      },
    };
  },

  [PasswordLoginUserActionType.BEGIN]: (
    state: LoginState,
    action: ActionBase,
  ): LoginState => {
    return {
      ...state,
      passwordLoginResult: {
        ...state.passwordLoginResult,
        pending: true,
        error: null,
      },
    };
  },
  [PasswordLoginUserActionType.SUCCESS]: (
    state: LoginState,
    action: ActionBase,
  ): LoginState => {
    return {
      ...state,
      passwordLoginResult: {
        ...state.passwordLoginResult,
        data: action.payload,
        pending: false,
      },
    };
  },
  [PasswordLoginUserActionType.FAILURE]: (
    state: LoginState,
    action: ActionBase,
  ): LoginState => {
    return {
      ...state,
      passwordLoginResult: {
        ...state.passwordLoginResult,
        pending: false,
        error: action.error,
      },
    };
  },
};
