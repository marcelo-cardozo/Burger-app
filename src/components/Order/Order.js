import React from "react";
import cssClasses from "./Order.css";

const order = (props) => {
    const ingredients = Object.keys(props.ingredients).map(key => {
        return {
            name: key,
            amount: props.ingredients[key]
        }
    })

    const ingredientsOutput = ingredients.filter(value => value.amount > 0).map(ingredient => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px',
        }}>{ingredient.name} ({ingredient.amount}) </span>
    })


    return (
        <div className={cssClasses.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
        </div>
    )
}

export default order;