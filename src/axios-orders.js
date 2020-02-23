import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://buildaburger-92ff4.firebaseio.com/'
});

export default axiosInstance;