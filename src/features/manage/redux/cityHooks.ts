import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../../../store';
import { ManageState, CityForm, UpdateCityForm, City } from './types';
import {
  LoadPrefecturesActionType,
  CreateCityActionType,
  UpdateCityActionType,
} from './actionTypes';
import { ActionBase } from '../../shared';

export const useLoadPrefectures = () => {
  const dispatch = useDispatch();
  const { prefectures, pending, error } = useSelector(
    (state: AppState) => ({
      prefectures: state.manage.prefectures.data,
      pending: state.manage.prefectures.pending,
      error: state.manage.prefectures.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch({
      type: LoadPrefecturesActionType.BEGIN,
    });
  }, [dispatch]);

  return {
    loadPrefectures: boundAction,
    prefectures,
    pending,
    error,
  };
};

export const useCreateCity = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.createCity.data,
      pending: state.manage.createCity.pending,
      error: state.manage.createCity.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: CityForm) => {
      dispatch({
        type: CreateCityActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    createCity: boundAction,
    result,
    pending,
    error,
  };
};

export const useUpdateCity = () => {
  const dispatch = useDispatch();
  const { result, pending, error } = useSelector(
    (state: AppState) => ({
      result: state.manage.updateCity.data,
      pending: state.manage.updateCity.pending,
      error: state.manage.updateCity.error,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (form: UpdateCityForm) => {
      dispatch({
        type: UpdateCityActionType.BEGIN,
        payload: form,
      });
    },
    [dispatch],
  );

  return {
    updateCity: boundAction,
    result,
    pending,
    error,
  };
};

export const cityReducer = {
  [LoadPrefecturesActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      prefectures: {
        ...state.prefectures,
        pending: true,
        error: null,
      },
    };
  },
  [LoadPrefecturesActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      prefectures: {
        ...state.prefectures,
        data: action.payload,
        pending: false,
      },
    };
  },
  [LoadPrefecturesActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      prefectures: {
        ...state.prefectures,
        pending: false,
        error: action.error,
      },
    };
  },

  [CreateCityActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createCity: {
        ...state.createCity,
        pending: true,
        error: null,
      },
    };
  },
  [CreateCityActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const prefectures = state.prefectures.data;
    const city = action.payload as City;
    return {
      ...state,
      createCity: {
        ...state.createCity,
        pending: false,
        data: action.payload,
      },
      prefectures: {
        ...state.prefectures,
        data: prefectures.map((item) => {
          if (item.id == city.prefectureId) {
            return { ...item, cities: [...item.cities, city] };
          }
          return item;
        }),
      },
    };
  },
  [CreateCityActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      createCity: {
        ...state.createCity,
        pending: false,
        error: action.error,
      },
    };
  },

  [UpdateCityActionType.BEGIN]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateCity: {
        ...state.updateCity,
        pending: true,
        error: null,
      },
    };
  },
  [UpdateCityActionType.SUCCESS]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    const prefectures = state.prefectures.data;
    const city = action.payload as City;
    return {
      ...state,
      updateCity: {
        ...state.updateCity,
        pending: false,
        data: action.payload,
      },
      prefectures: {
        ...state.prefectures,
        data: prefectures.map((item) => {
          if (item.id == city.prefectureId) {
            return {
              ...item,
              cities: item.cities.map((c) => {
                if (city.id == c.id) {
                  return city;
                }
                return c;
              }),
            };
          }
          return item;
        }),
      },
    };
  },
  [UpdateCityActionType.FAILURE]: (
    state: ManageState,
    action: ActionBase,
  ): ManageState => {
    return {
      ...state,
      updateCity: {
        ...state.updateCity,
        pending: false,
        error: action.error,
      },
    };
  },
};
