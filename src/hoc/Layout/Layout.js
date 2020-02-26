import React, {Fragment, useState} from 'react';
import { useSelector } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import BurgerStepper from '../../components/BurgerBuilder/BurgerStepper';

import classes from './Layout.css'

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const loggedIn = useSelector(state => state.auth.idToken);

    const sideDrawerClosedHandler = () => setShowSideDrawer(false);

    const sideDrawerToggleHandler = () => setShowSideDrawer(!showSideDrawer);

        return (
            <Fragment>
                <Toolbar drawerToggleClicked={sideDrawerToggleHandler} loggedIn={loggedIn}/>
                <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} loggedIn={loggedIn}/>
                <main className={classes.Content}>
                    <BurgerStepper />
                    {props.children}
                </main>
            </Fragment>
        );
};

export default Layout;