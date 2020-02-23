import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';

const initialState = {
    loading: false,
    error: null,
    changed: false,
    languageCode: 'en',
    settings: {
        currency: 'EUR',
        theme: 'Blue',
        profileImage: null,
        userId: null
    }
};

const settings = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENCY:
            return updateObject(state, {changed: true, settings: {...state.settings, currency: action.currency}});
    
        case actionTypes.RESTORE_CURRENCY:
            return updateObject(state, {settings: {...state.settings, currency: action.currency}});

        case actionTypes.CHANGE_THEME:
            return updateObject(state, {changed: true, settings: {...state.settings, theme: action.theme}});

        case actionTypes.RESTORE_THEME:
            return updateObject(state, {settings: {...state.settings, theme: action.theme}});

        case actionTypes.CHANGE_LANGUAGE:
            return updateObject(state, {languageCode: action.languageCode});

        case actionTypes.RESTORE_LANGUAGE:
            return updateObject(state, {languageCode: action.languageCode});

        case actionTypes.CHANGE_PROFILE_IMAGE:
            return updateObject(state, {changed: true, settings: {...state.settings, profileImage: action.profileImage}});

        case actionTypes.RESTORE_PROFILE_IMAGE:
            return updateObject(state, {settings: {...state.settings, profileImage: action.profileImage}});

        case actionTypes.REMOVE_PROFILE_IMAGE:
            return updateObject(state, {changed: true, settings: {...state.settings, profileImage: avatarPlaceholder}});

        case actionTypes.ADD_SETTINGS_START:
            return updateObject(state, {loading: true, error: null});

        case actionTypes.ADD_SETTINGS_SUCCESS:
            const newSettings = {
                    ...action.settings
            };

            return updateObject(state, {loading: false, changed: false, settings: newSettings});

        case actionTypes.ADD_SETTINGS_FAILED:
            return updateObject(state, {loading: false, changed: false, error: action.error});

        case actionTypes.FETCH_SETTINGS_START:
            return updateObject(state, {loading: true, error: null});

        case actionTypes.FETCH_SETTINGS_SUCCESS:
            const fetchedSettings = {
                    ...action.settings
            };
            
            return updateObject(state, {loading: false, changed: false, settings: fetchedSettings});

        case actionTypes.FETCH_SETTINGS_FAILED:
            return updateObject(state, {loading: false, error: action.error});

        case actionTypes.CHANGE_PASSWORD_START:
            return updateObject(state, {loading: true, error: null});

        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return updateObject(state, {loading: false, changed: false});

        case actionTypes.CHANGE_PASSWORD_FAILED:
            return updateObject(state, {loading: false, error: action.error});

        case actionTypes.DELETE_ACCOUNT_START:
            return updateObject(state, {loading: true, error: null});

        case actionTypes.DELETE_ACCOUNT_SUCCESS:
            return updateObject(state, {loading: false, changed: false});

        case actionTypes.DELETE_ACCOUNT_FAILED:
            return updateObject(state, {loading: false, error: action.error});

        default: return state;
    }
};

export default settings;