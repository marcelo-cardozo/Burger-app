import React, {Fragment} from "react";
import cssClasses from './Layout.css';

const layout = (props) => {
    return (
        <Fragment>
            <div>
                Toolbar, Sidedrawer, Backdrop
            </div>
            <main className={cssClasses.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default layout;