import axios from 'axios';

const AxiosInstance = axios.create();
AxiosInstance.defaults.timeout = 1000 * 120;

export default AxiosInstance;
