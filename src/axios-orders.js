import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burger-app-ef188.firebaseio.com'
})

export default instance