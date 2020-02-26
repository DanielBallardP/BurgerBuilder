import React, {Fragment, useState, useEffect, useCallback}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import InfoBar from '../../components/InfoBar/InfoBar';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import AxiosInstance from '../../axios-orders';
import * as actions from '../../store/actions';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export const BurgerBuilder = props => {
    const [showOrderSummary, setShowOrderSummary] = useState(false);

    const [logoutMessage, setLogoutMessage] = useState(null);

    const history = useHistory();
    const lastLocation = useLastLocation();

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const loggedIn = useSelector(state => state.auth.idToken != null);

    const dispatch = useDispatch();

    const addIngredient = ingredient => dispatch(actions.addIngredient(ingredient));
    const removeIngredient = ingredient => dispatch(actions.removeIngredient(ingredient));
    const initIngredients = useCallback(() => dispatch(actions.initIngredients()),[]);
    const restoreIngredients = useCallback(ingredients => dispatch(actions.restoreIngredients(ingredients)), []);
    const initOrder = () => dispatch(actions.initOrder());
    const setAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

    const performStepReset = () => dispatch(actions.performStepReset());
    const displayBurgerStepper = useCallback(() => dispatch(actions.displayBurgerStepper()), []);
    const restoreCurrency  = useCallback(() => dispatch(actions.restoreCurrency()), []);
    const restoreBurgerType = useCallback(() => dispatch(actions.restoreBurgerType()), []);

    const retrieveIngredients = () => {
        const salad = localStorage.getItem('salad');
        const bacon = localStorage.getItem('bacon');
        const cheese = localStorage.getItem('cheese');
        const meat = localStorage.getItem('meat');

        if (salad === null || bacon === null || cheese === null || meat === null) {
            return null;
        }
  
        return {
            salad: parseInt(salad, 10), 
            bacon: parseInt(bacon, 10), 
            cheese: parseInt(cheese, 10), 
            meat: parseInt(meat, 10)
        };
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setLogoutMessage(null);
    };
    
    const logoutMessagePopup = (
        <Snackbar open={logoutMessagePopup !== null} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                You have been successfully logged out.
            </Alert>
        </Snackbar>
    );

    const displayLogoutMessage = () => {
        if (lastLocation && lastLocation.pathname === '/logout') {
            setLogoutMessage(logoutMessagePopup);
        }
    }

    useEffect(() => {
        displayBurgerStepper();
        
        const restoredIngredients = retrieveIngredients();

        if (restoredIngredients !== null) {
            restoreIngredients(restoredIngredients);
        } else {
            initIngredients();
        }

        restoreBurgerType();
        restoreCurrency();
        performStepReset();

        displayLogoutMessage();
    }, [])

    const displayOrderSummary = () => setShowOrderSummary(true);

    const redirectToAuthentication = () => {
        setAuthRedirectPath('/checkout');
        history.push('/auth');
    }

    const cancelOrder = () => setShowOrderSummary(false);

    const checkout = () => {
        initOrder();
        history.push({
            pathname: '/checkout'
        });
    }

    const updateOrderState  = ingredients => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);

        return sum > 0;
    }

    const disabledInfo = {
        ...ingredients
    };
        
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
        
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    const checkIngredients = () => {
        const existingIngredients = retrieveIngredients();

        for (let key in existingIngredients) {
            if (existingIngredients[key] > 0) {
                return true;
            }
        }
    };

    if (ingredients){
        burger = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <InfoBar totalPrice={totalPrice} />
                <BuildControls 
                    add={addIngredient} 
                    remove={removeIngredient} 
                    disabled={disabledInfo} 
                    building={checkIngredients()} 
                    resetIngredients={initIngredients}
                    canBeOrdered={updateOrderState(ingredients)} 
                    clicked={loggedIn ? displayOrderSummary : redirectToAuthentication} 
                    loggedIn={loggedIn} 
                />
            </Fragment>
        );

        orderSummary = (
            <OrderSummary 
                ingredients={ingredients} 
                totalPrice={totalPrice} 
                checkOut={checkout} 
                cancelOrder={cancelOrder} 
                show={showOrderSummary} 
            />
        );
    }

    return (
        <Fragment>
            <Modal show={showOrderSummary} closeModal={cancelOrder}>
                {orderSummary}
            </Modal>
            {burger}
            {logoutMessage}
        </Fragment>
    );
};

export default withErrorHandler(BurgerBuilder, AxiosInstance);
