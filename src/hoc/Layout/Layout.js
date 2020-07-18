import React, {Fragment, useState} from "react";
import cssClasses from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

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
            <SideDrawer
                isAuth={props.isAuthenticated}
                show={layoutState.showDrawer}
                drawerClosed={sideDrawerCloseHandler}/>

            <Toolbar
                isAuth={props.isAuthenticated}
                drawerOpened={sideDrawerOpenHandler}/>

            <main className={cssClasses.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);