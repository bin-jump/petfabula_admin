import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import {
  ManageState,
  PetBreedForm,
  UpdatePetBreedForm,
  PetBreed,
} from './types';
import {
  LoadPetCategoryActionType,
  CreatePetBreedActionType,
  UpdatePetBreedActionType,
} from './actionTypes';
import { ActionBase } from '../../shared';

export const useLoadPetCategories = () => {
  const dispatch = useDispatch();
  const { petCategories, pending, error } = useSelector(
    (state: AppState) => ({
      petCategories: state.manage.petCategories.data,
      pending: state.manage.petCategories.pending,
      error: state.manage.petCategories.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({
      type: LoadPetCategoryActionType.BEGIN,
    });
  }, [dispatch]);

  return {
    loadPetCategories: boundAction,
    petCategories,
    pending,
    error,
  };
};

export const useCreatePetBreed = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.createPetBreed.data,
      pending: state.manage.createPetBreed.pending,
      error: state.manage.createPetBreed.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: PetBreedForm) => {
      dispatch({
        type: CreatePetBreedActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    createPetBreed: boundAction,
    result,
    pending,
    error,
  };
};

export const useUpdatePetBreed = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.updatePetBreed.data,
      pending: state.manage.updatePetBreed.pending,
      error: state.manage.updatePetBreed.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: UpdatePetBreedForm) => {
      dispatch({
        type: UpdatePetBreedActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    updatePetBreed: boundAction,
    result,
    pending,
    error,
  };
};

export const petBreedReducer = {
  [LoadPetCategoryActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      petCategories: {
        ...state.petCategories,
        pending: true,
        error: null,
      },
    };
  },
  [LoadPetCategoryActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      petCategories: {
        ...state.petCategories,
        data: action.payload,
        pending: false,
      },
    };
  },
  [LoadPetCategoryActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      petCategories: {
        ...state.petCategories,
        pending: false,
        error: action.error,
      },
    };
  },

  [CreatePetBreedActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createPetBreed: {
        ...state.createPetBreed,
        pending: true,
        error: null,
      },
    };
  },
  [CreatePetBreedActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const categories = state.petCategories.data;
    const createdBreed = action.payload as PetBreed;
    return {
      ...state,
      createPetBreed: {
        ...state.createPetBreed,
        pending: false,
        data: action.payload,
      },
      petCategories: {
        ...state.petCategories,
        data: categories.map((item) => {
          if (item.id == createdBreed.categoryId) {
            return { ...item, petBreeds: [...item.petBreeds, createdBreed] };
          }
          return item;
        }),
      },
    };
  },
  [CreatePetBreedActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createPetBreed: {
        ...state.createPetBreed,
        pending: false,
        error: action.error,
      },
    };
  },

  [UpdatePetBreedActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updatePetBreed: {
        ...state.updatePetBreed,
        pending: true,
        error: null,
      },
    };
  },
  [UpdatePetBreedActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const categories = state.petCategories.data;
    const updatedBreed = action.payload as PetBreed;
    return {
      ...state,
      updatePetBreed: {
        ...state.updatePetBreed,
        pending: false,
        data: action.payload,
      },
      petCategories: {
        ...state.petCategories,
        data: categories.map((item) => {
          if (item.id == updatedBreed.categoryId) {
            return {
              ...item,
              petBreeds: item.petBreeds.map((b) => {
                if (b.id == updatedBreed.id) {
                  return updatedBreed;
                }
                return b;
              }),
            };
          }
          return item;
        }),
      },
    };
  },
  [UpdatePetBreedActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updatePetBreed: {
        ...state.updatePetBreed,
        pending: false,
        error: action.error,
      },
    };
  },
};
