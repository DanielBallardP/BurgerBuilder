import React from 'react';

import DeleteAccount from './DeleteAccount';
import PasswordChange from './PasswordChange';

import classes from './AccountSettings.css';

const AccountSettings = props => {

    return (
        <div className={classes.Setting}>
            <div>
                <PasswordChange />
            </div>
            <div>
                <DeleteAccount />
            </div>
        </div>
    );
};

export default AccountSettings;