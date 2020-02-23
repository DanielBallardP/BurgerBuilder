import * as actionTypes from './actionTypes';

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const loadOrders = (token, userId, orderSearchDate, orderSorting) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        idToken: token,
        userId: userId,
        orderSearchDate: orderSearchDate,
        sortBy: orderSorting
    };
};

export const addOrderStart = () => {
    return {
        type: actionTypes.ADD_ORDER_START
    };
};

export const addOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ADD_ORDER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const addOrderFailed = error => {
    return {
        type: actionTypes.ADD_ORDER_FAILED,
        error: error
    };
};


export const sendOrder = (order, token) => {
    return {
        type: actionTypes.SEND_ORDER,
        order: order,
        idToken: token
    };
};

export const cancelOrderStart = () => {
    return {
        type: actionTypes.CANCEL_ORDER_START
    };
};

export const cancelOrderSuccess = orderId => {
    return {
        type: actionTypes.CANCEL_ORDER_SUCCESS,
        orderId: orderId
    };
};

export const cancelOrderFailed = error => {
    return {
        type: actionTypes.CANCEL_ORDER_FAILED
    };
};

export const deleteOrder = (orderId, token) => {
    return {
        type: actionTypes.DELETE_ORDER,
        orderId: orderId,
        idToken: token
    };
};

export const initOrder = () => {
    return {
        type: actionTypes.INIT_ORDER
    };
};

export const setOrderSearchDate = orderSearchDate => {
    return {
        type: actionTypes.SET_ORDER_SEARCH_DATE,
        orderSearchDate: orderSearchDate
    };
};

export const setOrderSorting = orderSorting => {
    return {
        type: actionTypes.SET_ORDER_SORTING,
        sortBy: orderSorting
    };
};
