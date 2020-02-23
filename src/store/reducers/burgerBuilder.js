import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.25,
    cheese: 0.45,
    meat: 1.25,
    bacon: 0.75
};

const initialState = {
    ingredients: null,
    burgerType: 'sesame',
    totalPrice: 0,
    canBeOrdered: false,
    error: false,
    building: false
};

const changeBurgerType = (state, action) => {
    return updateObject(state ,{burgerType: action.burgerType});
}

const restoreBurgerType = (state, action) => {
    return updateObject(state ,{burgerType: action.burgerType});
}

const addIngredient = (state, action) => {
    const updatedIngredient_add = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
    const updatedIngredients_add = updateObject(state.ingredients, updatedIngredient_add);

    const updatedState_add = {
        ingredients: updatedIngredients_add,
        totalPrice: Math.abs(state.totalPrice + INGREDIENT_PRICES[action.ingredient]),
        building: true
    };

    return updateObject(state, updatedState_add);
};

const removeIngredient = (state, action) => {
    const updatedIngredient_rem = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
    const updatedIngredients_rem = updateObject(state.ingredients, updatedIngredient_rem);

    const updatedState_rem = {
        ingredients: updatedIngredients_rem,
        totalPrice: Math.abs(state.totalPrice - INGREDIENT_PRICES[action.ingredient]),
        building: true
    };

    return updateObject(state, updatedState_rem);
};

const initIngredients = (state, action) => {
    const updatedIngredients_set = updateObject(state.ingredients, {bacon: action.ingredients.bacon, salad: action.ingredients.salad, cheese: action.ingredients.cheese, meat: action.ingredients.meat });

    const updatedState_set = {
        ingredients: updatedIngredients_set,
        burgerType: 'sesame',
        totalPrice: 0,
        error: false,
        building: false
    };

    return updateObject(state, updatedState_set);
};

const restoreIngredients = (state, action) => {
    const restoredIngredients = updateObject(state.ingredients, {bacon: action.ingredients.bacon, salad: action.ingredients.salad, cheese: action.ingredients.cheese, meat: action.ingredients.meat });
    let restoredPrice = 0;

    for (let key in restoredIngredients) {
        restoredPrice += Math.abs(restoredIngredients[key] * INGREDIENT_PRICES[key]);
    }

    const restoredIngredients_set = {
        ingredients: restoredIngredients,
        totalPrice: restoredPrice
    };

    return updateObject(state, restoredIngredients_set);
};

const burgerBuilder = (state = initialState, action) => {
    switch ( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            const oldCount = state.ingredients[action.ingredient];

            if (oldCount > 0) {
                return removeIngredient(state, action);
            }
            break;

        case actionTypes.SET_INGREDIENTS:
            return initIngredients(state, action);

        case actionTypes.RESTORE_INGREDIENTS:
            return restoreIngredients(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});

        case actionTypes.CHANGE_BURGER_TYPE:
            return changeBurgerType(state, action);

        case actionTypes.RESTORE_BURGER_TYPE:
            return restoreBurgerType(state, action);

        default: return state;
    }
};

export default burgerBuilder;