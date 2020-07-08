import React, {Component, Fragment, useEffect, useState} from "react";
import Modal from "../../components/UI/Modal/Modal";


const withErrorHandler = (WrappedComponent, Axios) => {

    return (props) => {
        const [state, setState] = useState({
            error: null
        })

        useEffect(() => {
            console.log('add interceptors')
            const reqInt = Axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req
            })

            const resInt = Axios.interceptors.response.use(res => res, error => {
                console.log(error, "marcelo")
                this.setState({
                    error
                })
                return Promise.reject(error)
            })

            return () => {
                console.log('remove interceptors')
                Axios.interceptors.request.eject(reqInt)
                Axios.interceptors.response.eject(resInt)
            }
        }, [])


        const modalClosedHandler = () => {
            this.setState({
                error: null
            })
        }

        return (
            <Fragment>
                <Modal show={state.error} modalClosed={modalClosedHandler}>
                    {state.error ? state.error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }


}

export default withErrorHandler;