import React from "react";
import cssClasses from './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },

]

const buildControls = (props) => {
    return (
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((value) =>
                <BuildControl key={value.label}
                              label={value.label}
                              added={props.ingredientAdded.bind(this, value.type)}
                              removed={props.ingredientRemoved.bind(this, value.type)}
                              disableLess={props.disabled[value.type]}
                />)
            }
            <button
                className={cssClasses.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>
                {props.isAuth ? "ORDER":"SIGN UP TO ORDER"}
            </button>
        </div>
    );
}

export default buildControls;