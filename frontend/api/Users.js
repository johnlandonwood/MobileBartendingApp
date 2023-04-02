// const axios = require('axios');
import axios from 'axios';
const hostname = "http://localhost:3000/";
const apiEndpoint = hostname + 'accounts';

export const signIn = () => new Promise ((resolve, reject) => {

    // this works - so I guess Axios is not necessary? Vanilla JS seems too simple but I guess it works?
    // Concerned that Vanilla JS will not work on mobile
    window.location.replace(hostname + "signin")
    // axios.get(hostname + "signin")
    //     .then(x => resolve(x.data))
    //     .catch(x => {
    //         alert(x);
    //         reject(x);
    // })
})

export const editProfile = () => new Promise ((resolve, reject) => {
    window.location.replace(hostname + "profile")
})

export const passwordReset = () => new Promise ((resolve, reject) => {
    window.location.replace(hostname + "password")
})

export const signOut = () => new Promise ((resolve, reject) => {
    window.location.replace(hostname + "signout")
})


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