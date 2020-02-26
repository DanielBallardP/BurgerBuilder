import React, { useEffect, useCallback, Suspense, Fragment } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LastLocationProvider } from 'react-router-last-location';

import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import Spinner from './components/UI/Spinner/Spinner';
import Logout from './components/Auth/Logout/Logout';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions';
import 'typeface-roboto';
import i18n from './i18n';

const Checkout = React.lazy(() => {
  return import('./components/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./components/Orders/Orders');
});

const Settings = React.lazy(() => {
  return import('./components/Settings/Settings');
});

const Auth = React.lazy(() => {
  return import('./components/Auth/Auth');
});

const App = props =>  {

  const loggedIn = useSelector(state => state.auth.idToken != null);
  const languageCode = useSelector(state => state.settings.languageCode);

  const dispatch = useDispatch();

  const restoreTokens = useCallback(({userId, idToken, refreshToken}) => dispatch(actions.restoreTokens(userId, idToken, refreshToken)), [dispatch]);
  const restoreCurrency = useCallback(() => dispatch(actions.restoreCurrency()), [dispatch]);
  const restoreTheme = useCallback(() => dispatch(actions.restoreTheme()), [dispatch]);
  const restoreProfileImage = useCallback(() => dispatch(actions.restoreProfileImage()), [dispatch]);

  const restoreLanguage = useCallback(() => {
    dispatch(actions.restoreLanguage());
    if (languageCode) {
      i18n.changeLanguage(languageCode);
    }
  }, [dispatch, languageCode]);

  const loadSettings = useCallback((idToken, userId) => dispatch(actions.loadSettings(idToken, userId)), [dispatch]);

  const retrieveTokens = useCallback(() => {
    const userId = localStorage.getItem('userId');
    const idToken = localStorage.getItem('idToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expirationDate = localStorage.getItem('expirationDate');
    const result = new Date(expirationDate) > new Date();

    if (result){
        return {userId: userId, idToken: idToken, refreshToken: refreshToken};
    }

    return null;
  }, []);

  useEffect(() => {
    const tokens = retrieveTokens();
    if (tokens){
        restoreTokens(tokens);    
        loadSettings(tokens.idToken, tokens.userId);    
    }
    restoreCurrency();
    restoreTheme();
    restoreProfileImage();
    restoreLanguage();
  }, [restoreTokens, retrieveTokens, loadSettings, restoreLanguage, restoreCurrency, restoreTheme, restoreProfileImage])

    let routes = (
      <Fragment>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' exact component={Auth} />
      </Fragment>
    );

    if (loggedIn){
      routes = (
        <Fragment>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/settings' exact component={Settings} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Suspense fallback={<Spinner />}>
          <BrowserRouter basename='/BurgerBuilder/'>
            <LastLocationProvider>
              <Layout>
                <Switch>
                  {routes}
                </Switch>
              </Layout>
            </LastLocationProvider>
          </BrowserRouter>
        </Suspense>
      </Fragment>
    );
};

export default App;
