import { createReducer, ActionBase } from '../../shared';
import { LoginState } from './types';
import { loginReducer } from './loginHooks';

const initialStat: LoginState = {
  passwordLoginResult: { data: null, pending: false, error: null },
  logoutResult: { data: null, pending: false, error: null },
  currentUser: { data: null, pending: false, error: null },
};

export const loginRootReducer = createReducer<LoginState, ActionBase>(
  initialStat,
  {
    ...loginReducer,
  },
);
