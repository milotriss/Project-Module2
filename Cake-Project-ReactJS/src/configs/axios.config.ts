import axios from "axios";

const baseAxios = axios.create({
    baseURL: 'http://localhost:9000/'
})

export default baseAxios