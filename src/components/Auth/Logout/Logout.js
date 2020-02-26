import React, {useEffect, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';

const Logout = props => {

    const dispatch = useDispatch();
    const logout = useCallback(() => dispatch(actions.signOut()), [dispatch]);

    useEffect(() => {
        logout();
    }, [logout])

    return (
        <Redirect to='/' />
    );
};

export default Logout;