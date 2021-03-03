import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    console.log('axiosWithAuth', token);
    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: ''
    })
}

export default axiosWithAuth;