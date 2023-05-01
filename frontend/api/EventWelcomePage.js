import axios from 'axios';
const hostname = "http://localhost:5000/";
// const apiEndpoint = hostname + 'accounts';

export const getEvent = (params) => new Promise((resolve, reject) => {
    axios.get('/events')
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});