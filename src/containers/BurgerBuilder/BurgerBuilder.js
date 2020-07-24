import React, {Fragment, useCallback, useEffect, useState} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect, useDispatch, useSelector} from "react-redux";
import * as actionCreators from "../../store/actions";

export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false)

    const dispatch = useDispatch()
    const onAddIngredient = (type) => dispatch(actionCreators.addIngredient(type))
    const onRemoveIngredient = (type) => dispatch(actionCreators.removeIngredient(type))
    const onInitIngredients = useCallback(() => dispatch(actionCreators.initIngredients()), [])
    const onInitPurchase = () => dispatch(actionCreators.purchaseInit())
    const onSetAuthRedirectPath = (path) => dispatch(actionCreators.setAuthRedirectPath(path))

    const ingredients = useSelector((state) =>  state.burger.ingredients)
    const totalPrice = useSelector((state) =>  state.burger.totalPrice)
    const error = useSelector((state) =>  state.burger.error)
    const isAuthenticated = useSelector((state) =>  state.auth.token !== null)

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const isPurchasable = (ings) =>
        Object.keys(ings)
            .reduce((prev, actual) => prev + ings[actual], 0) > 0

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const cancelPurchaseHandler = () => {
        setPurchasing(false)
    }

    const continuePurchaseHandler = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }


    let burger = null
    let orderSummary = null

    if (ingredients) {

        const disabledInfo = Object.keys(ingredients)
            .reduce((set, actual) => {
                set[actual] = ingredients[actual] === 0
                return set
            }, {})

        burger = (
            <Fragment>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    purchasable={isPurchasable(ingredients)}
                    price={totalPrice}
                    disabled={disabledInfo}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                    ingredientAdded={onAddIngredient}
                    ingredientRemoved={onRemoveIngredient}/>
            </Fragment>
        )

        orderSummary = <OrderSummary
            price={totalPrice}
            ingredients={ingredients}
            purchaseCancelled={cancelPurchaseHandler}
            purchaseContinued={continuePurchaseHandler}/>
    } else {
        burger = error ? <p>Error loading ingredients</p> : <Spinner/>
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

export default withErrorHandler(BurgerBuilder, Axios);