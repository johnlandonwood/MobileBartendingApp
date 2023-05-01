import axios from 'axios';
// const hostname = "http://localhost:8000/";

// const http = require('http')
// const https = require('https')
// const options = { localAddress: '127.0.0.1:27017'}
// const httpAgent = new http.Agent(options);
// const httpsAgent = new https.Agent(options);

const config = {
    baseURL: 'http://localhost:4000/',
    headers: {
        'Content-Type': 'application/json'
    }
}

export const getDrinkItems = () => new Promise((resolve, reject) => {
    axios.get(`http://localhost:4000/api/drinks`)
    .then(x => {resolve(x.data);
        // console.log(x.data);
    })
    .catch(x => {
        alert(x);
        reject(x);
    });
});