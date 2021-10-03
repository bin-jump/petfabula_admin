import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import {
  ManageState,
  PostTopic,
  PostTopicCategory,
  PostTopicCategoryForm,
  PostTopicForm,
  UpdatePostTopicCategoryForm,
  UpdatePostTopicForm,
} from './types';
import {
  LoadTopicCategoriesActionType,
  CreateTopicActionType,
  CreateTopicCategoryActionType,
  UpdateTopicActionType,
  UpdateTopicCategoryActionType,
  RemoveTopicActionType,
  RemoveTopicCategoryActionType,
} from './actionTypes';
import { ActionBase } from '../../shared';

export const useLoadTopicCategories = () => {
  const dispatch = useDispatch();
  const { topicCategories, pending, error } = useSelector(
    (state: AppState) => ({
      topicCategories: state.manage.topicCategories.data,
      pending: state.manage.topicCategories.pending,
      error: state.manage.topicCategories.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({
      type: LoadTopicCategoriesActionType.BEGIN,
    });
  }, [dispatch]);

  return {
    loadTopicCategories: boundAction,
    topicCategories,
    pending,
    error,
  };
};

export const useCreateTopicCategories = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.createTopicCategory.data,
      pending: state.manage.createTopicCategory.pending,
      error: state.manage.createTopicCategory.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: PostTopicCategoryForm) => {
      dispatch({
        type: CreateTopicCategoryActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    createTopicCategory: boundAction,
    result,
    pending,
    error,
  };
};

export const useCreateTopic = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.createTopic.data,
      pending: state.manage.createTopic.pending,
      error: state.manage.createTopic.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: PostTopicForm) => {
      dispatch({
        type: CreateTopicActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    createTopic: boundAction,
    result,
    pending,
    error,
  };
};

export const useUpdateTopicCategories = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.updateTopicCategory.data,
      pending: state.manage.updateTopicCategory.pending,
      error: state.manage.updateTopicCategory.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: UpdatePostTopicCategoryForm) => {
      dispatch({
        type: UpdateTopicCategoryActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    updateTopicCategory: boundAction,
    result,
    pending,
    error,
  };
};

export const useUpdateTopic = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.updateTopic.data,
      pending: state.manage.updateTopic.pending,
      error: state.manage.updateTopic.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: UpdatePostTopicForm) => {
      dispatch({
        type: UpdateTopicActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    updateTopic: boundAction,
    result,
    pending,
    error,
  };
};

export const useRemoveTopicCategory = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.removeTopicCategory.data,
      pending: state.manage.removeTopicCategory.pending,
      error: state.manage.removeTopicCategory.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (topicCategoryId: number) => {
      dispatch({
        type: RemoveTopicCategoryActionType.BEGIN,
        payload: { topicCategoryId },
      });
    },
    [dispatch],
  );

  return {
    removeTopicCategory: boundAction,
    result,
    pending,
    error,
  };
};

export const useRemoveTopic = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.removeTopic.data,
      pending: state.manage.removeTopic.pending,
      error: state.manage.removeTopic.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (topicId: number) => {
      dispatch({
        type: RemoveTopicActionType.BEGIN,
        payload: { topicId },
      });
    },
    [dispatch],
  );

  return {
    removeTopic: boundAction,
    result,
    pending,
    error,
  };
};

