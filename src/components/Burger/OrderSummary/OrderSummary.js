import React from 'react';
import {useSelector} from 'react-redux';

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

const orderSummary = props => {

    const theme = useSelector(state => state.settings.settings.theme);
    const currency = useSelector(state => state.settings.settings.currency);

    const cssClass = [classes.OrderSummaryHeader, classes[theme]];

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
                                            <ListItemText primary={`${ing.charAt(0).toUpperCase() + ing.slice(1)}`} secondary={`${props.ingredients[ing]} pc(s)`}/>
                                        </ListItem> : null
        );
    });

    return (
            <div>
                <div className={cssClass.join(' ')}>
                    Order details
                </div>
                <div className={classes.OrderSummary}>
                    <List dense={true}>
                        {ingredientSummary}
                    </List>
                    <Typography>
                        Total price: {parseFloat(props.totalPrice).toFixed(2)} {currency}
                    </Typography>
                    <div className={classes.OrderSummaryButtons}>
                        <Button onClick={props.checkOut} variant="contained" disableElevation>
                            Checkout
                        </Button>
                        <div className={classes.Divider} />
                        <Button onClick={props.cancelOrder} variant="contained" disableElevation>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
    );
};

export default orderSummary;