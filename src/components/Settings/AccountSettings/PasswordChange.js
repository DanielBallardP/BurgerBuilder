import React, {useState, useEffect, useCallback, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import AuthForm from '../Form/AuthForm';

import { updateObject, validateFormInput } from '../../../shared/utility';
import * as actions from '../../../store/actions';
import classes from './PasswordChange.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const passwordChange = props => {
    const {t} = useTranslation();

    const [passwordForm, setPasswordForm] = useState({
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: t('enterNewPassword', 'Enter new password')
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                error: ''
            },
            valid: false,
            touched: false
    }});

    const [changePassword, setChangePassword] = useState(false);
    const [passwordChangeError, setPasswordChangeError] = useState(false);

    const idToken = useSelector(state => state.auth.idToken);
    const isLoading = useSelector(state => state.settings.loading);
    const error = useSelector(state => state.settings.error);

    const dispatch = useDispatch();

    const authenticate = useCallback((idToken, formData) => dispatch(actions.authenticate(formData.email, formData.password, false)), []);
    const changeAccountPassword = useCallback((idToken, password) => dispatch(actions.changePassword(idToken, password)));

    useEffect(() => {
        if (error) {
            setPasswordChangeError(true);
        }
    }, [error]);

    const togglePasswordChange = () => {
        setChangePassword(prevState => !prevState);
    };

    const changePasswordHandler = formData => {
        authenticate(idToken, formData);
        changeAccountPassword(idToken, passwordForm.password.value);
    };

    const handleChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(passwordForm[inputIdentifier], {
            value: event.target.value,
            valid: validateFormInput(event.target.value, passwordForm[inputIdentifier].validation).result,
            error: validateFormInput(event.target.value, passwordForm[inputIdentifier].validation).reason,
            touched: true
        });
        const updatedAuthForm = updateObject(passwordForm, {[inputIdentifier]: updatedFormElement});

        setPasswordForm(updatedAuthForm);
    };

    let passwordChangeForm = (
            <Fragment>
                <p className={classes.Title}>{t('enterNewPassword', 'Enter new password')}</p>
                {Object.keys(passwordForm).map(formElement => {
                    const formObject = passwordForm[formElement];
                    
                    return (
                        <Input 
                        className={classes.Input} 
                        key={formElement} 
                            elementType={formObject.elementType} 
                            elementConfig={formObject.elementConfig} 
                            name={formElement} 
                            value={formObject.value} 
                            changed={event => handleChange(event, formElement)} 
                            valid={formObject.valid} 
                            validate={formObject.validation} 
                            validationError={formObject.error} 
                            touched={formObject.touched}
                        />
                        );
                })}
                <AuthForm formHandler={changePasswordHandler} title={'enterEmailAndPasswordToConfirmPasswordChange'} />
            </Fragment>
    );

    if (isLoading) {
        passwordChangeForm = <Spinner />
    }

    if (!changePassword) {
        passwordChangeForm = null;
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setPasswordChangeError(false);
    };

    const errorMessagePopUp = (
        <Snackbar open={passwordChangeError} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error ? error.message ? `Password change failed: ${error.message}` : 'Password change failed' : ''}
            </Alert>
        </Snackbar>
    );

    return (
        <div className={classes.PasswordChange}>
            <div>
                <Button disableElevation variant="contained" onClick={togglePasswordChange}>
                    {t('changePassword', 'Change password')}
                </Button>
            </div>
            {passwordChangeForm}
            {errorMessagePopUp}
        </div> 
    );
};

export default passwordChange;