import React, {Fragment} from "react";
import cssClasses from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => {
    return (
        <Fragment>

            <Toolbar/>

            <main className={cssClasses.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default layout;