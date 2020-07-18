import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch} from "react-router";
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions";
import {connect} from "react-redux";

const App = ({isAuthenticated, onAuthCheckState}) => {
    useEffect(() => {
        onAuthCheckState()
    }, [onAuthCheckState])

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    )

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <BrowserRouter>
            <Layout>
                {routes}
            </Layout>
        </BrowserRouter>

    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actionCreators.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
