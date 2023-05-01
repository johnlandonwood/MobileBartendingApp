import axios from 'axios';
import { getItem } from './AuthContext';
import { useEffect } from 'react';


const API_BASE_URL = 'http://localhost:8080'; 
const api = axios.create({
  baseURL: `${API_BASE_URL}`,
});

// Add request interceptor to log headers
api.interceptors.request.use(async (request) => {
  // Add JWT token to the request headers
  const token = await getItem('authToken');
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  //console.log('Request headers:', request.headers);

  return request;
}, (error) => {
  return Promise.reject(error);
});


export { api, API_BASE_URL};
