import React, {Fragment} from "react";
import cssClasses from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    const ingredients = Object.keys(props.ingredients).map(
        (igKey) => [...Array(props.ingredients[igKey])]
            .map((_, i) =>
                <BurgerIngredient key={igKey + '_' + i} type={igKey}/>
            )
    ).flat()
    const amount = ingredients.length

    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top"/>
            { amount === 0 ? <p>Add ingredients</p> :
                <Fragment>
                    {ingredients}
                </Fragment>
            }
            <BurgerIngredient type="bread-bottom"/>

        </div>
    )
}

export default burger;