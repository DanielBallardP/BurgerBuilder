import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';

import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, validateFormInput } from '../../../shared/utility';
import AxiosInstance from '../../../axios-orders';
import * as actions from '../../../store/actions';
import classes from './ContactData.css';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ContactData = props => {
const {t} = useTranslation();

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: t('yourName', 'Your name')
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                error: ''
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: t('yourStreet', 'Your street')
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                error: ''
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: t('yourZipCode', 'Your zip code')
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 5,
                error: ''
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: t('yourEmail', 'Your email')
            },
            value: '',
            validation: {
                required: true,
                contains: '@',
                error: ''
            },
            valid: false,
            touched: false
        }
    });

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const loading = useSelector(state => state.order.loading);
    const token = useSelector(state => state.auth.idToken);
    const userId = useSelector(state => state.auth.userId);
    const currency = useSelector(state => state.settings.settings.currency);
    const theme = useSelector(state => state.settings.settings.theme);
    const cssClass = [classes.Title, classes[theme]];

    const dispatch = useDispatch();
    const sendOrder = (order, token) => dispatch(actions.sendOrder(order, token));
    const initIngredients = () => dispatch(actions.initIngredients());

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    const [orderConfirmation, setOrderConfirmation] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOrderConfirmation(false);
      };

    const successMessage = (
        <Snackbar open={orderConfirmation} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {t('orderConfirmed', 'Order successfully confirmed')}
            </Alert>
        </Snackbar>
    );

    const orderHandler = event => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: ingredients,
            price: totalPrice.toFixed(2),
            currency: currency,
            orderData: formData,
            userId: userId,
            date: new Date().toDateString()
        };

        sendOrder(order, token);
        setOrderConfirmation(true);
        initIngredients();
    }

    const handleChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: validateFormInput(event.target.value, orderForm[inputIdentifier].validation).result,
            error: validateFormInput(event.target.value, orderForm[inputIdentifier].validation).reason,
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {[inputIdentifier]: updatedFormElement});

        setOrderForm(updatedOrderForm);
    }

    const isOrderFormValid = () => {
        let orderFormValid = true;

        for (let key in orderForm) {
            if (!orderForm[key].valid) {
                orderFormValid = false;
            } 
        }

        return orderFormValid;
    }

    const orderFormValid = isOrderFormValid();
    let form = (
        <form onSubmit={orderHandler}>
            {Object.keys(orderForm).map(formElement => {
                const formObject = orderForm[formElement];
                return (<Input className={classes.Input} key={formElement} elementType={formObject.elementType} id="outlined-basic" variant="outlined" elementConfig={formObject.elementConfig} name={formElement} value={formObject.value} changed={event => handleChange(event, formElement)} valid={formObject.valid} validate={formObject.validation} validationError={formObject.error} touched={formObject.touched}/>);
            })}
            <Button disableElevation className={classes.OrderButton} disabled={!orderFormValid} onClick={orderHandler} variant="contained">{t('confirmOrder', 'Confirm order')}</Button>
        </form>
    );

    if (loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <div className={cssClass.join(' ')}>
                {t('enterContactDetails', 'Enter your contact details')}
            </div>
            <Card className={classes.Card}>
                <CardContent>
                    {form}
                </CardContent>
            </Card>
            {successMessage}
        </div>
    );
};

export default withErrorHandler(withRouter(ContactData), AxiosInstance);