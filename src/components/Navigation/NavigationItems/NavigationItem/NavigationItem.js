import React from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const NavigationItem = props => {
    const theme = useSelector(state => state.settings.settings.theme);
    const cssClass = [classes.NavigationItem, classes[theme]];

    return(
        <li className={cssClass.join(' ')}>
            <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    )
};

export default NavigationItem;