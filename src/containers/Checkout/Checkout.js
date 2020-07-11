import React, {Component, Fragment} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: null
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let totalPrice = 0
        Array.from(query.keys()).forEach(key => {
            if (key === 'totalPrice') {
                totalPrice = parseInt(query.get(key))
            } else {
                ingredients[key] = parseInt(query.get(key))
            }
        })

        this.setState({
            ingredients,
            totalPrice
        })
    }

    orderCancelled = () => {
        this.props.history.goBack()
    }

    orderContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        if (this.state.ingredients === null) {
            return <h3>Burger has no summary</h3>
        }
        return (
            <div>
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        orderCancelled={this.orderCancelled}
                        orderContinued={this.orderContinued}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                           render={(props) => {
                               return <ContactData ingredients={this.state.ingredients}
                                                   totalPrice={this.state.totalPrice}
                                                   {...props}/>
                           }}/>
                </Fragment>

            </div>

        );
    }
}

export default Checkout