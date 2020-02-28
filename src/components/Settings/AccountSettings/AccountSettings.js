import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import DeleteAccount from './DeleteAccount';
import PasswordChange from './PasswordChange';

import classes from './AccountSettings.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const AccountSettings = props => {

    const [accountSettingsError, setAccountSettingsError] = useState(false);
    const error = useSelector(state => state.settings.error);

    useEffect(() => {
        if (error) {
            setAccountSettingsError(true);
        }
    }, [error]);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setAccountSettingsError(false);
    };

    const errorMessagePopUp = (
        <Snackbar open={accountSettingsError} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error ? error.message ? `Action failed: ${error.message}` : 'Action failed' : ''}
            </Alert>
        </Snackbar>
    );

    return (
        <div className={classes.Setting}>
            <div>
                <PasswordChange />
            </div>
            <div>
                <DeleteAccount />
            </div>
            {errorMessagePopUp}
        </div>
    );
};

export default AccountSettings;