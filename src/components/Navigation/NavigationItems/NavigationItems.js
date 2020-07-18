import React from "react";
import cssClasses from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {!props.isAuth ?
                <NavigationItem link="/auth">Authenticate</NavigationItem> :
                <NavigationItem link="/logout">Logout</NavigationItem>}

        </ul>
    )
}

export default navigationItems;