import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import AxiosInstance from '../../axios-orders';

export function* logoutSaga(action){
    yield call([localStorage, 'removeItem'], 'userId');
    yield call([localStorage, 'removeItem'], 'idToken');
    yield call([localStorage, 'removeItem'], 'refreshToken');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'currency');
    yield call([localStorage, 'removeItem'], 'theme');
    yield call([localStorage, 'removeItem'], 'profileImage');
    yield put(actions.signOutSuccess());
};

export function* checkAuthenticationTimeoutSaga(action){
    yield delay(action.timeout);
    yield put(actions.signOut());
};

export function* authenticateSaga(action){
    yield put(actions.authenticationStart());
    const apiPath = action.signUp ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}` : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    try {
        const response = yield AxiosInstance.post(apiPath, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield call([localStorage, 'setItem'],'userId', response.data.localId);
        yield call([localStorage, 'setItem'], 'idToken', response.data.idToken);
        yield call([localStorage, 'setItem'], 'refreshToken', response.data.refreshToken);
        yield call([localStorage, 'setItem'], 'expirationDate', expirationDate);
        yield put(actions.authenticationSuccess(response.data.localId, response.data.idToken, response.data.refreshToken));
    } catch(error) {
        yield put (actions.authenticationFailed(error));
    }
};

export function* authCheckStateSaga(action){
    const idToken = yield localStorage.getItem('idToken');
    if (!idToken) {
        yield put(actions.signOut());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.signOut());
        } else {
            const userId = yield localStorage.getItem('userId');
            const refreshToken = yield localStorage.getItem('refreshToken');
            const authData = {
                userId: userId,
                idToken: idToken,
                refreshToken: refreshToken
            };
            yield put(actions.authenticationSuccess(authData));
            yield put(actions.checkAuthenticationTimeout(expirationDate.getTime() - new Date().getTime()) / 1000);
        }
    }
};
