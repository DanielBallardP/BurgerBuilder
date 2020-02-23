import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';

const logout = props => {

    const dispatch = useDispatch();
    const logout = () => dispatch(actions.signOut());

    useEffect(() => {
        logout();
    }, [logout])

    return (
        <Redirect to='/' />
    );
};

export default logout;