import React, {Fragment} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from "react-router";
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                </Switch>
            </Layout>
        </BrowserRouter>

    );
}

export default App;
