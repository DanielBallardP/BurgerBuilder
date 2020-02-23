import React, {Fragment, memo} from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

const modal = props => {
        return (
            <Fragment>
                <Backdrop show={props.show} clicked={props.closeModal}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}
                >
                    {props.children}
                </div>
            </Fragment>
        )
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
}

export default memo(modal, areEqual);