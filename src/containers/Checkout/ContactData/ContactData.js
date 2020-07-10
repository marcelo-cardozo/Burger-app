import React, {Component, Fragment} from "react";
import cssClasses from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        customer: {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: '',
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Marcelo Cardozo',
                address: {
                    street: 'test',
                    zipCode: '1234',
                    country: 'Paraguay'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = null
        if (this.state.loading){
            form = <Spinner />
        } else {
            form = (
                <Fragment>
                    <h4>Enter your contact data</h4>
                    <form>
                        <input type="text" name="name" placeholder="Your Name"/>
                        <input type="email" name="email" placeholder="Your Email"/>
                        <input type="text" name="street" placeholder="Your Street"/>
                        <input type="text" name="postal" placeholder="Your Postal Code"/>

                        <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;