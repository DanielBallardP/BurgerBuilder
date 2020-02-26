import React from 'react';

import classes from './Input.css';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const Input = props => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (!props.valid && props.validate && props.touched) {
        inputClasses.push(classes.Error);
        validationError = props.validationError;
    }

    switch (props.elementType){
        case ('input'):
            inputElement = <TextField error={validationError !== null}
            id="outlined-error-helper-text" label={props.name} variant="outlined" helperText={validationError} className={inputClasses.join(' ')} type={props.elementConfig.type} placeholder={props.elementConfig.placeholder} name={props.name} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} type={props.elementConfig.type} placeholder={props.elementConfig.placeholder} name={props.name} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <Select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (<option key={option.value} value={option.value}>{option.displayValue}</option>))}
                </Select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} type={props.elementConfig.type} placeholder={props.elementConfig.placeholder} name={props.name} value={props.value} onChanged={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>
                {props.label}
            </label>
            {inputElement}
        </div>
    );
}

export default Input;