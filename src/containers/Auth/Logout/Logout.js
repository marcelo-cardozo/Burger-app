import React, {useEffect} from "react";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";
import {Redirect} from "react-router";

const Logout = ({onLogout}) => {
    useEffect(()=>{
        onLogout()
    }, [onLogout])

    return <Redirect to="/" />
}

const mapDispathToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.logout())
    }
}

export default connect(null, mapDispathToProps)(Logout)