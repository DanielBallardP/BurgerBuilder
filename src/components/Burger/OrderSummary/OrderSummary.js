import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import classes from './OrderSummary.css';

import saladIcon from '../../../assets/icons/salad.svg';
import baconIcon from '../../../assets/icons/bacon.svg';
import cheeseIcon from '../../../assets/icons/cheese.svg';
import meatIcon from '../../../assets/icons/meat.svg';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const OrderSummary = props => {

    const theme = useSelector(state => state.settings.settings.theme);
    const currency = useSelector(state => state.settings.settings.currency);

    const cssClass = [classes.OrderSummaryHeader, classes[theme]];

    const {t} = useTranslation();

    const ingredientIcons = {
        salad: saladIcon,
        bacon: baconIcon,
        cheese: cheeseIcon,
        meat: meatIcon
    };

    const ingredientSummary = Object.keys(props.ingredients).map((ing,idx) => {
        return (
            props.ingredients[ing] > 0 ? <ListItem key={ing+idx}>
                                            <ListItemIcon>
                                                <Icon classes={{root: classes.iconRoot}}>
                                                    <img className={classes.imageIcon} alt='icon' src={ingredientIcons[ing]}/>
                                                </Icon>
                                            </ListItemIcon>
                                            <ListItemText primary={t(ing)} secondary={`${props.ingredients[ing]} ${t('pc(s)', '(pc)s')}`}/>
                                        </ListItem> : null
        );
    });

    return (
            <Fragment>
                <div className={cssClass.join(' ')}>
                    {t('orderDetails', 'Order details')}
                </div>
                <div className={classes.OrderSummary}>
                    <List dense={true}>
                        {ingredientSummary}
                    </List>
                    <Typography>
                        {t('totalPrice', 'Total price')}: {parseFloat(props.totalPrice).toFixed(2)} {currency}
                    </Typography>
                    <div className={classes.OrderSummaryButtons}>
                        <Button onClick={props.checkOut} variant="contained" disableElevation>
                            {t('checkout', 'Checkout')}
                        </Button>
                        <div className={classes.Divider} />
                        <Button onClick={props.cancelOrder} variant="contained" disableElevation>
                            {t('cancel', 'Cancel')}
                        </Button>
                    </div>
                </div>
            </Fragment>
    );
};

export default OrderSummary;