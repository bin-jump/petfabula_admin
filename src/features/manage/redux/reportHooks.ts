import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { ManageState } from './types';
import {
  ManageLoadReportsActionType,
  ManageLoadReportDetailActionType,
  ManageRemoveAnswerActionType,
  ManageRemovePostActionType,
  ManageRemoveQuestionActionType,
} from './actionTypes';
import { ActionBase, fillOffsetResponseData } from '../../shared';

export const useLoadReports = () => {
  const dispatch = useDispatch();
  const { reports, pending, error, total, size, page } = useSelector(
    (state: AppState) => ({
      reports: state.manage.reports.data,
      pending: state.manage.reports.pending,
      error: state.manage.reports.error,
      total: state.manage.reports.total,
      size: state.manage.reports.size,
      page: state.manage.reports.page,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (page: number, size: number) => {
      dispatch({
        type: ManageLoadReportsActionType.BEGIN,
        payload: { page, size },
      });
    },
    [dispatch],
  );

  return {
    loadReports: boundAction,
    reports,
    pending,
    error,
    total,
    size,
    page,
  };
};

export const useLoadReportDetail = () => {
  const dispatch = useDispatch();
  const { reportDetail, pending, error } = useSelector(
    (state: AppState) => ({
      reportDetail: state.manage.reportDetail.data,
      pending: state.manage.reportDetail.pending,
      error: state.manage.reportDetail.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (reportId: number) => {
      dispatch({
        type: ManageLoadReportDetailActionType.BEGIN,
        payload: { reportId },
      });
    },
    [dispatch],
  );

  return {
    loadReportDetail: boundAction,
    reportDetail,
    pending,
    error,
  };
};

export const useRemovePost = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.removePost.data,
      pending: state.manage.removePost.pending,
      error: state.manage.removePost.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (postId: number) => {
      dispatch({
        type: ManageRemovePostActionType.BEGIN,
        payload: { postId },
      });
    },
    [dispatch],
  );

  return {
    removePost: boundAction,
    result,
    pending,
    error,
  };
};

export const useRemoveAnswer = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.removeAnswer.data,
      pending: state.manage.removeAnswer.pending,
      error: state.manage.removeAnswer.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (answerId: number) => {
      dispatch({
        type: ManageRemoveAnswerActionType.BEGIN,
        payload: { answerId },
      });
    },
    [dispatch],
  );

  return {
    removeAnswer: boundAction,
    result,
    pending,
    error,
  };
};

export const useRemoveQestion = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.removeQuestion.data,
      pending: state.manage.removeQuestion.pending,
      error: state.manage.removeQuestion.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (questionId: number) => {
      dispatch({
        type: ManageRemoveQuestionActionType.BEGIN,
        payload: { questionId },
      });
    },
    [dispatch],
  );

  return {
    removeQuestion: boundAction,
    result,
    pending,
    error,
  };
};

export const reportReducer = {
  [ManageLoadReportsActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      reports: {
        ...state.reports,
        pending: true,
        error: null,
      },
    };
  },
  [ManageLoadReportsActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      reports: fillOffsetResponseData(state.reports, action),
    };
  },
  [ManageLoadReportsActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      reports: {
        ...state.reports,
        pending: false,
        error: action.error,
      },
    };
  },

  [ManageLoadReportDetailActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      reportDetail: {
        ...state.reportDetail,
        pending: true,
        error: null,
      },
    };
  },
  [ManageLoadReportDetailActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      reportDetail: {
        ...state.reports,
        data: action.payload,
        pending: false,
      },
    };
  },
  [ManageLoadReportDetailActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      reportDetail: {
        ...state.reportDetail,
        pending: false,
        error: action.error,
      },
    };
  },

  // remove post
  [ManageRemovePostActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removePost: {
        ...state.removePost,
        pending: true,
        error: null,
      },
    };
  },
  [ManageRemovePostActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removePost: {
        ...state.removePost,
        pending: false,
        data: action.payload,
      },
    };
  },
  [ManageRemovePostActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removePost: {
        ...state.removePost,
        pending: false,
        error: action.error,
      },
    };
  },

  // remove question
  [ManageRemoveQuestionActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeQuestion: {
        ...state.removeQuestion,
        pending: true,
        error: null,
      },
    };
  },
  [ManageRemoveQuestionActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeQuestion: {
        ...state.removeQuestion,
        pending: false,
        data: action.payload,
      },
    };
  },
  [ManageRemoveQuestionActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeQuestion: {
        ...state.removeQuestion,
        pending: false,
        error: action.error,
      },
    };
  },

  // remove answer
  [ManageRemoveAnswerActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeAnswer: {
        ...state.removeAnswer,
        pending: true,
        error: null,
      },
    };
  },
  [ManageRemoveAnswerActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeAnswer: {
        ...state.removeAnswer,
        pending: false,
        data: action.payload,
      },
    };
  },
  [ManageRemoveAnswerActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeAnswer: {
        ...state.removeAnswer,
        pending: false,
        error: action.error,
      },
    };
  },
};
