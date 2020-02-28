import React, {useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Spinner from '../../UI/Spinner/Spinner';
import AuthForm from '../Form/AuthForm';

import * as actions from '../../../store/actions';
import classes from './DeleteAccount.css';

import Button from '@material-ui/core/Button';

const DeleteAccount = props => {
    const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
/*     const [accountDeletionError, setAccountDeletionError] = useState(false); */

    const idToken = useSelector(state => state.auth.idToken);
    const isLoading = useSelector(state => state.settings.loading);

    const dispatch = useDispatch();

    const authenticate = useCallback((idToken, formData) => dispatch(actions.authenticate(formData.email, formData.password, false)), [dispatch]);
    const deleteAccount = useCallback(idToken => dispatch(actions.deleteAccount(idToken)), [dispatch]);

    const {t} = useTranslation();

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

    return (
        <div className={classes.DeleteAccount}>
            <div>
                <Button disableElevation variant="contained" onClick={toggleAccountDeletion}>
                    {t('deleteAccount', 'Delete Account')}
                </Button>
            </div>
            {accountDeletionForm}
        </div> 
    );
};

export default DeleteAccount;