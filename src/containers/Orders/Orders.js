import React, {Component} from "react";
import Order from "../../components/Order/Order";
import Axios from "../../axios-orders";

class Orders extends Component {
    state = {
        orders: []
    }

    loadData = () => {
        Axios.get('/orders.json')
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        )
    }
}

export default Orders;