import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { ManageState, TestUserAuthForm, TestUserForm } from './types';
import {
  LoadTestUsersActionType,
  UpdateTestUserAuthActionType,
  CreateTestUserActionType,
} from './actionTypes';
import { ActionBase, fillOffsetResponseData } from '../../shared';
import { TestUser } from '.';

export const useLoadTestUsers = () => {
  const dispatch = useDispatch();
  const { testUsers, pending, error } = useSelector(
    (state: AppState) => ({
      testUsers: state.manage.testUsers.data,
      pending: state.manage.testUsers.pending,
      error: state.manage.testUsers.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({
      type: LoadTestUsersActionType.BEGIN,
    });
  }, [dispatch]);

  return {
    loadTestUsers: boundAction,
    testUsers,
    pending,
    error,
  };
};

export const useCreateTestUser = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.createTestUser.data,
      pending: state.manage.createTestUser.pending,
      error: state.manage.createTestUser.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: TestUserForm) => {
      dispatch({
        type: CreateTestUserActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    createTestUser: boundAction,
    result,
    pending,
    error,
  };
};

export const useUpdateTestUserAuthInfo = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.updateTestUserAuthInfo.data,
      pending: state.manage.updateTestUserAuthInfo.pending,
      error: state.manage.updateTestUserAuthInfo.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: TestUserAuthForm) => {
      dispatch({
        type: UpdateTestUserAuthActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    updateTestUserAuthInfo: boundAction,
    result,
    pending,
    error,
  };
};

export const testUserReducer = {
  // load test users
  [LoadTestUsersActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      testUsers: {
        ...state.testUsers,
        pending: true,
        error: null,
      },
    };
  },
  [LoadTestUsersActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      testUsers: {
        ...state.testUsers,
        pending: false,
        data: action.payload,
      },
    };
  },
  [LoadTestUsersActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      testUsers: {
        ...state.testUsers,
        pending: false,
        error: action.error,
      },
    };
  },

  // create test user auth info
  [CreateTestUserActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createTestUser: {
        ...state.createTestUser,
        pending: true,
        error: null,
      },
    };
  },
  [CreateTestUserActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const created = action.payload as TestUser;
    return {
      ...state,
      createTestUser: {
        ...state.createTestUser,
        pending: false,
        data: created,
      },

      testUsers: {
        ...state.testUsers,
        data: [...state.testUsers.data, created],
      },
    };
  },
  [CreateTestUserActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createTestUser: {
        ...state.createTestUser,
        pending: false,
        error: action.error,
      },
    };
  },

  // update test user auth info
  [UpdateTestUserAuthActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateTestUserAuthInfo: {
        ...state.updateTestUserAuthInfo,
        pending: true,
        error: null,
      },
    };
  },
  [UpdateTestUserAuthActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const updated = action.payload as TestUser;
    return {
      ...state,
      updateTestUserAuthInfo: {
        ...state.updateTestUserAuthInfo,
        pending: false,
        data: updated,
      },

      testUsers: {
        ...state.testUsers,
        data: state.testUsers.data.map((o) => {
          if (o.id == updated.id) {
            return updated;
          }
          return o;
        }),
      },
    };
  },
  [UpdateTestUserAuthActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateTestUserAuthInfo: {
        ...state.updateTestUserAuthInfo,
        pending: false,
        error: action.error,
      },
    };
  },
};
