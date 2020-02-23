import React from 'react';
import {useSelector} from 'react-redux';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.css';

const toolbar = props => {
    
    const theme = useSelector(state => state.settings.settings.theme);
    const cssClass = [classes.Toolbar, classes[theme]];

    return (
        <header className={cssClass.join(' ')}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems loggedIn={props.loggedIn} />
                </nav>
        </header>
    );
};

export default toolbar;