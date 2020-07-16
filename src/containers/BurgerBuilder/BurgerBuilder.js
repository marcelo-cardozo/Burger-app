import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions";



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    isPurchasable = (ingredients) =>
        Object.keys(ingredients)
            .reduce(
                (prev, actual) => prev + ingredients[actual], 0) > 0

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout')
    }

    componentDidMount() {
        // Axios.get('/ingredients.json')
        //     .then(resp => {
        //         this.setState({
        //             ingredients: resp.data,
        //             error: false,
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             ingredients: null,
        //             error: true,
        //         })
        //     })
    }

    render() {
        let burger = null
        let orderSummary = null

        if (this.props.ingredients !== null) {

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
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}/>
                </Fragment>
            )

            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}/>
        } else {
            burger = this.state.error ? <p>Error loading ingredients</p> : <Spinner/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (type) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            payload: {
                ingredient: type
            }
        }),
        removeIngredientHandler: (type) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            payload: {
                ingredient: type
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));