import React from "react";
import cssClasses from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {

    return (
        <header className={cssClasses.Toolbar}>
            <DrawerToggle clicked={props.drawerOpened}/>
            <div className={cssClasses.Logo}>
                <Logo/>
            </div>
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    )
}

export default toolbar;