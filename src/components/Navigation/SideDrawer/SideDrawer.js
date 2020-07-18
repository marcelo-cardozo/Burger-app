import React, {Fragment} from "react";
import cssClasses from './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
    const sideDrawerClasses = [cssClasses.SideDrawer]
    if (props.show) {
        sideDrawerClasses.push(cssClasses.Open)
    } else {
        sideDrawerClasses.push(cssClasses.Close)
    }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.drawerClosed}/>

            <div className={sideDrawerClasses.join(' ')} onClick={props.drawerClosed}>
                <div className={cssClasses.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Fragment>
    )
}

export default sideDrawer;