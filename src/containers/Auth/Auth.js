import React, {Component, Fragment} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import cssClasses from "./Auth.css";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
    state = {
        form: {
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
        },
        isSignUp: true,
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = isValid && value.trim() !== ''
        }

        if (rules.minLength) {
            isValid = isValid && value.trim().length >= rules.minLength
        }

        if (rules.maxLength) {
            isValid = isValid && value.trim().length <= rules.maxLength
        }

        if (rules.isEmail) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = isValid && re.test(String(value).toLowerCase())
        }

        if (rules.isNumeric) {
            const re = /^\d+$/;
            isValid = isValid && re.test(String(value))
        }
        return isValid
    }

    inputChangedHandler = (event, key) => {
        // change immutably the object key in the form
        const updatedForm = {
            ...this.state.form,
            [key]: {
                ...this.state.form[key],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.form[key].validation),
                touched: true,
            }
        }
        this.setState({
            form: updatedForm,
        })

    }

    onAuth = (event) => {
        event.preventDefault()

        const formData = {}
        Object.keys(this.state.form).forEach(key => formData[key] = this.state.form[key].value)

        this.props.onAuth(formData.email, formData.password, this.state.isSignUp)
    }

    switchSignMethod = () => {
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {
        let form = <Spinner />
        if(!this.props.loading){

            const formElementsArray = Object.keys(this.state.form).map(key => {
                const inputData = this.state.form[key]
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
                        changed={(event) => this.inputChangedHandler(event, key)}/>
                )
            })

            form = (
                <Fragment>
                    <h4>Enter your credentials</h4>
                    <form onSubmit={this.onAuth}>
                        {formElementsArray}
                        <Button type="Success">{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                    </form>
                    <Button type="Danger" clicked={this.switchSignMethod}>SWITCH TO {!this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                </Fragment>
            )
        }

        const errorMessage = this.props.error ? <p>{this.props.error}</p> : null

        return (
            <div className={cssClasses.Auth}>
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)