import * as actionTypes from './actionTypes';

export const authenticationStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authenticationFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authenticationSuccess = (localId, idToken, refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: localId,
        idToken: idToken,
        refreshToken: refreshToken
    };
};

export const signOut = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const signOutSuccess = () => {
    return {
        type: actionTypes.AUTH_SIGN_OUT
    };
};

export const checkAuthenticationTimeout = timeout => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        timeout: timeout
    };
};

export const authenticate = (email, password, signUp) => {
    return {
        type: actionTypes.AUTHENTICATE,
        email: email,
        password: password,
        signUp: signUp
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path: path
    };
};

export const restoreTokens = (userId, idToken, refreshToken) => {
    return {
        type: actionTypes.AUTH_RESTORE_TOKENS,
        userId: userId,
        idToken: idToken,
        refreshToken: refreshToken
    };
};

export const checkAuthState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};