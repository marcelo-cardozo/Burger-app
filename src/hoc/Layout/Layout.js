import React, {Fragment, useState} from "react";
import cssClasses from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
    const [layoutState, setLayoutState] = useState({
        showDrawer: false
    })

    const sideDrawerOpenHandler = () => {
        setLayoutState({
            showDrawer: true
        })
    }

    const sideDrawerCloseHandler = () => {
        setLayoutState({
            showDrawer: false
        })
    }

    return (
        <Fragment>
            <SideDrawer show={layoutState.showDrawer} drawerClosed={sideDrawerCloseHandler}/>

            <Toolbar drawerOpened={sideDrawerOpenHandler}/>

            <main className={cssClasses.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;