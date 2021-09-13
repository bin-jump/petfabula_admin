import { createAsyncActionType } from '../../shared';

export const GetCurrentUserActionType = createAsyncActionType(
  'AUTHENTICATION_CURRENT_USER',
);

export const PasswordLoginUserActionType = createAsyncActionType(
  'AUTHENTICATION_LOGIN_PASSWORD',
);

export const LogoutActionType = createAsyncActionType('AUTHENTICATION_LOGOUT');
