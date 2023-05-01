import axios from 'axios';
import { json } from 'react-router-dom';
const hostname = "http://localhost:8000/api"; 
const apiEndpoint = hostname + 'orders';
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

// export async function getOrders() {
//     const response = await axios.get(hostname + '/orders');
//     return response.data;
// };

export const getOrders = () => new Promise((resolve, reject) => {
    axios.get(`http://localhost:4000/api/orders`)
    .then(x => {resolve(x.data);
        // console.log(x.data);
    })
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const placeOrder = (cart) => new Promise((resolve, reject) => {
    axios.post(`http://localhost:4000/api/orders`, {drinks: cart})
    .then(x => {resolve(x.data);
        // console.log(x.data);
    })
    .catch(x => {
        alert(x);
        reject(x);
    });
});

// export const getOrders = () => new Promise ((resolve, reject) => {
//     console.log("getOrders()")

//     axios.get(hostname + '/orders')
//         .then(function (response) {
//             // console.log(response.data)
//             // return response.data;
//             response => response.data;
//             return response;
//         })
//         .catch(function (error) {
//             console.log("Error getting orders: " + error);
//         })
// })