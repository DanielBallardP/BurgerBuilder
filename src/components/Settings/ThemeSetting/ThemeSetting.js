import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import * as actions from '../../../store/actions';
import classes from './ThemeSetting.css';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const ThemeSetting = props => {

    const theme = useSelector(state => state.settings.settings.theme);

    const dispatch = useDispatch();

    const changeTheme = useCallback(theme => dispatch(actions.changeTheme(theme)), [dispatch]);

    const {t} = useTranslation();

    return (
        <div className={classes.Setting}>
          <FormControl className={classes.FormControl}>
            <InputLabel id="demo-simple-select-label">
              {t('theme', 'Theme')}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theme}
              onChange={event => changeTheme(event.target.value)}
            >
              <MenuItem value='Blue'>Blue</MenuItem>
              <MenuItem value='Gray'>Gray</MenuItem>
            </Select>
          </FormControl>
        </div>
    );
};

export default ThemeSetting;