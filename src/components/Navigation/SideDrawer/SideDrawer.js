import React from "react";
import cssClasses from './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const sideDrawer = (props) => {

    return (
        <div className={cssClasses.SideDrawer}>
            <div className={cssClasses.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    )
}

export default sideDrawer;