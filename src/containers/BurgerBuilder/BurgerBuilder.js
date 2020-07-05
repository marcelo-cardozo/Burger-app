import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            bacon: 0,
            cheese: 0,
        }
    }

    render(){
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Fragment>
        )
    }
}

export default BurgerBuilder;