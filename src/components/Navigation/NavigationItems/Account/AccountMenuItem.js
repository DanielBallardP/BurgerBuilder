import React, {useState, useRef, useEffect, memo} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import classes from './AccountMenuItem.css';

import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const AccountMenu = props => {
  const theme = useSelector(state => state.settings.settings.theme);
  const cssClass = [classes.Account, classes[theme]];

  const avatar = useSelector(state => state.settings.settings.profileImage);

  const [open, setOpen] = useState(false);
  
  const anchorRef = useRef(null);

  const {t} = useTranslation(['translation']);

  const history = useHistory();

  const handleProfile = () => {
    history.push('/settings?show=profile');
    setOpen(false);
  };

  const handleAccount = () => {
    history.push('/settings?show=account');
    setOpen(false);
  }

  const handleLogout = () => {
    history.push('/logout');
    setOpen(false);
  };

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
        <div className={cssClass.join(' ')} onClick={handleToggle} >
          <Tooltip title={t('account', 'Account')}>
              {avatar !== 'empty' ? <Avatar alt="avatar" ref={anchorRef} src={avatar} className={classes.Avatar} /> : <AccountCircle ref={anchorRef} className={classes.Avatar} />}
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
                  <MenuItem onClick={handleProfile}>{t('profile', 'Profile')}</MenuItem>
                  <MenuItem onClick={handleAccount}>{t('account', 'Account')}</MenuItem>
                  <MenuItem onClick={handleLogout}>{t('logout', 'Logout')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
    );
}

export default memo(AccountMenu);