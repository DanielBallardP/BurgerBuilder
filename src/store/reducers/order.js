import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    orderSuccessful: false,
    orderSearchDate: null,
    sortBy: 'date',
};

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true});

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {loading: false, orders: action.orders});

        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, {loading: false, error: action.error});

        case actionTypes.ADD_ORDER_START:
            return updateObject(state, {loading: true});

        case actionTypes.ADD_ORDER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return updateObject(state, {loading: false, orders: state.orders.concat(newOrder), orderSuccessful: true});

        case actionTypes.ADD_ORDER_FAILED:
            return updateObject(state, {loading: false, error: action.error});

        case actionTypes.CANCEL_ORDER_START:
            return updateObject(state, {loading: true});

        case actionTypes.CANCEL_ORDER_SUCCESS:
            return updateObject(state, {loading: false, orders: state.orders.filter(order => order.id !== action.orderId)});

        case actionTypes.CANCEL_ORDER_FAILED:
            return updateObject(state, {loading: false, error: action.error});

        case actionTypes.INIT_ORDER:
            return updateObject(state, {loading: false, error: false, orderSuccessful: false});

        case actionTypes.SET_ORDER_SEARCH_DATE:
            return updateObject(state, {orderSearchDate: action.orderSearchDate});

        case actionTypes.SET_ORDER_SORTING:
            return updateObject(state, {sortBy: action.sortBy});
        
        default: return state;
    }
};

export default order;