import React, {Fragment, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Order from '../Order/Order';
import Spinner from '../UI/Spinner/Spinner';
import OrderSearchBar from './OrderSearchBar';

import AxiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

import classes from'./Orders.css';

const Orders = props => {

    const orders = useSelector(state => state.order.orders);
    const orderSearchDate = useSelector(state => state.order.orderSearchDate);
    const orderSorting = useSelector(state => state.order.sortBy);
    const error = useSelector(state => state.order.error);
    const token = useSelector(state => state.auth.idToken);
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();
    const loadOrders = useCallback((token, userId, orderSearchDate, orderSorting) => dispatch(actions.loadOrders(token, userId, orderSearchDate, orderSorting)), [dispatch]);
    const hideBurgerStepper = useCallback(() => dispatch(actions.hideBurgerStepper()), [dispatch]);

    useEffect(() => {
        hideBurgerStepper();
        loadOrders(token, userId, orderSearchDate, orderSorting);
    }, [hideBurgerStepper, loadOrders, token, userId, orderSearchDate, orderSorting])

    let displayOrders = error ? <p>Orders can't be loaded</p> : ' ';

    if (props.loading) {
            displayOrders = <Spinner />;
    }

    if (orders) {
        displayOrders = (
            <div>
                {orders.map(order => {
                    return (<Order key={order.id} orderId={order.id} ingredients={order.ingredients} price={order.price} currency={order.currency} orderDate={order.date}/>);
                })}
            </div>
        );
    }

    return(
        <Fragment>
            <OrderSearchBar />
            <div className={classes.Orders}>
                {displayOrders}
            </div>
        </Fragment>
    );
}

export default withErrorHandler(Orders, AxiosInstance);