import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isLoading: false,
    userId: null,
    idToken: null,
    refreshToken: null,
    error: null,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {isLoading: true, error: null});
};

const authFailed = (state, action) => {
    return updateObject(state, {isLoading: false, error: action.error});
};

const authSuccess = (state, action) => {
    return updateObject(state, {isLoading: false, error: null, userId: action.userId, idToken: action.idToken, refreshToken: action.refreshToken});
};

const authSignOut = (state, action) => {
    return updateObject(state, {userId: null, idToken: null, refreshToken: null});
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path });
};

const restoreAuthToken = (state, action) => {
    return updateObject(state, {userId: action.userId, idToken: action.idToken, refreshToken: action.refreshToken});
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);

        case actionTypes.AUTH_FAILED: return authFailed(state, action);
            
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);

        case actionTypes.AUTH_SIGN_OUT: return authSignOut(state, action);

        case actionTypes.AUTH_SET_REDIRECT_PATH: return setAuthRedirectPath(state, action);

        case actionTypes.AUTH_RESTORE_TOKENS: return restoreAuthToken(state, action);

        default: return state;
    }
};

export default auth;