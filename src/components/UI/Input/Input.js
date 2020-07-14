import React from "react";
import cssClasses from "./Input.css";

const input = (props) => {
    let inputElement = null
    const inputClasses = [cssClasses.InputElement]

    let validationError = null

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(cssClasses.Invalid)
        validationError = <p className={cssClasses.ValidationError}>{props.errorMessage}</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}
                                  onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}
                                     onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option =>
                        <option value={option.value} key={option.value}>
                            {option.displayedValue}
                        </option>)}
                </select>
            )
            break
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}
                                  onChange={props.changed}/>
    }

    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;