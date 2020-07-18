import React, {Suspense, useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions";
import {connect} from "react-redux";
import Spinner from "./components/UI/Spinner/Spinner";

const LazyCheckout = React.lazy(() => {
    return import("./containers/Checkout/Checkout")
})
const LazyOrders = React.lazy(() => {
    return import("./containers/Orders/Orders")
})
const LazyAuth = React.lazy(() => {
    return import("./containers/Auth/Auth")
})
const App = ({isAuthenticated, onAuthCheckState}) => {
    useEffect(() => {
        onAuthCheckState()
    }, [onAuthCheckState])

    let routes = (
        <Switch>
            <Route path="/auth" component={() => (
                <Suspense fallback={<Spinner />}>
                    <LazyAuth />
                </Suspense>
            )}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    )

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" component={() => (
                    <Suspense fallback={<Spinner />}>
                        <LazyCheckout />
                    </Suspense>
                )}/>
                <Route path="/orders" component={() => (
                    <Suspense fallback={<Spinner />}>
                        <LazyOrders />
                    </Suspense>
                )}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={() => (
                    <Suspense fallback={<Spinner />}>
                        <LazyAuth />
                    </Suspense>
                )}/>
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
