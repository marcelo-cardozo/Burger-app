import React, {Component, Fragment} from "react";
import cssClasses from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {checkValidity, updateObject} from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: { // attributes for the tag
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, // so invalid style is displayed
                touched: false, // so invalid style is not display by default,
                errorMessage: 'Name should not be empty'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Street should not be empty'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
                errorMessage: 'Zip code should have 5 characters'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Country should not be empty'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Name should not be empty'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayedValue: 'Fastest'},
                        {value: 'cheapest', displayedValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {

                },
                valid: true // it's always valid
            },
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        Object.keys(this.state.orderForm).forEach(key => formData[key] = this.state.orderForm[key].value)

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            order: formData,
            userId: this.props.userId,
        }

        this.props.onOrderBurger(this.props.token, order)
    }

    inputChangedHandler = (event, key) => {
        // change immutably the object key in the form
        const updatedFormElement = updateObject(this.state.orderForm[key],{
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm[key].validation)
        })

        const updatedForm = updateObject(this.state.orderForm, {
            [key]: updatedFormElement
        })

        const formIsValid = Object.keys(updatedForm)
            .reduce((acc, value) => acc && updatedForm[value].valid, true);

        this.setState({
            orderForm: updatedForm,
            formIsValid
        })

    }

    render() {
        let form = null
        if (this.props.loading) {
            form = <Spinner/>
        } else {
            const formElementsArray = Object.keys(this.state.orderForm).map(key => {
                const inputData = this.state.orderForm[key]
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
                    <h4>Enter your contact data</h4>
                    <form onSubmit={this.orderHandler}>
                        {formElementsArray}
                        <Button type="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>
                </Fragment>
            )
        }

        return (
            <div className={cssClasses.ContactData}>
                {form}
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (token, orderData) => dispatch(actionCreators.purchaseBurger(token, orderData))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios))