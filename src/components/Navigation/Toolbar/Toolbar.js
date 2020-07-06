import React from "react";
import cssClasses from './Toolbar.css';

const toolbar = (props) => {

    return (
        <header className={cssClasses.Toolbar}>
            <div>Menu</div>
            <div>Logo</div>
            <nav>
                ...
            </nav>
        </header>
    )
}

export default toolbar;