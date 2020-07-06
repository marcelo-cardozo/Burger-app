import React from "react";
import burgerLogo from '../../assets/burger-logo.png';
import cssClasses from './Logo.css';

const logo = (props) => {

    return (
        <div className={cssClasses.Logo}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    );
}

export default logo;