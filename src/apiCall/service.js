/* eslint-disable  */
import axios from 'axios';

const API_URL = 'https://paymentsapp20210904020637.azurewebsites.net';
const API_PREFIX = 'api/Payments/';

const axiosInstance = axios.create({
    baseURL: `${API_URL}/${API_PREFIX}`,
});
export default axiosInstance;