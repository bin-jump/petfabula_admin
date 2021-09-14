import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from 'redux';
import { ActionBase, ReduxAsyncAction } from '../features/shared';
import { LogoutActionType } from '../features/login/redux/actionTypes';
import { message } from 'antd';

const toaster = {
  error: (msg: string) => {
    message.error(msg);
  },
  info: (msg: string) => {
    message.info(msg);
  },
};

export const toastHandleMiddleware: Middleware<Dispatch> =
  ({ dispatch }: MiddlewareAPI) =>
  (next) =>
  (action: AnyAction) => {
    const actionBase = action as ActionBase;
    //   if (actionBase.error?.type) {

    //   }
    const message = actionBase.message;

    if (actionBase.type.endsWith('FAILURE')) {
      if (actionBase.error?.type == 'FAILED_ON_RESPONSE') {
        toaster.error('error.noNetwork');
      } else if (actionBase.error?.type == 'SERVICE_ERROR') {
        toaster.error('error.serviceError');
      } else if (actionBase.error?.type == 'AUTHENTICATION_REQUIRED') {
        toaster.error('error.authenticationRequired');
        // force logout out of dated login state
        dispatch({ type: LogoutActionType.SUCCESS });
        // just clear the whole state
        // action = { type: LogoutActionType.SUCCESS };
      } else if (message) {
        toaster.error(message);
      }
    }

    return next(action);
  };
