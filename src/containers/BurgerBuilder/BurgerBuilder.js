import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    meat: 2,
    salad: .5,
    bacon: .9,
    cheese: .8,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    isPurchasable = (ingredients) =>
        Object.keys(ingredients)
            .reduce(
                (prev, actual) => prev + ingredients[actual], 0) > 0

    addIngredientHandler = (type) => {
        console.log('[BurgerBuilder.js] addIngredientHandler')
        this.setState((prevState, props) =>{

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

        this.setState((prevState, props) =>{
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


    render(){
        const disabledInfo = Object.keys(this.state.ingredients)
            .reduce((set,actual)=> {
                set[actual] = this.state.ingredients[actual] === 0
                return set
            },{})
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>

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
    }
}

export default BurgerBuilder;