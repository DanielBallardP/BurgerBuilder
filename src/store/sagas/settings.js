import { put, call } from 'redux-saga/effects';

import AxiosInstance from '../../axios-orders';
import * as actions from '../actions';

export function* loadSettingsSaga(action){
    yield put(actions.fetchSettingsStart());
    
    try{
        const response = yield AxiosInstance.get('/settings.json?auth='+action.idToken+'&orderBy="userId"&equalTo="'+action.userId+'"');
        const settings = yield response.data;
        const key = yield Object.keys(settings);

        if (settings[key] !== undefined) {
            yield put(actions.fetchSettings(settings[key]));
            yield call([localStorage, 'setItem'],'currency',settings[key].currency);
            yield call([localStorage, 'setItem'],'theme', settings[key].theme);
            yield call([localStorage, 'setItem'],'profileImage', settings[key].profileImage);
        } else {
            yield put(actions.fetchSettings({currency: 'EUR', theme: 'Blue', profileImage: 'empty'}));
            yield call([localStorage, 'setItem'],'currency','EUR');
            yield call([localStorage, 'setItem'],'theme', 'Blue');
            yield call([localStorage, 'setItem'],'profileImage', 'empty');
        }
    } catch(error){
        yield put(actions.fetchSettingsFailed(error));
    }
};

export function* sendSettingsSaga(action){
    yield put(actions.addSettingsStart());

    try{
        const getResponse = yield AxiosInstance.get('/settings.json?auth='+action.idToken+'&orderBy="userId"&equalTo="'+action.settings.userId+'"');
        const existingSettings = yield getResponse.data;
        const key = yield Object.keys(existingSettings);

        if (existingSettings[key] !== undefined) {
            yield AxiosInstance.patch('/settings/'+key+'/.json?auth='+action.idToken, action.settings);
        } else {
            yield AxiosInstance.post('/settings.json?auth='+action.idToken, action.settings);
        }
        yield put(actions.addSettingsSuccess(action.userId, action.settings));
    }catch (error) {
        yield put(actions.addSettingsFailed(error));
    }
};

export function* changePasswordSaga(action) {
    yield put(actions.changePasswordStart());

    const apiPathChangePassword = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`;

    const payload = {
        idToken: action.idToken,
        password: action.password,
        returnSecureToken: true
    };

    try {
        yield AxiosInstance.post(apiPathChangePassword, payload);
        yield put(actions.changePasswordSuccess());
    }catch(error){
        yield put(actions.changePasswordFailed(error));
    }
};

export function* deleteAccountSaga(action) {
    yield put(actions.deleteAccountStart());

    const apiPathDeleteUser = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.REACT_APP_API_KEY}`;

    try{
        yield AxiosInstance.post(apiPathDeleteUser, {idToken: action.idToken});
        yield put(actions.deleteAccountSuccess());
        yield put(actions.signOut());
    }catch(error){
        yield put(actions.deleteAccountFailed(error));
    }
};
