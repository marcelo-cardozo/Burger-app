import React, {Component, Fragment} from "react";
import Modal from "../../components/UI/Modal/Modal";


const withErrorHandler = (WrappedComponent, Axios) => {

    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            Axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req
            })

            Axios.interceptors.response.use(res => res, error => {
                console.log(error, "marcelo")
                this.setState({
                    error
                })
                return Promise.reject(error)
            })
        }
        
        modalClosedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.modalClosedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }

    }


}

export default withErrorHandler;