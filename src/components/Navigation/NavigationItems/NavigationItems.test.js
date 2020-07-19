import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// connect enzyme
configure({adapter: new Adapter()})

// first parameter: description of the component test
// enzyme allows us to render only the component in an isolated environment
describe('<NavigationItems />', () => {
    let wrapper = null

    // gets executed before each test
    beforeEach(()=> {
        // shallow: render component with all its content, but the subcomponents are not fully
        // rendered (the subcomponents are placeholders) (doesnot render the content of the subcomponent)
        wrapper = shallow(<NavigationItems  />)
    }, )

    // it: allows you to write one individual test
    // first: description of the tesqt
    it('should render two nav items if not authenticated', () => {
        // const wrapper = shallow(<NavigationItems  />)

        // expectation (globally available by jest)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('render three navitems if authenticated', ()=> {
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    // each test run independent of another
    it('check if logout navitem appears if authenticated', ()=> {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})