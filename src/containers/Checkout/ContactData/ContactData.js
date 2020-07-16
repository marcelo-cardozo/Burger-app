import React, {Component, Fragment} from "react";
import cssClasses from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";

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
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        Object.keys(this.state.orderForm).forEach(key => formData[key] = this.state.orderForm[key].value)

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            order: formData
        }

        this.setState({
            loading: true
        })
        Axios.post('/orders.json', order)
            .then(response => {
                console.log('[continuePurchaseHandler] ', response)

                this.props.history.push('/')

                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                console.log('[continuePurchaseHandler] ', error)
                this.setState({
                    loading: false
                })
            })
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required){
            isValid = isValid && value.trim() !== ''
        }

        if (rules.minLength) {
            isValid = isValid && value.trim().length >= rules.minLength
        }

        if (rules.maxLength) {
            isValid = isValid && value.trim().length <= rules.maxLength
        }

        return isValid
    }

    inputChangedHandler = (event, key) => {
        // change immutably the object key in the form
        const updatedForm = {...this.state.orderForm}
        updatedForm[key] = {
            ...updatedForm[key],
            value: event.target.value,
            touched: true
        }
        updatedForm[key].valid = this.checkValidity(updatedForm[key].value, updatedForm[key].validation)

        const formIsValid = Object.keys(updatedForm)
            .reduce((acc, value) => acc && updatedForm[value].valid, true);

        this.setState({
            orderForm: updatedForm,
            formIsValid
        })

    }

    render() {
        let form = null
        if (this.state.loading) {
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

export default connect(mapStateToProps)(ContactData)