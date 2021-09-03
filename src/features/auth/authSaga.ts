import { authActions, LoginPayLoad } from './authSlice';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { history } from 'utils(nhung ham share chung)/history';

function* handleLogIn(payload: LoginPayLoad) {
  try {
    yield delay(1000); //Thay thế cho gọi API (yield call)

    localStorage.setItem('access_token', 'fake login');

    //dispatch action loginSuccess
    // yield put({ type: authActions.loginSuccess.type, payload: { id: 1, name: 'NHK' } });
    yield put(authActions.loginSuccess({ id: 1, name: 'NHK' }));
  } catch (error) {
    yield put(authActions.loginFailed(error));
  }
  //redirect to admin page
  history.push('./');
}
function* handleLogOut() {
  localStorage.removeItem('access_token');
  //redirect to login page
  history.push('../login');
}
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayLoad> = yield take(authActions.login.type);
      yield fork(handleLogIn, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogOut);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
