import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import * as actions from '../../../store/actions';
import classes from './ProfileSettings.css';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const ProfileSettings = props => {

    const avatar = useSelector(state => state.settings.settings.profileImage);

    const dispatch = useDispatch();

    const changeProfileImage = useCallback(profileImage => dispatch(actions.changeProfileImage(profileImage)), [dispatch]);
    const removeProfileImage = useCallback(() => dispatch(actions.removeProfileImage()), [dispatch]);

    const {t} = useTranslation();

    const toggleAvatar = useCallback(avatar => {
        const imageTag = document.getElementById('avatar');
        imageTag.hidden = false;
        imageTag.src = `${avatar}`;
    },[]);

    useEffect(() => {
        if (avatar !== 'empty') {
            toggleAvatar(avatar);
        }
    }, [toggleAvatar, avatar]);

    const selectFile = event => {
        document.getElementById('file-input').click();
    }

    const handleFiles = event => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        const imageTag = document.getElementById('avatar');
      
        reader.onload = function(event) {
            imageTag.src = event.target.result;
            imageTag.hidden = false;
            changeProfileImage(imageTag.src);
        };

        if(selectedFile !== undefined && selectedFile.type && selectedFile.type.indexOf('image') !== -1){
            reader.readAsDataURL(selectedFile);
        }
    }

    const removeProfileImageElement = (
        <div className={classes.RemoveIcon}>
            <Button disableElevation variant="contained" onClick={removeProfileImage} disabled = {avatar.includes('avatar-placeholder')}>
                {t('remove', 'Remove')}
            </Button>
        </div>
    );

    return (
        <div className={classes.Setting}>
            <Tooltip title={t('addProfileImage', 'Add profile image')}>
                <div 
                    className={classes.ProfileImage} 
                    onClick={e => selectFile(e)}
                >
                    <img id='avatar' hidden alt='avatar'/>
                </div>
            </Tooltip>
            {removeProfileImageElement}
            <input 
                id="file-input" 
                type="file" 
                name="name" 
                className={classes.Input} 
                onChange={event => handleFiles(event)}
            />
        </div>
    );
};

export default ProfileSettings;

//                <DeleteForeverIcon onClick={removeProfileImage}/>