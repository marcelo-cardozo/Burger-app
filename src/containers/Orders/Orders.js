import React, {useEffect} from "react";
import Order from "../../components/Order/Order";
import Axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
    const {onFetchOrders} = props

    useEffect(() => {
        onFetchOrders()
    }, [onFetchOrders])

    let orders = <Spinner/>

    if (!props.loading) {
        orders = props.orders.map(((order, index, array) => {
            return <Order
                ingredients={order.ingredients}
                price={order.price}
                key={order.id}/>
        }))
    }

    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));