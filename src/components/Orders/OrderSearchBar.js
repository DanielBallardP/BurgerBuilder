import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import * as actions from '../../store/actions';
import classes from './OrderSearchBar.css';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const orderSearchBar = props => {

    const sorting = useSelector(state => state.order.sortBy);
    const orderSearchDate = useSelector(state => state.order.orderSearchDate);

    const [openSearchBar, setOpenSearchBar] = useState(false);
    const [sortBy, setSortBy] = useState(sorting);

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    const {t} = useTranslation();

    const dispatch = useDispatch();

    const setOrderSorting = useCallback(sortBy => dispatch(actions.setOrderSorting(sortBy)), []);
    const setOrderDate = useCallback(orderSearchDate => dispatch(actions.setOrderSearchDate(orderSearchDate)), []);

    let attachedClasses = [classes.SearchBar, classes.Close];
    
    if (openSearchBar) {
        attachedClasses = [classes.SearchBar, classes.Open];
    }

    useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const displaySearchBar = () => {
      setOpenSearchBar(true);
    }

    const hideSearchBar = () => {
      const searchDateField = document.getElementById('date');
      searchDateField.value='';
      setOrderDate('');
      setOpenSearchBar(false);
    }

    const handleSortingChange = event => {
      setSortBy(event.target.value);
      setOrderSorting(event.target.value);
    };

    const searchIcon = (
      <Tooltip title={t('searchOrder', 'Search order')}>
            <SearchIcon onClick={displaySearchBar}/>
      </Tooltip>
    );

    const closeIcon = (
      <Tooltip title={t('closeSearchBar', 'Close search bar')}>
          <CloseIcon onClick={hideSearchBar}/>
      </Tooltip>
    );

    let searchBarIcon = searchIcon;

    if (openSearchBar) {
      searchBarIcon = closeIcon;
    }

    return (
        <div className={attachedClasses.join(' ')}>
          <div className={classes.SortBy}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                {t('sortBy', 'Sort by')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={sortBy}
                onChange={event => handleSortingChange(event)}
                labelWidth={labelWidth}
              >
                <MenuItem value='date'>{t('date', 'Date')}</MenuItem>
                <MenuItem value='price'>{t('price', 'Price')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
            id='date'
            label={t('orderDate', 'Order date')}
            type='date'
            defaultValue={orderSearchDate}
            onChange={e => setOrderDate(e.target.value)}
            className={classes.textField}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            />
          </div>
          {searchBarIcon}
        </div>
    );
}

export default orderSearchBar;