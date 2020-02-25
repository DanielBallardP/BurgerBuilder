import React, {Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';

import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const {error, resetErrorHandler} = useHttpErrorHandler(axios);

        return (
            <Fragment>
                <Modal show={error} closeModal={resetErrorHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    };
};

export default withErrorHandler;