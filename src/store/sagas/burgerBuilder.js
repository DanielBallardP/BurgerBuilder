import AxiosInstance from '../../axios-orders';
import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';

export function* initIngredientsSaga(action){
    try {
        const response = yield AxiosInstance.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
        yield call([localStorage, 'setItem'],'salad', response.data.salad);
        yield call([localStorage, 'setItem'],'bacon', response.data.bacon);
        yield call([localStorage, 'setItem'],'cheese', response.data.cheese);
        yield call([localStorage, 'setItem'],'meat', response.data.meat);
        yield call([localStorage, 'setItem'],'burgerType', 'sesame');
    } catch(error) {
        yield put(actions.fetchIngredientsFailed());
    }
};
