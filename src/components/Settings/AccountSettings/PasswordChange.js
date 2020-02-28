import React, {useState, useCallback, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import AuthForm from '../Form/AuthForm';

import { updateObject, validateFormInput } from '../../../shared/utility';
import * as actions from '../../../store/actions';
import classes from './PasswordChange.css';

import Button from '@material-ui/core/Button';

const PasswordChange = props => {
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

    const idToken = useSelector(state => state.auth.idToken);
    const isLoading = useSelector(state => state.settings.loading);

    const dispatch = useDispatch();

    const authenticate = useCallback((idToken, formData) => dispatch(actions.authenticate(formData.email, formData.password, false)), [dispatch]);
    const changeAccountPassword = useCallback((idToken, password) => dispatch(actions.changePassword(idToken, password)), [dispatch]);

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

    return (
        <div className={classes.PasswordChange}>
            <div>
                <Button disableElevation variant="contained" onClick={togglePasswordChange}>
                    {t('changePassword', 'Change password')}
                </Button>
            </div>
            {passwordChangeForm}
        </div> 
    );
};

export default PasswordChange;