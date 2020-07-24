import React, {Component, Fragment} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route, withRouter} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

const Checkout = (props) => {
    const orderCancelled = () => {
        props.history.goBack()
    }

    const orderContinued = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to="/"/>
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

        summary = (
            <Fragment>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    orderCancelled={orderCancelled}
                    orderContinued={orderContinued}
                />
                <Route path={props.match.path + '/contact-data'}
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

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased,
    }
}

export default withRouter(connect(mapStateToProps)(Checkout))