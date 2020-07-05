import React, {Fragment} from "react";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(value =>
            <li key={value}>
                <span style={{textTransform: 'capitalize'}}>{value}</span>: {props.ingredients[value]}
            </li>)

    return (
        <Fragment>
            <h3>Order</h3>
            <p>Ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Fragment>
    )
}

export default orderSummary;