import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import cssClasses from "./Auth.css";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router";
import {checkValidity} from "../../shared/utility";

const Auth = (props) => {
    const {isBuildingBurger, authRedirectPath, onResetAuthRedirectPath} = props

    const [formState, setFormState] = useState({
        email: {
            elementType: 'input',
            elementConfig: { // attributes for the tag
                type: 'email',
                placeholder: 'Email address',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false, // so invalid style is displayed
            touched: false, // so invalid style is not display by default,
            errorMessage: 'Email should not be empty'
        },
        password: {
            elementType: 'input',
            elementConfig: { // attributes for the tag
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false, // so invalid style is displayed
            touched: false, // so invalid style is not display by default,
        },
    })
    const [isSignUp, setIsSignUp] = useState(true)

    useEffect(() => {
        if (!isBuildingBurger && authRedirectPath !== '/') {
            onResetAuthRedirectPath()
        }
    }, [isBuildingBurger, authRedirectPath, onResetAuthRedirectPath])

    const inputChangedHandler = (event, key) => {
        // change immutably the object key in the form
        const updatedForm = {
            ...formState,
            [key]: {
                ...formState[key],
                value: event.target.value,
                valid: checkValidity(event.target.value, formState[key].validation),
                touched: true,
            }
        }
        setFormState(updatedForm)
    }

    const onAuth = (event) => {
        event.preventDefault()

        const formData = {}
        Object.keys(formState).forEach(key => formData[key] = formState[key].value)

        props.onAuth(formData.email, formData.password, isSignUp)
    }

    const switchSignMethod = useCallback(() => {
        setIsSignUp(prevState => !prevState)
    }, [])

    const switchSignButton = useMemo(() => {
        return (
            <Button type="Danger" clicked={switchSignMethod}>SWITCH
                TO {!isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>)
    }, [switchSignMethod, isSignUp])

    if (props.isAuthenticated) {
        let redirect = <Redirect to="/"/>
        if (props.isBuildingBurger) {
            redirect = <Redirect to={props.authRedirectPath}/>
        }
        return redirect
    }

    let form = <Spinner/>
    if (!props.loading) {

        const formElementsArray = Object.keys(formState).map(key => {
            const inputData = formState[key]
            return (
                <Input
                    key={key}
                    elementType={inputData.elementType}
                    elementConfig={inputData.elementConfig}
                    value={inputData.value}
                    invalid={!inputData.valid}
                    shouldValidate={inputData.validation !== undefined}
                    touched={inputData.touched}
                    errorMessage={inputData.errorMessage}
                    changed={(event) => inputChangedHandler(event, key)}/>
            )
        })


        form = (
            <Fragment>
                <h4>Enter your credentials</h4>
                <form onSubmit={onAuth}>
                    {formElementsArray}
                    <Button type="Success">{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                </form>
                {switchSignButton}
            </Fragment>
        )
    }

    const errorMessage = props.error ? <p>{props.error}</p> : null

    return (
        <div className={cssClasses.Auth}>
            {errorMessage}
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        isBuildingBurger: state.burger.building,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onResetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath('/')),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)