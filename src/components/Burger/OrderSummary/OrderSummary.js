import React, {Fragment} from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
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
            <p><strong>Price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button type="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    )
}

export default OrderSummary;