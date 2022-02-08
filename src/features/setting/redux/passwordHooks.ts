import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { ChangePasswordForm } from './types';
import { ChangePasswordActionType } from './actionTypes';
import { ActionBase } from '../../shared';
import { SettingState } from '.';

export const useChangePassword = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.setting.changePassword.data,
      pending: state.setting.changePassword.pending,
      error: state.setting.changePassword.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: ChangePasswordForm) => {
      dispatch({
        type: ChangePasswordActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    changePassword: boundAction,
    result,
    pending,
    error,
  };
};

export const passwordReducer = {
  [ChangePasswordActionType.BEGIN]: (
    state: SettingState,
    action: ActionBase,
  ): SettingState => {
    return {
      ...state,
      changePassword: {
        ...state.changePassword,
        pending: true,
        error: null,
      },
    };
  },
  [ChangePasswordActionType.SUCCESS]: (
    state: SettingState,
    action: ActionBase,
  ): SettingState => {
    return {
      ...state,
      changePassword: {
        ...state.changePassword,
        pending: false,
        data: action.payload,
      },
    };
  },
  [ChangePasswordActionType.FAILURE]: (
    state: SettingState,
    action: ActionBase,
  ): SettingState => {
    return {
      ...state,
      changePassword: {
        ...state.changePassword,
        pending: false,
        error: action.error,
      },
    };
  },
};
