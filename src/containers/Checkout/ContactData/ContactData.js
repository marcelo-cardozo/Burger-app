import React, {Component, Fragment, useState} from "react";
import cssClasses from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {checkValidity, updateObject} from "../../../shared/utility";

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
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
    })
    const [formIsValid, setFormIsValid] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        Object.keys(orderForm).forEach(key => formData[key] = orderForm[key].value)

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            order: formData,
            userId: props.userId,
        }

        props.onOrderBurger(order)
    }

    const inputChangedHandler = (event, key) => {
        // change immutably the object key in the form
        const updatedFormElement = updateObject(orderForm[key],{
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, orderForm[key].validation)
        })

        const updatedForm = updateObject(orderForm, {
            [key]: updatedFormElement
        })

        const formIsValid = Object.keys(updatedForm)
            .reduce((acc, value) => acc && updatedForm[value].valid, true);

        setOrderForm(updatedForm)
        setFormIsValid(formIsValid)
    }

    let form = null
    if (props.loading) {
        form = <Spinner/>
    } else {
        const formElementsArray = Object.keys(orderForm).map(key => {
            const inputData = orderForm[key]
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
                <h4>Enter your contact data</h4>
                <form onSubmit={orderHandler}>
                    {formElementsArray}
                    <Button type="Success" clicked={orderHandler} disabled={!formIsValid}>ORDER</Button>
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


const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios))