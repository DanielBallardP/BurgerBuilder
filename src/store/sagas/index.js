import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthenticationTimeoutSaga, authenticateSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { loadOrdersSaga, sendOrderSaga, deleteOrderSaga } from './order';
import { loadSettingsSaga, sendSettingsSaga, changePasswordSaga, deleteAccountSaga } from './settings';

export function* watchAuth(){
    yield all([
        yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthenticationTimeoutSaga),
        yield takeLatest(actionTypes.AUTHENTICATE, authenticateSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
};

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
};

export function* watchOrders(){
    yield all([
        yield takeEvery(actionTypes.LOAD_ORDERS, loadOrdersSaga),
        yield takeLatest(actionTypes.SEND_ORDER, sendOrderSaga),
        yield takeLatest(actionTypes.DELETE_ORDER, deleteOrderSaga)
    ]);
};

export function* watchSettings(){
    yield all([
        yield takeLatest(actionTypes.LOAD_SETTINGS, loadSettingsSaga),
        yield takeLatest(actionTypes.SEND_SETTINGS, sendSettingsSaga),
        yield takeLatest(actionTypes.CHANGE_PASSWORD, changePasswordSaga),
        yield takeLatest(actionTypes.DELETE_ACCOUNT, deleteAccountSaga)
    ]);
};
