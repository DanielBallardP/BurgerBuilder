import { put } from 'redux-saga/effects';
import AxiosInstance from '../../axios-orders';
import * as actions from '../actions';

export function* loadOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    
    try{
        const response = yield AxiosInstance.get('/orders.json?auth='+action.idToken+'&orderBy="userId"&equalTo="'+action.userId+'"');
        const fetchedOrders = [];

        for (let key in response.data){
            yield fetchedOrders.push({
                ...response.data[key],
                id: key});
        }

        let sortedOrders = [];

        if (action.sortBy === 'date' || action.sortBy === undefined) {
            sortedOrders = fetchedOrders.slice().sort((a,b) => new Date(b.date) - new Date(a.date));
        } else if (action.sortBy === 'price') {
            sortedOrders = fetchedOrders.slice().sort((a,b) => b.price - a.price);
        }

        if (action.orderSearchDate) {
            const filteredOrders = sortedOrders.filter(order => new Date(order.date).getTime() === new Date(action.orderSearchDate).setHours(0,0,0,0));         
            yield put(actions.fetchOrders(filteredOrders));
        } else {
            yield put(actions.fetchOrders(sortedOrders));
        }
    } catch(error){
        yield put(actions.fetchOrdersFailed(error));
    }
};

export function* sendOrderSaga(action) {
    yield put(actions.addOrderStart());

    try{
        const response = yield AxiosInstance.post('/orders.json?auth='+action.idToken, action.order);
        yield put(actions.addOrderSuccess(response.data.name, action.order));
    }catch (error) {
        yield put(actions.addOrderFailed(error));
    }
};

export function* deleteOrderSaga(action) {
    yield put(actions.cancelOrderStart());

    try {
        yield AxiosInstance.delete('/orders/'+action.orderId+'/.json?auth='+action.idToken);
        yield put (actions.cancelOrderSuccess(action.orderId));
    } catch(error){
        yield put (actions.cancelOrderFailed(error));
    }
};
