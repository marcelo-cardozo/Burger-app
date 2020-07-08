import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://burger-app-ef188.firebaseio.com/'
})

export default instance