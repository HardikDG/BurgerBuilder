import axios from 'axios'

const instance = axios.create({
    baseURL:"https://fir-sample-3e4c5.firebaseio.com"
});

export default instance;
