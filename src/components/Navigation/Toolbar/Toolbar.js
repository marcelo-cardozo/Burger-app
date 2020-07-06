import React from "react";
import cssClasses from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => {

    return (
        <header className={cssClasses.Toolbar}>
            <div onClick={props.drawerOpened}>Menu</div>
            <div className={cssClasses.Logo}>
                <Logo/>
            </div>
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toolbar;