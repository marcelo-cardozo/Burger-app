import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: null
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = Array.from(query.keys()).reduce((acc, key) => {
            acc[key] = parseInt(query.get(key))
            return acc
        }, {})

        this.setState({
            ingredients
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

                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    orderCancelled={this.orderCancelled}
                    orderContinued={this.orderContinued}
                />
            </div>

        );
    }
}

export default Checkout