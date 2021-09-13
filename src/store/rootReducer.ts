import { combineReducers } from 'redux';

const appReducer = combineReducers({});

const rootReducer = (state: any, action: any) => {
  //   if (action.type === LogoutActionType.SUCCESS) {
  //     return appReducer(undefined, action);
  //   }

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
