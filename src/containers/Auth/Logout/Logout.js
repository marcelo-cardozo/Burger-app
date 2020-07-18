import React, {Component} from "react";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";
import {Redirect} from "react-router";

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispathToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.logout())
    }
}

export default connect(null, mapDispathToProps)(Logout)