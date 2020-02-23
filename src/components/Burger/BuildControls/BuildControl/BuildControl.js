import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import classes from './BuildControl.css';

import photoBacon from '../../../../assets/images/photo_bacon.png';
import photoSalad from '../../../../assets/images/photo_salad.png';
import photoCheese from '../../../../assets/images/photo_cheese.png';
import photoMeat from '../../../../assets/images/photo_meat.png';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Popover from '@material-ui/core/Popover';

const buildControl = props => {
    const {label, type, price, icon, calories, description} = props;
    const currency = useSelector(state => state.settings.settings.currency);
    const theme = useSelector(state => state.settings.settings.theme);
    const cssClass = [classes.IngredientInfoHeader, classes[theme]];

    const [anchorEl, setAnchorEl] = useState(null);

    const {t} = useTranslation();

    const ingredientPhotos = {
        bacon: photoBacon,
        salad: photoSalad,
        cheese: photoCheese,
        meat: photoMeat
    }

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (    
        <div className={classes.BuildControl}>
            <div className={classes.BuildControlElement} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                <Icon classes={{root: classes.iconRoot}}><img className={classes.imageIcon} alt='icon' src={icon}/></Icon>
                <div className={classes.Label}>
                    <Typography>
                        {t(type)}
                    </Typography>
                </div>
                <div className={classes.Label}>
                    <Typography variant='button'>
                        {price} {currency}
                    </Typography>
                </div>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={cssClass.join(' ')}>
                    <div>
                        {t(type)}
                    </div>
                    <div>
                        {calories} cal.
                    </div>
                </div>
                <div className={classes.IngredientPhoto}>
                    <img src={ingredientPhotos[type]} alt={label} />
                </div>
                <div className={classes.IngredientInfo}>
                    {description}
                </div>
            </Popover>
            <Button disabled={props.disabled} disableElevation onClick={props.remove} variant="contained" className={classes.Less}>
                <RemoveIcon />
            </Button>
            <Button onClick={props.add} disableElevation variant="contained" className={classes.More}>
                <AddIcon />
            </Button>
        </div>
    );
};

export default buildControl;