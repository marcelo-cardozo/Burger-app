import React, {Component, Fragment} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router";
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
        if (this.props.ingredients === null) {
            return <h3>Burger has no summary</h3>
        }
        return (
            <div>
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        orderCancelled={this.orderCancelled}
                        orderContinued={this.orderContinued}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </Fragment>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout)