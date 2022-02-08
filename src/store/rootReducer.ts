import { combineReducers } from 'redux';
import { loginRootReducer } from '../features/login/redux';
import { manageRootReducer } from '../features/manage/redux';
import { settingRootReducer } from '../features/setting/redux';
import { LogoutActionType } from '../features/login/redux/actionTypes';

const appReducer = combineReducers({
  login: loginRootReducer,
  manage: manageRootReducer,
  setting: settingRootReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LogoutActionType.SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

// const rootReducer = combineReducers({
//   authentication: authenticationRootReducer,
//   community: communityRootReducer,
//   notification: notificationRootReducer,
//   pet: petRootReducer,
//   user: userRootReducer,
// });

export default rootReducer;
