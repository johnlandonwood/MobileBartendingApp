// const axios = require('axios');
import axios from 'axios';
const hostname = "http://localhost:5000/";
const apiEndpoint = hostname + 'accounts';


export const registerNewUser = (user) => new Promise((resolve, reject) => {

    // const user = {
    //     "first_name": "Test2222",
    //     "last_name": "Test22222",
    //     "email": "test2@test2.com",
    //     "phone_number": 2148888888,
    //     "password": "secure password 2",
    //     "user_type": "admin"
    //     // "date_of_birth": "2022-12-01T00:00:00.000Z"
    // };

    axios.post(apiEndpoint + "/users", user)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        })
});