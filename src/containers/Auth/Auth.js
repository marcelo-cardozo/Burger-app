import React, {Component, Fragment} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import cssClasses from "./Auth.css";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router";
import {checkValidity} from "../../shared/utility";

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

    inputChangedHandler = (event, key) => {
        // change immutably the object key in the form
        const updatedForm = {
            ...this.state.form,
            [key]: {
                ...this.state.form[key],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.form[key].validation),
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

    componentDidMount() {
        if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onResetAuthRedirectPath()
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            let redirect = <Redirect to="/"/>
            if (this.props.isBuildingBurger) {
                redirect = <Redirect to={this.props.authRedirectPath}/>
            }
            return redirect
        }

        let form = <Spinner/>
        if (!this.props.loading) {

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
                    <Button type="Danger" clicked={this.switchSignMethod}>SWITCH
                        TO {!this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
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