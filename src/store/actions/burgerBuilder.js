import * as actionTypes from './actionTypes';

export const addIngredient = name => {
    const amount = parseInt(localStorage.getItem(name), 10)+1;
    localStorage.setItem(name, amount);
    
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name
    };
};

export const removeIngredient = name => {
    const amount = parseInt(localStorage.getItem(name), 10)-1;
    if (amount >= 0) {
        localStorage.setItem(name, amount);
    }

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name
    };
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    };
};

export const restoreIngredients = ingredients => {
    return {
        type: actionTypes.RESTORE_INGREDIENTS,
        ingredients: ingredients
    };
};

export const changeBurgerType = burgerType => {
    localStorage.setItem('burgerType', burgerType);

    return {
        type: actionTypes.CHANGE_BURGER_TYPE,
        burgerType: burgerType
    };
};

export const restoreBurgerType = () => {
    const burgerType = localStorage.getItem('burgerType');

    return {
        type: actionTypes.RESTORE_BURGER_TYPE,
        burgerType: burgerType ? burgerType : 'sesame'
    };
};
