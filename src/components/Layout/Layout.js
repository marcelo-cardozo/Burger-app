import React, {Fragment} from "react";
import cssClasses from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
    return (
        <Fragment>
            <SideDrawer/>
            <Toolbar/>

            <main className={cssClasses.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default layout;