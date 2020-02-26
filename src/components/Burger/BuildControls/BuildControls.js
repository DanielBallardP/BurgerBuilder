import React from 'react';
import {useTranslation} from 'react-i18next';

import BuildControl from './BuildControl/BuildControl';
import BuildButtons from './BuildButtons';

import classes from './BuildControls.css';

import saladIcon from '../../../assets/icons/salad.svg';
import baconIcon from '../../../assets/icons/bacon.svg';
import cheeseIcon from '../../../assets/icons/cheese.svg';
import meatIcon from '../../../assets/icons/meat.svg';


const BuildControls = props => {
    const {t} = useTranslation();

    const controls = [
        {label: 'BACON', type: 'bacon', icon: baconIcon, price: 0.75, calories: 270, description: t('bacon_description')},
        {label: 'SALAD', type: 'salad', icon: saladIcon, price: 0.25, calories: 15, description: t('salad_description')},
        {label: 'CHEESE', type: 'cheese', icon: cheeseIcon, price: 0.45, calories: 402, description: t('cheese_description')},
        {label: 'MEAT', type: 'meat', icon: meatIcon, price: 1.25, calories: 244, description: t('meat_description')}
    ];

    return (
        <div className={classes.BuildControls}>
            {controls.map(control => (
                <BuildControl 
                    key={control.label} 
                    label={control.label}
                    type={control.type} 
                    icon={control.icon} 
                    price={control.price} 
                    calories={control.calories} 
                    description={control.description} 
                    add={() => props.add(control.type)} 
                    remove={() => props.remove(control.type)} 
                    disabled={props.disabled[control.type]}
                />
            ))}
            <BuildButtons 
                loggedIn={props.loggedIn} 
                clicked={props.clicked} 
                building={props.building} 
                canBeOrdered={props.canBeOrdered} 
                resetIngredients={props.resetIngredients} 
            />
        </div>
    );
};

export default BuildControls;
