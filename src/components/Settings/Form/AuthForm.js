import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import Input from '../../UI/Input/Input';
import { updateObject, validateFormInput } from '../../../shared/utility';

import classes from './AuthForm.css';

import Button from '@material-ui/core/Button';

const AuthForm = props => {
    const {t} = useTranslation();

    const {formHandler, title} = props;

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: t('yourEmail', 'Your email')
            },
            value: '',
            validation: {
                required: true,
                contains: '@',
                error: ''
            },
            valid: false,
            touched: false
    },
    password: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: t('yourPassword', 'Your password')
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

    const formHandlerWrapper = (event, formHandler) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in authForm) {
            formData[formElementIdentifier] = authForm[formElementIdentifier].value;
        }

        formHandler(formData);
    };

    const handleChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(authForm[inputIdentifier], {
            value: event.target.value,
            valid: validateFormInput(event.target.value, authForm[inputIdentifier].validation).result,
            error: validateFormInput(event.target.value, authForm[inputIdentifier].validation).reason,
            touched: true
        });
        const updatedAuthForm = updateObject(authForm, {[inputIdentifier]: updatedFormElement});

        setAuthForm(updatedAuthForm);
    };

    const isAuthFormValid = () => {
        let authFormValid = true;

        for (let key in authForm) {
            if (!authForm[key].valid) {
                authFormValid = false;
            } 
        }
        return authFormValid;
    };

    const authFormValid = isAuthFormValid();

    return (
        <form onSubmit={formHandlerWrapper}>
            <p className={classes.Title}>{t(title)}</p>
            {Object.keys(authForm).map(formElement => {
                const formObject = authForm[formElement];

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
            <Button 
                disableElevation
                disabled={!authFormValid} 
                className={classes.SubmitButton} 
                variant="contained" 
                onClick={event => formHandlerWrapper(event, formHandler)}
            >
                {t('confirm', 'Confirm')}
            </Button>
        </form>
    );
};

export default AuthForm;