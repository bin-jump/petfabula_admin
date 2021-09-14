import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { ManageState } from './types';
import { ManageLoadFeedbacksActionType } from './actionTypes';
import { ActionBase, fillOffsetResponseData } from '../../shared';

export const useLoadFeedbacks = () => {
  const dispatch = useDispatch();
  const { feedbacks, pending, error, total, size, page } = useSelector(
    (state: AppState) => ({
      feedbacks: state.manage.feedbacks.data,
      pending: state.manage.feedbacks.pending,
      error: state.manage.feedbacks.error,
      total: state.manage.feedbacks.total,
      size: state.manage.feedbacks.size,
      page: state.manage.feedbacks.page,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (page: number, size: number) => {
      dispatch({
        type: ManageLoadFeedbacksActionType.BEGIN,
        payload: { page, size },
      });
    },
    [dispatch],
  );

  return {
    loadFeedbacks: boundAction,
    feedbacks,
    pending,
    error,
    total,
    size,
    page,
  };
};

export const feedbackReducer = {
  [ManageLoadFeedbacksActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      feedbacks: {
        ...state.feedbacks,
        pending: true,
        error: null,
      },
    };
  },
  [ManageLoadFeedbacksActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      feedbacks: fillOffsetResponseData(state.feedbacks, action),
    };
  },
  [ManageLoadFeedbacksActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      feedbacks: {
        ...state.feedbacks,
        pending: false,
        error: action.error,
      },
    };
  },
};
