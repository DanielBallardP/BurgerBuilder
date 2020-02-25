import React from 'react';
import { withRouter } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import Burger from '../../Burger/Burger';

import classes from './CheckoutSummary.css';

import Button from '@material-ui/core/Button';

const CheckoutSummary = props => {
    const {t} = useTranslation();

    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
                <Button disableElevation onClick={props.continueCheckout} variant="contained">{t('proceed', 'Proceed')}</Button>
                <div className={classes.Divider} />
                <Button disableElevation onClick={props.cancelCheckout} variant="contained">{t('cancel', 'Cancel')}</Button>
            </div>
        </div>
    );
}

export default withRouter(CheckoutSummary);