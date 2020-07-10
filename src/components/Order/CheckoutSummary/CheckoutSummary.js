import React, {Fragment} from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import cssClasses from "./CheckoutSummary.css";

const checkoutSummary = (props) => {

    return (
        <div className={cssClasses.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>

            <Button type="Danger" clicked>CANCEL</Button>
            <Button type="Success" clicked>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary