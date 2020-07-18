import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from "react-router";
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions";
import {connect} from "react-redux";

const App = (props) => {
    useEffect(()=>{
        props.onAuthCheckState()
    }, [])

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                </Switch>
            </Layout>
        </BrowserRouter>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actionCreators.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);
