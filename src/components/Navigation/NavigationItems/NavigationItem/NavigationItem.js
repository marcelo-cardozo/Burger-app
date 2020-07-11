import React from "react";
import cssClasses from './NavigationItem.css'
import {NavLink} from "react-router-dom";

const navigationItem = (props) => {
    return (
        <li className={cssClasses.NavigationItem}>
            <NavLink to={props.link} activeClassName={cssClasses.active} exact>{props.children}</NavLink>
        </li>
    )
}

export default navigationItem;