import React from "react";
import cssClasses from './BurgerIngredient.css';
import PropTypes from 'prop-types';

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={cssClasses.BreadBottom}/>
            break;
        case ('bread-top'):
            ingredient = (
                <div className={cssClasses.BreadTop}>
                    <div className={cssClasses.Seeds1}></div>
                    <div className={cssClasses.Seeds2}></div>
                </div>
            )
            break;
        case ('meat'):
            ingredient = <div className={cssClasses.Meat}/>
            break;
        case ('cheese'):
            ingredient = <div className={cssClasses.Cheese}/>
            break;
        case ('salad'):
            ingredient = <div className={cssClasses.Salad}/>
            break;
        case ('bacon'):
            ingredient = <div className={cssClasses.Bacon}/>
            break;
        default:
            break;
    }

    return ingredient;
}

burgerIngredient.propTypes = {
    type: PropTypes.oneOf(['bread-bottom', 'bread-top', 'meat', 'cheese', 'salad', 'bacon']).isRequired
}

export default burgerIngredient;