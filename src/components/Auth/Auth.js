import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';

import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';

import { updateObject, validateFormInput } from '../../shared/utility';
import * as actions from '../../store/actions';
import classes from './Auth.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const auth = props => {
    const {t} = useTranslation();

    const [signForm, setSignForm] = useState({
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

    const [isSignUp, setIsSignUp] = useState(true);

    const handleToggleChange = event => {
        setIsSignUp(!isSignUp);
      };

    const [authenticationError, setAuthenticationError] = useState(false);

    const isLoading = useSelector(state => state.auth.isLoading);
    const error = useSelector(state => state.auth.error);
    const loggedIn = useSelector(state => state.auth.idToken != null);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
    const building = useSelector(state => state.burgerBuilder.building);

    const dispatch = useDispatch();

    const authenticate = (signForm, signUp) => dispatch(actions.authenticate(signForm.email, signForm.password, signUp));
    const setAuthRedirectPath = () => dispatch(actions.setAuthRedirectPath('/'));
    const hideBurgerStepper = useCallback(() => dispatch(actions.hideBurgerStepper()), []);

    useEffect(() => {
        hideBurgerStepper();

        if (!building){
            setAuthRedirectPath();
        }

        if (error !== null) {
            setAuthenticationError(true);
        }
    }, [error])

    const signInHandler = event => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in signForm) {
            formData[formElementIdentifier] = signForm[formElementIdentifier].value;
        }

        authenticate(formData, isSignUp);
    }

    const handleChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(signForm[inputIdentifier], {
            value: event.target.value,
            valid: validateFormInput(event.target.value, signForm[inputIdentifier].validation).result,
            error: validateFormInput(event.target.value, signForm[inputIdentifier].validation).reason,
            touched: true
        });
        const updatedSignForm = updateObject(signForm, {[inputIdentifier]: updatedFormElement});

        setSignForm(updatedSignForm);
    }

    const isSignFormValid = () => {
        let signFormValid = true;

        for (let key in signForm) {
            if (!signForm[key].valid) {
                signFormValid = false;
            } 
        }
        return signFormValid;
    };

    const signFormValid = isSignFormValid();

    let form = (
        <form onSubmit={signInHandler}>
            {Object.keys(signForm).map(formElement => {
                const formObject = signForm[formElement];

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
            <Button disableElevation
                className={classes.SubmitButton} 
                disabled={!signFormValid} 
                variant="contained" 
                onClick={signInHandler}
            >
                {isSignUp ? t('signUp','Sign Up') : t('signIn','Sign In')}
            </Button>
        </form>
    );

    if (isLoading) {
        form = <Spinner />
    }

    let authenticationRedirect = null;

    if (loggedIn){
        authenticationRedirect = <Redirect to={authRedirectPath} />;
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setAuthenticationError(false);
    };

    const errorMessagePopUp = (
        <Snackbar open={authenticationError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
        {error ? error.message ? `Authentication failed: ${error.message}` : 'Authentication failed' : ''}
        </Alert>
        </Snackbar>
    );

    return (
        <div className={classes.SignForm}>
            {authenticationRedirect}
            <div className={classes.Title}>
                {t('enterLoginInformation', 'Enter your login information')}
            </div>
            <Card className={classes.Card}>
                <CardContent>
                    <ToggleButtonGroup className={classes.ToggleButtons}
                        value={isSignUp}
                        exclusive
                        onChange={event => handleToggleChange(event)}
                        aria-label="Sign Up or Sign In"
                    >
                        <ToggleButton value={true} aria-label="Sign Up">
                            {t('signUp','Sign Up')}
                        </ToggleButton>
                        <ToggleButton value={false} aria-label="Sign In">
                            {t('signIn', 'Sign In')}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {form}
                </CardContent>
            </Card>
            {errorMessagePopUp}
        </div>
    );
};

export default auth;