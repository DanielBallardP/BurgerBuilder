import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    display: true,
    activeStep: 0
};

const performStepNext = (state, action) => {
    return updateObject(state, {activeStep: state.activeStep + 1});
};

const performStepBack = (state, action) => {
    return updateObject(state, {activeStep: state.activeStep - 1});
};

const performStepReset = (state, action) => {
    return updateObject(state, {activeStep: 0});
};

const hideBurgerStepper = (state, action) => {
    return updateObject(state, {display: false});
};

const displayBurgerStepper = (state, action) => {
    return updateObject(state, {display: true});
};

const burgerStepper = (state = initialState, action) => {
    switch ( action.type ){
        case actionTypes.PERFORM_STEP_NEXT: return performStepNext(state, action);

        case actionTypes.PERFORM_STEP_BACK: return performStepBack(state, action);

        case actionTypes.PERFORM_STEP_RESET: return performStepReset(state, action);

        case actionTypes.HIDE_BURGER_STEPPER: return hideBurgerStepper(state, action);

        case actionTypes.DISPLAY_BURGER_STEPPER: return displayBurgerStepper(state, action);

        default: return state;
    }
};

export default burgerStepper;