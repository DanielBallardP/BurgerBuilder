import * as actionTypes from './actionTypes';

export const changeCurrency = currency => {
    return {
        type: actionTypes.CHANGE_CURRENCY,
        currency: currency
    };
};

export const restoreCurrency = () => {
    const currency = localStorage.getItem('currency');

    return {
        type: actionTypes.RESTORE_CURRENCY,
        currency: currency ? currency : 'EUR'
    };
};

export const changeTheme = theme => {
    return {
        type: actionTypes.CHANGE_THEME,
        theme: theme
    };
};

export const restoreTheme = () => {
    const theme = localStorage.getItem('theme');

    return {
        type: actionTypes.RESTORE_THEME,
        theme: theme ? theme : 'Blue'
    };
};

export const changeLanguage = languageCode => {
    localStorage.setItem('languageCode', languageCode);

    return {
        type: actionTypes.CHANGE_LANGUAGE,
        languageCode: languageCode
    };
};

export const restoreLanguage = () => {
    const languageCode = localStorage.getItem('languageCode');

    return {
        type: actionTypes.RESTORE_LANGUAGE,
        languageCode: languageCode ? languageCode : 'en'
    };
};

export const changeProfileImage = profileImage => {
    return {
        type: actionTypes.CHANGE_PROFILE_IMAGE,
        profileImage: profileImage
    };
};

export const restoreProfileImage = () => {
    const profileImage = localStorage.getItem('profileImage');

    return {
        type: actionTypes.RESTORE_PROFILE_IMAGE,
        profileImage: profileImage ? profileImage : ''
    };
};

export const removeProfileImage = () => {
    return {
        type: actionTypes.REMOVE_PROFILE_IMAGE
    };
};

export const addSettingsLocally= settings => {
    return {
        type: actionTypes.ADD_SETTINGS_LOCALLY,
        settings: settings
    };
};

export const addSettingsStart = () => {
    return {
        type: actionTypes.ADD_SETTINGS_START
    };
};

export const addSettingsSuccess = (userId, settings) => {
    localStorage.setItem('currency', settings.currency);
    localStorage.setItem('theme', settings.theme);
    localStorage.setItem('profileImage', settings.profileImage);
    
    return {
        type: actionTypes.ADD_SETTINGS_SUCCESS,
        settings: settings,
        userId: userId
    };
};

export const addSettingsFailed = error => {
    return {
        type: actionTypes.ADD_SETTINGS_FAILED,
        error: error
    };
};

export const sendSettings = (settings, token) => {
    return {
        type: actionTypes.SEND_SETTINGS,
        settings: settings,
        idToken: token
    };
};

export const fetchSettingsStart = () => {
    return {
        type: actionTypes.FETCH_SETTINGS_START
    };
};

export const fetchSettings = settings => {
    return {
        type: actionTypes.FETCH_SETTINGS_SUCCESS,
        settings: settings
    };
};

export const fetchSettingsFailed = error => {
    return {
        type: actionTypes.FETCH_SETTINGS_FAILED,
        error: error
    };
};

export const loadSettings = (token, userId) => {
    return {
        type: actionTypes.LOAD_SETTINGS,
        idToken: token,
        userId: userId
    };
};

export const changePasswordStart = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_START
    };
};

export const changePasswordSuccess = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_SUCCESS
    };
};

export const changePasswordFailed = error => {
    return {
        type: actionTypes.CHANGE_PASSWORD_FAILED,
        error: error
    };
};

export const changePassword = (token, newPassword) => {
    return {
        type: actionTypes.CHANGE_PASSWORD,
        idToken: token,
        password: newPassword
    };
};

export const deleteAccountStart = () => {
    return {
        type: actionTypes.DELETE_ACCOUNT_START
    };
};

export const deleteAccountSuccess = () => {
    return {
        type: actionTypes.DELETE_ACCOUNT_SUCCESS
    };
};

export const deleteAccountFailed = error => {
    return {
        type: actionTypes.DELETE_ACCOUNT_FAILED,
        error: error
    };
};

export const deleteAccount = (token, email, password) => {
    return {
        type: actionTypes.DELETE_ACCOUNT,
        idToken: token,
        email: email,
        password: password
    };
};
