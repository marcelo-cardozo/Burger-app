import React, {Fragment, useEffect, useState} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";

export const BurgerBuilder = (props) => {
    const {onInitIngredients} = props

    const [purchasing, setPurchasing] = useState(false)

    useEffect(()=>{
        onInitIngredients()
    }, [onInitIngredients])

    const isPurchasable = (ingredients) =>
        Object.keys(ingredients)
            .reduce((prev, actual) => prev + ingredients[actual], 0) > 0

    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const cancelPurchaseHandler = () => {
        setPurchasing(false)
    }

    const continuePurchaseHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }



    let burger = null
    let orderSummary = null

    if (props.ingredients) {

        const disabledInfo = Object.keys(props.ingredients)
            .reduce((set, actual) => {
                set[actual] = props.ingredients[actual] === 0
                return set
            }, {})

        burger = (
            <Fragment>
                <Burger ingredients={props.ingredients}/>
                <BuildControls
                    purchasable={isPurchasable(props.ingredients)}
                    price={props.totalPrice}
                    disabled={disabledInfo}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    ingredientAdded={props.onAddIngredient}
                    ingredientRemoved={props.onRemoveIngredient}/>
            </Fragment>
        )

        orderSummary = <OrderSummary
            price={props.totalPrice}
            ingredients={props.ingredients}
            purchaseCancelled={cancelPurchaseHandler}
            purchaseContinued={continuePurchaseHandler}/>
    } else {
        burger = props.error ? <p>Error loading ingredients</p> : <Spinner/>
    }

    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    )
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