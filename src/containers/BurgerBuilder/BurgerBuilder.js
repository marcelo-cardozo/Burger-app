import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    meat: 2,
    salad: .5,
    bacon: .9,
    cheese: .8,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    isPurchasable = (ingredients) =>
        Object.keys(ingredients)
            .reduce(
                (prev, actual) => prev + ingredients[actual], 0) > 0

    addIngredientHandler = (type) => {
        console.log('[BurgerBuilder.js] addIngredientHandler')
        this.setState((prevState, props) => {

            const ingredients = {...prevState.ingredients}
            ingredients[type]++

            const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type]

            const purchasable = this.isPurchasable(ingredients)

            return {
                ingredients,
                totalPrice: newPrice,
                purchasable,
            }
        })

    }
    removeIngredientHandler = (type) => {
        console.log('[BurgerBuilder.js] removeIngredientHandler')

        this.setState((prevState, props) => {
            if (prevState.ingredients[type] === 0)
                return prevState;

            const ingredients = {...prevState.ingredients}
            ingredients[type]--

            const newPrice = prevState.totalPrice - INGREDIENT_PRICES[type]

            const purchasable = this.isPurchasable(ingredients)

            return {
                ingredients,
                totalPrice: newPrice,
                purchasable,
            }
        })
    }

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
        const queryParams = Object.keys(this.state.ingredients).reduce((acc, key) => {
            acc.push(encodeURIComponent(key)+'='+encodeURIComponent(this.state.ingredients[key]))
            return acc
        }, [])
        queryParams.push('totalPrice='+this.state.totalPrice)

        const queryParamsString = queryParams.join('&')
        this.props.history.push(
            {
                pathname: `/checkout`,
                search: `?${queryParamsString}`
            })

    }

    componentDidMount() {
        Axios.get('/ingredients.json')
            .then(resp => {
                this.setState({
                    ingredients: resp.data,
                    error: false,
                })
            })
            .catch(error => {
                this.setState({
                    ingredients: null,
                    error: true,
                })
            })
    }

    render() {
        let burger = null
        let orderSummary = null

        if (this.state.ingredients !== null) {
            const disabledInfo = Object.keys(this.state.ingredients)
                .reduce((set, actual) => {
                    set[actual] = this.state.ingredients[actual] === 0
                    return set
                }, {})

            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}/>
                </Fragment>
            )

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, Axios);