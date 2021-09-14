import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { ManageState, Document } from './types';
import {
  LoadUserAgreementActionType,
  LoadPrivacyAgreementActionType,
  UpdateDocumentActionType,
} from './actionTypes';
import { ActionBase } from '../../shared';

export const useLoadUserAgreement = () => {
  const dispatch = useDispatch();
  const { userAgreement, pending, error } = useSelector(
    (state: AppState) => ({
      userAgreement: state.manage.userAgreement.data,
      pending: state.manage.userAgreement.pending,
      error: state.manage.userAgreement.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({
      type: LoadUserAgreementActionType.BEGIN,
    });
  }, [dispatch]);

  return {
    loadUserAgreement: boundAction,
    userAgreement,
    pending,
    error,
  };
};

export const useLoadPrivacyAgreement = () => {
  const dispatch = useDispatch();
  const { privacyAgreement, pending, error } = useSelector(
    (state: AppState) => ({
      privacyAgreement: state.manage.privacyAgreement.data,
      pending: state.manage.privacyAgreement.pending,
      error: state.manage.privacyAgreement.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({
      type: LoadPrivacyAgreementActionType.BEGIN,
    });
  }, [dispatch]);

  return {
    loadPrivacyAgreement: boundAction,
    privacyAgreement,
    pending,
    error,
  };
};

export const useUpdateDocument = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.updateDocument.data,
      pending: state.manage.updateDocument.pending,
      error: state.manage.updateDocument.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data: Document) => {
      dispatch({
        type: UpdateDocumentActionType.BEGIN,
        payload: data,
      });
    },
    [dispatch],
  );

  return {
    updateDocument: boundAction,
    result,
    pending,
    error,
  };
};

export const documentReducer = {
  // load user agreement
  [LoadUserAgreementActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      userAgreement: {
        ...state.userAgreement,
        pending: true,
        error: null,
      },
    };
  },
  [LoadUserAgreementActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      userAgreement: {
        ...state.userAgreement,
        pending: false,
        data: action.payload,
      },
    };
  },
  [LoadUserAgreementActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      userAgreement: {
        ...state.userAgreement,
        pending: false,
        error: action.error,
      },
    };
  },

  // load privacy agreement
  [LoadPrivacyAgreementActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      privacyAgreement: {
        ...state.privacyAgreement,
        pending: true,
        error: null,
      },
    };
  },
  [LoadPrivacyAgreementActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      privacyAgreement: {
        ...state.privacyAgreement,
        pending: false,
        data: action.payload,
      },
    };
  },
  [LoadPrivacyAgreementActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      privacyAgreement: {
        ...state.privacyAgreement,
        pending: false,
        error: action.error,
      },
    };
  },

  // update document
  [UpdateDocumentActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateDocument: {
        ...state.updateDocument,
        pending: true,
        error: null,
      },
    };
  },
  [UpdateDocumentActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const userAgreement = state.userAgreement.data;
    const privacyAgreement = state.privacyAgreement.data;
    return {
      ...state,
      updateDocument: {
        ...state.updateDocument,
        pending: false,
        data: action.payload,
      },
      userAgreement: {
        ...state.userAgreement,
        data:
          userAgreement &&
          userAgreement.documentKey == action.payload.documentKey
            ? action.payload
            : userAgreement,
      },
      privacyAgreement: {
        ...state.privacyAgreement,
        data:
          privacyAgreement &&
          privacyAgreement.documentKey == action.payload.documentKey
            ? action.payload
            : privacyAgreement,
      },
    };
  },
  [UpdateDocumentActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateDocument: {
        ...state.updateDocument,
        pending: false,
        error: action.error,
      },
    };
  },
};
