import React, {Component, Fragment} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {

    orderCancelled = () => {
        this.props.history.goBack()
    }

    orderContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/"/>
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = (
                <Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        orderCancelled={this.orderCancelled}
                        orderContinued={this.orderContinued}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </Fragment>
            )
        }
        return (
            <div>
                {summary}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout)