import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import * as actions from '../../../../store/actions';
import classes from './LanguageMenuItem.css';

import flag_en from '../../../../assets/icons/en.svg';
import flag_de from '../../../../assets/icons/de.svg';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const languageMenu = props => {
  const theme = useSelector(state => state.settings.settings.theme);
  const cssClass = [classes.Language, classes[theme]];

  const languageCode = useSelector(state => state.settings.languageCode);

  const {t, i18n} = useTranslation(['translation']);

  const dispatch = useDispatch();

  const changeLanguage = useCallback(code => {
    dispatch(actions.changeLanguage(code));
    i18n.changeLanguage(code);
    setOpen(false);
  }, []);

  const languages = {
      'en': flag_en,
      'de': flag_de
  };

  const [open, setOpen] = useState(false);
  
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

    return (
      <div className={cssClass.join(' ')}>
        <div className={cssClass.join(' ')} onClick={handleToggle}>
            <Tooltip title={t('language', 'Language')}>
                <Icon classes={{root: classes.iconRoot}} ref={anchorRef}><img className={classes.imageIcon} alt='icon' src={languages[languageCode]}/></Icon>
            </Tooltip>
        </div>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={() => changeLanguage('en')}><Icon classes={{root: classes.iconRoot}}><img className={classes.imageIcon} alt='icon' src={languages['en']}/></Icon></MenuItem>
                  <MenuItem onClick={() => changeLanguage('de')}><Icon classes={{root: classes.iconRoot}}><img className={classes.imageIcon} alt='icon' src={languages['de']}/></Icon></MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
    );
}

export default memo(languageMenu);