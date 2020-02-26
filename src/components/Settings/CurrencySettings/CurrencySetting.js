import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import * as actions from '../../../store/actions';
import classes from './CurrencySetting.css';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const CurrencySetting = props => {

    const currency = useSelector(state => state.settings.settings.currency);

    const dispatch = useDispatch();

    const changeCurrency = useCallback(currency => dispatch(actions.changeCurrency(currency)), [dispatch]);

    const {t} = useTranslation();

    return (
        <div className={classes.Setting}>
          <FormControl className={classes.FormControl}>
            <InputLabel id="demo-simple-select-label">
              {t('currency', 'Currency')}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              onChange={event => changeCurrency(event.target.value)}
            >
              <MenuItem value='EUR'>EUR</MenuItem>
              <MenuItem value='USD'>USD</MenuItem>
            </Select>
          </FormControl>
        </div>
    );
};

export default CurrencySetting;