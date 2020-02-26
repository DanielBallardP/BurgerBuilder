import React, {useCallback, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import * as actions from '../../store/actions';
import classes from './Order.css';

import saladIcon from '../../assets/icons/salad.svg';
import baconIcon from '../../assets/icons/bacon.svg';
import cheeseIcon from '../../assets/icons/cheese.svg';
import meatIcon from '../../assets/icons/meat.svg';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Order = props => {

    const idToken = useSelector(state => state.auth.idToken);

    const dispatch = useDispatch();

    const deleteOrder = useCallback(orderId => dispatch(actions.deleteOrder(orderId, idToken)), [dispatch, idToken]);

    const {t} = useTranslation();

    const ingredientIcons = {
        salad: saladIcon,
        bacon: baconIcon,
        cheese: cheeseIcon,
        meat: meatIcon
    };

    const ingredients = [];

    for (let ing in props.ingredients) {
        ingredients.push({
            name: ing,
            amount: props.ingredients[ing]
        });
    }

    const ingredientOutput = ingredients.map(ing => {
        if (ing.amount > 0) {
            return (<div 
                    style={{
                        display: 'inline-block',
                        margin: '0 4px',
                        border: '0px',
                        padding: '4px'
                    }} 
                    key={ing.name}
                    >
                        <ListItem>
                            <ListItemIcon>
                                <Icon classes={{root: classes.iconRoot}}>
                                    <img className={classes.imageIcon} alt='icon' src={ingredientIcons[ing.name]}/>
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary={t(ing.name)} secondary={`${ing.amount} ${t('pc(s)', 'pc(s)')}`}/>
                        </ListItem>
                    </div>
            );
        }
        
        return '';
    });

    const cancelOrder = (e, orderId) => {
        e.stopPropagation();
        deleteOrder(orderId);
    }

    const cancelOrderButton = (
        <Tooltip title={t('cancelOrder', 'Cancel order')}>
            <Icon style={{ color: 'red' }} onClick={e => cancelOrder(e, props.orderId)}>
                <DeleteForeverRoundedIcon />
            </Icon>
        </Tooltip>
    );

    return (
        <div className={classes.Order}>
            <ExpansionPanel>
                <ExpansionPanelSummary className={classes.OrderDetails}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <div>
                        <p>{t('orderDate', 'Order date')}: <strong>{props.orderDate}</strong></p>
                        <p>{t('totalPrice', 'Total price')}: <strong>{Number.parseFloat(props.price).toFixed(2)} {props.currency}</strong></p>
                        {cancelOrderButton}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.Ingredients}>
                        {ingredientOutput}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

export default memo(Order);