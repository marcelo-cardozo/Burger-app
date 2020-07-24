import React, {Fragment, useCallback, useEffect, useState} from "react";
import Modal from "../../components/UI/Modal/Modal";


const withErrorHandler = (WrappedComponent, Axios) => {

    return (props) => {
        const [error, setError] = useState(null)

        const reqInt = Axios.interceptors.request.use(res => {
            return res
        }, err => {
            setError(err)
            return Promise.reject(err)
        })

        const resInt = Axios.interceptors.response.use(res => {
            return res
        }, err => {
            setError(err)
            return Promise.reject(err)
        })

        useEffect(() => {
            return () => {
                console.log('remove interceptors')
                Axios.interceptors.request.eject(reqInt)
                Axios.interceptors.response.eject(resInt)
            }
        }, [reqInt, resInt])

        const modalClosedHandler = useCallback(() => {
            setError(null)
        }, [])

        return (
            <Fragment>
                <Modal show={error !== null} modalClosed={modalClosedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }

}

export default withErrorHandler;