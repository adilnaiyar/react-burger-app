import axios from 'axios';

const Instance = axios.create({
    baseURL: 'https://react-myburger-app-9336d.firebaseio.com/'
});

export default Instance;