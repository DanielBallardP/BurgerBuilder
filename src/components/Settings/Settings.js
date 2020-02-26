import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import CurrencySetting from './CurrencySettings/CurrencySetting';
import ThemeSetting from './ThemeSetting/ThemeSetting';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import AccountSettings from './AccountSettings/AccountSettings';

import * as actions from '../../store/actions';
import classes from './Settings.css';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const Settings = props => {

    const token = useSelector(state => state.auth.idToken);
    const userId = useSelector(state => state.auth.userId);
    const addedSettings = useSelector(state => state.settings.settings);
    const settingsChanged = useSelector(state => state.settings.changed);

    const history = useHistory();

    const dispatch = useDispatch();

    const hideBurgerStepper = useCallback(() => dispatch(actions.hideBurgerStepper()), [dispatch]);
    const sendSettings = useCallback((settings, token) => dispatch(actions.sendSettings(settings, token)), [dispatch]);

    const [expanded, setExpanded] = useState(false);

    const {t} = useTranslation();

    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const sendAddedSettings = () => {
      sendSettings({...addedSettings, userId: userId}, token);
    };

    const checkOriginProfileMenu = useCallback(() => {
      if (history.location.search === '?show=profile') {
        setExpanded('profile');
      } else if (history.location.search === '?show=account') {
        setExpanded('account');
      }
    }, [history.location.search]);

    useEffect(() => {
        hideBurgerStepper();
        checkOriginProfileMenu();
    }, [hideBurgerStepper, checkOriginProfileMenu]);

    return (
        <div className={classes.Settings}>
          <ExpansionPanel expanded={expanded === 'general'} onChange={handleChange('general')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{t('generalSettings', 'General settings')}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <CurrencySetting />
                <ThemeSetting />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'profile'} onChange={handleChange('profile')}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>{t('profileSettings', 'Profile settings')}</Typography>
            </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <ProfileSettings />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'account'} onChange={handleChange('account')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>{t('accountSettings', 'Account settings')}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <AccountSettings />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Button disabled={!settingsChanged} onClick={sendAddedSettings} variant="contained">{t('save', 'Save')}</Button>
      </div>
    );
};

export default Settings;