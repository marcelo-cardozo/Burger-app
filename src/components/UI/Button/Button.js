import React from "react";
import cssClasses from './Button.css';
import PropTypes from "prop-types";
import burgerIngredient from "../../Burger/BurgerIngredient/BurgerIngredient";

const button = (props) => {
    const classes = [cssClasses.Button, cssClasses[props.type]]
    return <button className={classes.join(' ')} onClick={props.clicked}>{props.children}</button>
}

button.propTypes = {
    type: PropTypes.oneOf(['Danger', 'Success']).isRequired
}

export default button;