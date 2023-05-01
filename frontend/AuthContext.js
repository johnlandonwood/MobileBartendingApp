import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { api } from './api';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('userProfile');
    setIsAuthenticated(false);
    setProfile(null);
  };

  const fetchProfile = async () => {
    console.log("fetchProfile");
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (!token) return;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/api/profile');

      await SecureStore.setItemAsync('userProfile', JSON.stringify(response.data));
      setProfile(response.data);
    } catch (error) {
      if (error.response) {
        logout();
        console.log('fetchProfile error:', error.response.data.message);
      } else {
        console.log('fetchProfile error:', error.message);
      }
    }
  };

  const checkAuth = useCallback(async () => {
    const token = await SecureStore.getItemAsync('authToken');
    const userProfile = await SecureStore.getItemAsync('userProfile');

    // Add a check for an expired token
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          console.log("token expired.");
          logout();
          return;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }       

    if (token && userProfile) {
      setIsAuthenticated(true);
      setProfile(JSON.parse(userProfile));
    } else {
      setIsAuthenticated(false);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    fetchProfile();
  }, [checkAuth]);

  const value = {
    isAuthenticated,
    profile,
    checkAuth,
    fetchProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
