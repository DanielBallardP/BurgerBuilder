import React from 'react';
import {useTranslation} from 'react-i18next';

import classes from './BuildButtons.css';

import Button from '@material-ui/core/Button';

const BuildButtons = props => {  
    const {t} = useTranslation();

    const buttonText = props.loggedIn ? t('orderNow','ORDER NOW') : t('signInToOrder','SIGN IN TO ORDER');
    const buttonClass = props.loggedIn ? [classes.OrderButton] : [classes.SignInButton];

    return (
        <div className={classes.BuildButtons}>
            <Button disableElevation className={buttonClass.join(' ')} onClick={props.clicked} disabled={!props.canBeOrdered} variant="contained">
                {buttonText}
            </Button>
            <div className={classes.Divider} />
            <Button disableElevation className={classes.ResetButton} disabled={!props.building} onClick={props.resetIngredients} variant="contained" >
                {t('reset','Reset')}
            </Button>
        </div>
    );
};

export default BuildButtons;