export const postTopicReducer = {
  // categories
  [LoadTopicCategoriesActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      topicCategories: {
        ...state.topicCategories,
        pending: true,
        error: null,
      },
    };
  },
  [LoadTopicCategoriesActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      topicCategories: {
        ...state.topicCategories,
        data: action.payload,
        pending: false,
      },
    };
  },
  [LoadTopicCategoriesActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      topicCategories: {
        ...state.topicCategories,
        pending: false,
        error: action.error,
      },
    };
  },

  [CreateTopicCategoryActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createTopicCategory: {
        ...state.createTopicCategory,
        pending: true,
        error: null,
      },
    };
  },
  [CreateTopicCategoryActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const topicCategories = state.topicCategories.data;
    const createdCategories = action.payload as PostTopicCategory;
    return {
      ...state,
      createTopicCategory: {
        ...state.createTopicCategory,
        data: action.payload,
        pending: false,
      },
      topicCategories: {
        ...state.topicCategories,
        data: [...topicCategories, createdCategories],
      },
    };
  },
  [CreateTopicCategoryActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createTopicCategory: {
        ...state.createTopicCategory,
        pending: false,
        error: action.error,
      },
    };
  },

  [UpdateTopicCategoryActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateTopicCategory: {
        ...state.updateTopicCategory,
        pending: true,
        error: null,
      },
    };
  },
  [UpdateTopicCategoryActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const topicCategories = state.topicCategories.data;
    const updatedCategories = action.payload as PostTopicCategory;
    return {
      ...state,
      updateTopicCategory: {
        ...state.updateTopicCategory,
        data: action.payload,
        pending: false,
      },
      topicCategories: {
        ...state.topicCategories,
        data: topicCategories.map((item) => {
          if (updatedCategories.id == item.id) {
            const topicList = item.topics.map((t) => ({
              ...t,
              topicCategoryTitle: updatedCategories.title,
            }));
            return { ...updatedCategories, topics: topicList };
          }
          return item;
        }),
      },
    };
  },
  [UpdateTopicCategoryActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateTopicCategory: {
        ...state.updateTopicCategory,
        pending: false,
        error: action.error,
      },
    };
  },

  [RemoveTopicCategoryActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeTopicCategory: {
        ...state.removeTopicCategory,
        pending: true,
        error: null,
      },
    };
  },
  [RemoveTopicCategoryActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const topicCategories = state.topicCategories.data;
    const removedCategories = action.payload as PostTopicCategory;
    return {
      ...state,
      removeTopicCategory: {
        ...state.removeTopicCategory,
        data: action.payload,
        pending: false,
      },
      topicCategories: {
        ...state.topicCategories,
        data: topicCategories.filter((item) => item.id != removedCategories.id),
      },
    };
  },
  [RemoveTopicCategoryActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeTopicCategory: {
        ...state.removeTopicCategory,
        pending: false,
        error: action.error,
      },
    };
  },

  // topics
  [CreateTopicActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createTopic: {
        ...state.createTopic,
        pending: true,
        error: null,
      },
    };
  },
  [CreateTopicActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const topicCategories = state.topicCategories.data;
    const createdTopic = action.payload as PostTopic;
    return {
      ...state,
      createTopic: {
        ...state.createTopic,
        data: action.payload,
        pending: false,
      },
      topicCategories: {
        ...state.topicCategories,
        data: topicCategories.map((item) => {
          if (item.id == createdTopic.topicCategoryId) {
            return { ...item, topics: [...item.topics, createdTopic] };
          }
          return item;
        }),
      },
    };
  },
  [CreateTopicActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createTopic: {
        ...state.createTopic,
        pending: false,
        error: action.error,
      },
    };
  },

  [UpdateTopicActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateTopic: {
        ...state.updateTopic,
        pending: true,
        error: null,
      },
    };
  },
  [UpdateTopicActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const topicCategories = state.topicCategories.data;
    const updatedTopic = action.payload as PostTopic;
    return {
      ...state,
      updateTopic: {
        ...state.updateTopic,
        data: action.payload,
        pending: false,
      },
      topicCategories: {
        ...state.topicCategories,
        data: topicCategories.map((item) => {
          if (item.id == updatedTopic.topicCategoryId) {
            return {
              ...item,
              topics: item.topics.map((tp) => {
                if (tp.id == updatedTopic.id) {
                  return updatedTopic;
                }
                return tp;
              }),
            };
          }
          return item;
        }),
      },
    };
  },
  [UpdateTopicActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateTopic: {
        ...state.updateTopic,
        pending: false,
        error: action.error,
      },
    };
  },

  [RemoveTopicActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeTopic: {
        ...state.removeTopic,
        pending: true,
        error: null,
      },
    };
  },
  [RemoveTopicActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const topicCategories = state.topicCategories.data;
    const removedTopic = action.payload as PostTopic;
    return {
      ...state,
      removeTopic: {
        ...state.removeTopic,
        data: action.payload,
        pending: false,
      },
      topicCategories: {
        ...state.topicCategories,
        data: topicCategories.map((item) => {
          if (item.id == removedTopic.topicCategoryId) {
            return {
              ...item,
              topics: item.topics.filter((tp) => tp.id != removedTopic.id),
            };
          }
          return item;
        }),
      },
    };
  },
  [RemoveTopicActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      removeTopic: {
        ...state.removeTopic,
        pending: false,
        error: action.error,
      },
    };
  },
};
