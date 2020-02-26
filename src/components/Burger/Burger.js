import React, {Fragment, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import * as actions from '../../store/actions';
import classes from './Burger.css'

import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';

const Burger = props => {

    const burgerTypes = {
        basic: {
            label: 'Basic bread',
            type: 'basic'
        },
        sesame: {
            label: 'Sesame seeds',
            type: 'sesame'
        },
        poppy: {
            label: 'Poppy seeds',
            type: 'poppy'
        }
    };

    const burgerType = useSelector(state => state.burgerBuilder.burgerType);
    
    const dispatch = useDispatch();
    
    const changeBurgerType = useCallback(burgerType => dispatch(actions.changeBurgerType(burgerType))); 

    const history = useHistory();

    const {t} = useTranslation();

    let ingredientArray = Object.keys(props.ingredients)
                            .map(ingredientKey => {
                                return [...Array(props.ingredients[ingredientKey])]
                                .map((_,index) => <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />);
                            });

    const setBurgerTypeLeft = () => {
        changeBurgerType(burgerType === burgerTypes.poppy.type ? burgerTypes.sesame.type : burgerTypes.basic.type);
    }

    const setBurgerTypeRight = () => {
        changeBurgerType(burgerType === burgerTypes.basic.type ? burgerTypes.sesame.type : burgerTypes.poppy.type);
    }

    const isCheckoutPage = () => {
        return history.location.pathname.includes('/checkout');
    }

    const isBurgerType= (burgerType, expectedType) => {
        return burgerType === expectedType;
    }

    const burgerTypeBasicPreview = (
        <div>
            <div className={classes.BreadTop}>.</div>
            <div className={classes.BreadBottom}>.</div>
        </div>
    );

    const burgerTypeSesameSeedsPreview = (
        <div>
            <div className={classes.BreadTop}>.
                <div className={classes.Seeds1}>.</div>
                <div className={classes.Seeds2}>.</div>
            </div>
            <div className={classes.BreadBottom}>.</div>
        </div>
    );

    const burgerTypePoppySeedsPreview = (
        <div>
            <div className={classes.BreadTop}>.
                <div className={classes.BlackSeeds1}>.</div>
                <div className={classes.BlackSeeds2}>.</div>
                <div className={classes.BlackSeeds3}>.</div>
            </div>
            <div className={classes.BreadBottom}>.</div>
        </div>
    );

    const displayBurgerTypeLeft = (burgerType, display) => {
        return (
            <Tooltip
                title={
                    <Fragment>
                        <Typography>{burgerType === burgerTypes.poppy.type ? burgerTypes.sesame.label : burgerTypes.basic.label}</Typography>
                        {burgerType === burgerTypes.poppy.type ? burgerTypeSesameSeedsPreview : burgerTypeBasicPreview}
                    </Fragment>
                }
            >
                    <div className={display ? null : classes.Hidden}>
                        <ArrowBackIosIcon onClick={setBurgerTypeLeft} />
                    </div>
            </Tooltip>
        )
    };

    const displayBurgerTypeRight= (burgerType, display) => {
        return (
            <Tooltip
                title={
                    <Fragment>
                        <Typography>{burgerType === burgerTypes.basic.type ? burgerTypes.sesame.label : burgerTypes.poppy.label}</Typography>
                        {burgerType === burgerTypes.basic.type ? burgerTypeSesameSeedsPreview : burgerTypePoppySeedsPreview}
                    </Fragment>
                }
            >
                    <div className={display ? null : classes.Hidden}>
                        <ArrowForwardIosIcon onClick={setBurgerTypeRight} />
                    </div>
            </Tooltip>
        )
    };

    return (
        <div className={classes.BurgerDisplay}>
            <div className={classes.Left}>
                {isCheckoutPage() ? displayBurgerTypeLeft(burgerType, false) : isBurgerType(burgerType, burgerTypes.basic.type) ? displayBurgerTypeLeft(burgerType, false) : displayBurgerTypeLeft(burgerType, true)}
            </div>
            <div className={classes.Burger}>
                <BurgerIngredient type={burgerType} />
                    {ingredientArray.flat().length >0 ? ingredientArray : <Typography variant='h5'>{t('addIngredients', 'Please add ingredients')}</Typography>}
                <BurgerIngredient type='bread-bottom' />
            </div>
            <div className={classes.Right}>
                {isCheckoutPage() ? displayBurgerTypeRight(burgerType, false) : isBurgerType(burgerType, burgerTypes.poppy.type) ? displayBurgerTypeRight(burgerType, false) : displayBurgerTypeRight(burgerType, true)}
            </div>
        </div>
    );
};

export default Burger;