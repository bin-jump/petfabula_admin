import { createReducer, ActionBase } from '../../shared';
import { SettingState } from './types';
import { passwordReducer } from './passwordHooks';

const initialStat: SettingState = {
  changePassword: {
    data: null,
    pending: false,
    error: null,
  },
};

export const settingRootReducer = createReducer<SettingState, ActionBase>(
  initialStat,
  {
    ...passwordReducer,
  },
);
