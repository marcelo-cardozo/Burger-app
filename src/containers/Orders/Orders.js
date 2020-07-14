import React, {Component} from "react";
import Order from "../../components/Order/Order";
import Axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    loadData = () => {
        this.setState({
            loading: true
        })

        Axios.get('/orders.json')
            .then(response => {
                const data = Object.keys(response.data).map(((value, index, array) => {
                    return {
                        id: value,
                        ...response.data[value]
                    }
                }))
                this.setState({
                    orders: data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    loading: false
                })
            })
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <div>
                {this.state.orders.map(((order, index, array) => {
                    return <Order
                        ingredients={order.ingredients}
                        price={order.price}
                        key={order.id}/>
                }))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, Axios);