import React, {Fragment} from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler"


const withErrorHandler = (WrappedComponent, Axios) => {

    return (props) => {
        const [error, clearError] = useHttpErrorHandler(Axios)

        return (
            <Fragment>
                <Modal show={error !== null} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }

}

export default withErrorHandler;