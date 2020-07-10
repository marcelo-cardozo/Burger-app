import React from "react";
import cssClasses from "./Order.css";

const order = (props) => {

    return (
        <div className={cssClasses.Order}>
            <p>Ingredients: Salad</p>
            <p>Price: <strong>4000 $</strong></p>
        </div>
    )
}

export default order;