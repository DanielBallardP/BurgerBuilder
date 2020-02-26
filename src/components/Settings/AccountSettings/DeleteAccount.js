import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Spinner from '../../UI/Spinner/Spinner';
import AuthForm from '../Form/AuthForm';

import * as actions from '../../../store/actions';
import classes from './DeleteAccount.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const DeleteAccount = props => {
    const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
    const [accountDeletionError, setAccountDeletionError] = useState(false);

    const idToken = useSelector(state => state.auth.idToken);
    const isLoading = useSelector(state => state.settings.loading);
    const error = useSelector(state => state.settings.error);

    const dispatch = useDispatch();

    const authenticate = useCallback((idToken, formData) => dispatch(actions.authenticate(formData.email, formData.password, false)), [dispatch]);
    const deleteAccount = useCallback(idToken => dispatch(actions.deleteAccount(idToken)), [dispatch]);

    const {t} = useTranslation();

    useEffect(() => {
        if (error) {
            setAccountDeletionError(true);
        }
    }, [error]);

    const toggleAccountDeletion = () => {
        setConfirmDeleteAccount(prevState => !prevState);
    };

    const deleteAccountHandler = formData => {
        authenticate(idToken, formData);
        deleteAccount(idToken);
    };

    let accountDeletionForm = <AuthForm formHandler={deleteAccountHandler} title={'enterEmailAndPasswordToConfirmAccountDeletion'} />;

    if (isLoading) {
        accountDeletionForm = <Spinner />
    }

    if (!confirmDeleteAccount) {
        accountDeletionForm = null;
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setAccountDeletionError(false);
    };

    const errorMessagePopUp = (
        <Snackbar open={accountDeletionError} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error ? error.message ? `Account deletion failed: ${error.message}` : 'Account deletion failed' : ''}
            </Alert>
        </Snackbar>
    );

    return (
        <div className={classes.DeleteAccount}>
            <div>
                <Button disableElevation variant="contained" onClick={toggleAccountDeletion}>
                    {t('deleteAccount', 'Delete Account')}
                </Button>
            </div>
            {accountDeletionForm}
            {errorMessagePopUp}
        </div> 
    );
};

export default DeleteAccount;