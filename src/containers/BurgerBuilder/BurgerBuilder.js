import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";



export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    isPurchasable = (ingredients) =>
        Object.keys(ingredients)
            .reduce(
                (prev, actual) => prev + ingredients[actual], 0) > 0

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })

    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    render() {
        let burger = null
        let orderSummary = null

        if (this.props.ingredients) {

            const disabledInfo = Object.keys(this.props.ingredients)
                .reduce((set, actual) => {
                    set[actual] = this.props.ingredients[actual] === 0
                    return set
                }, {})

            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        purchasable={this.isPurchasable(this.props.ingredients)}
                        price={this.props.totalPrice}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}/>
                </Fragment>
            )

            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}/>
        } else {
            burger = this.props.error ? <p>Error loading ingredients</p> : <Spinner/>
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch(actionCreators.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(actionCreators.removeIngredient(type)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));