import React, {Suspense} from 'react';
import { useTranslation } from 'react-i18next';

import NavigationItem from './NavigationItem/NavigationItem';
import AccountMenuItem from './Account/AccountMenuItem';
import LanguageMenuItem from './Language/LanguageMenuItem';
import classes from './NavigationItems.css';

import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';

const NavigationItems = props => {

    const {t} = useTranslation();

    const signIn = (
        <Tooltip title={t('signIn', 'Sign In')}>
            <AccountCircle />
        </Tooltip>
    );

    const settings = (
        <Tooltip title={t('settings', 'Settings')}>
            <SettingsIcon />
        </Tooltip>
    );

    return (
        <Suspense fallback={null}>
        <ul className={classes.NavigationItems}>
                <NavigationItem link='/' exact>
                    <Typography variant="button">
                        BURGER BUILDER
                    </Typography>
                </NavigationItem>
                {props.loggedIn ? <NavigationItem link='/orders'>
                                    <Typography variant="button">
                                        {t("orders", 'ORDERS')}
                                    </Typography>
                                </NavigationItem> : null
                }
                {props.loggedIn ? <NavigationItem link='/settings'>
                                    {settings}
                                </NavigationItem> : null
                }
                <LanguageMenuItem />
                {props.loggedIn ? <AccountMenuItem /> : <NavigationItem link='/auth'>
                                                        {signIn}
                                                    </NavigationItem>
                }
        </ul>
        </Suspense>
    );
};

export default NavigationItems;