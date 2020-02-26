import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Route, Redirect, useHistory} from 'react-router-dom';

import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';

const Checkout = props => {

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const orderSuccessful = useSelector(state => state.order.orderSuccessful);

    const history = useHistory();

    const dispatch = useDispatch();
    const performStepNext = useCallback(() => dispatch(actions.performStepNext()), [dispatch]);
    const displayBurgerStepper = useCallback(() => dispatch(actions.displayBurgerStepper()), [dispatch]);

    useEffect(() => {
        displayBurgerStepper();
        performStepNext();
    }, [displayBurgerStepper, performStepNext]);

    const cancelCheckout = () => history.goBack();

    const continueCheckout = () => history.replace('/checkout/contact-data');

    let summary = <Redirect to='/' />;

    if (ingredients){
        const redirectAfterOrder = orderSuccessful ? <Redirect to='/' /> : '';
        summary = (
            <div>
                {redirectAfterOrder}
                <CheckoutSummary ingredients={ingredients} cancelCheckout={cancelCheckout} continueCheckout={continueCheckout}/>
                <Route path={props.match.url+'/contact-data'} render={() => (<ContactData />)} />
            </div> 
        );
    }

    return summary;
}

export default Checkout;