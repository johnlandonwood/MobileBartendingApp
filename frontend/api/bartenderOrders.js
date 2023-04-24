import axios from 'axios';
import { json } from 'react-router-dom';
const hostname = "http://localhost:8000/api"; 
const apiEndpoint = hostname + 'orders';

export async function getOrders() {
    const response = await axios.get(hostname + '/orders');
    return response.data;
}

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