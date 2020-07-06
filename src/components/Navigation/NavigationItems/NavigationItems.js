import React from "react";
import cssClasses from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
}

export default navigationItems;