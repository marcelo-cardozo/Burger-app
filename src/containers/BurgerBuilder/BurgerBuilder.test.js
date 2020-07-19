import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
// connect enzyme
configure({adapter: new Adapter()})

describe('<BurgerBuilder />', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    })

    it('should render buildcontrols when receiving ingredients', () => {
        // set props after the component has been instantiated
        wrapper.setProps({ingredients: { salad:0 }})

        expect(wrapper.find(BuildControls)).toHaveLength(1)
    });
})