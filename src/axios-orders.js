import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-app-4ef8b.firebaseio.com/'
});

export default instance;