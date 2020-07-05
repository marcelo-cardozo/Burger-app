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
            {controls.map((value) =>
                <BuildControl key={value.label}
                              label={value.label}
                              added={props.ingredientAdded.bind(this, value.type)}
                              removed={props.ingredientRemoved.bind(this, value.type)}
                />)
            }
        </div>
    );
}

export default buildControls;