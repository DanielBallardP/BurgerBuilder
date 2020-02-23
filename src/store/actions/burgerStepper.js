import * as actionTypes from './actionTypes';

export const performStepNext = () => {
    return {
        type: actionTypes.PERFORM_STEP_NEXT,
    };
};

export const performStepBack = () => {
    return {
        type: actionTypes.PERFORM_STEP_BACK,
    };
};

export const performStepReset = () => {
    return {
        type: actionTypes.PERFORM_STEP_RESET,
    };
};

export const hideBurgerStepper = () => {
    return {
        type: actionTypes.HIDE_BURGER_STEPPER,
    };
};

export const displayBurgerStepper = () => {
    return {
        type: actionTypes.DISPLAY_BURGER_STEPPER,
    };
};
