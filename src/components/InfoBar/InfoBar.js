import React from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import classes from './InfoBar.css';

const infoBar = props => {
    const currency = useSelector(state => state.settings.settings.currency);
    const theme = useSelector(state => state.settings.settings.theme);
    const cssClass = [classes.InfoBar, classes[theme]];

    const {t} = useTranslation();

    return (
        <div className={cssClass.join(' ')}>
            <div className={classes.Price}>
                {t('totalPrice','Total price')}: {props.totalPrice.toFixed(2)} {currency}
            </div>
        </div>
    );
};

export default infoBar;