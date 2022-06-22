import {all, fork} from 'redux-saga/effects';
import {combineReducers} from 'redux';

import UserReducer from './user/reducer';
import UserSaga from './user/sagas';

export const createRootReducer = () => {
  return combineReducers({
    user: UserReducer,
  });
};

export function* rootSaga() {
  yield all([fork(UserSaga)]);
}
