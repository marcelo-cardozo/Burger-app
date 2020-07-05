import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
    }

    addIngredientHandler = (type) => {
        console.log('[BurgerBuilder.js] addIngredientHandler')
        this.setState((prevState, props) =>{

            const ingredients = {...prevState.ingredients}
            ingredients[type]++

            const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type]

            return {
                ingredients,
                totalPrice: newPrice,
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

            return {
                ingredients,
                totalPrice: newPrice,
            }
        })
    }


    render(){
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Fragment>
        )
    }
}

export default BurgerBuilder;