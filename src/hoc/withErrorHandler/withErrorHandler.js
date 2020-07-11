import React, {Component, Fragment} from "react";
import Modal from "../../components/UI/Modal/Modal";


const withErrorHandler = (WrappedComponent, Axios) => {

    return class extends Component {
        state = {
            error: null
        }

        constructor(props) {
            super(props);

            this.reqInt = Axios.interceptors.request.use(res => {
                return res
            },error => {
                this.setState({
                    error: error
                })
                return Promise.reject(error)
            })

            this.resInt = Axios.interceptors.response.use(res => {
                return res
            }, error => {
                this.setState({
                    error: error
                })
                return Promise.reject(error)
            })
        }

        componentWillUnmount() {
            console.log('remove interceptors')
            Axios.interceptors.request.eject(this.reqInt)
            Axios.interceptors.response.eject(this.resInt)
        }


        modalClosedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error !== null} modalClosed={this.modalClosedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }

    }


}

export default withErrorHandler;