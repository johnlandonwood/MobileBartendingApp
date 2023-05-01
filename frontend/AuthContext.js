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

  const signUpWithEmail = async (email, password, firstName, lastName, role, dob) => {
    try {
      const res = await api.post('/register', {
        email,
        password,
        firstName,
        lastName,
        role,
        dob,
        provider: 'local',
      });
      await SecureStore.setItemAsync('authToken', res.data.token);
      await SecureStore.setItemAsync('userProfile', JSON.stringify(res.data.user));
      checkAuth(); // Add this line to update the authentication state and user profile after signing up.
    } catch (error) {
      console.log('Error on sign up:', error);
      throw error; // Add this line to throw the error, so it can
    }
};  

  const signInWithEmailAndPassword = async (email, pw) => {
    try {
      const res = await api.post('/signin', {email: email, password: pw});
      await SecureStore.setItemAsync('authToken', res.data.token);
      await SecureStore.setItemAsync('userProfile', JSON.stringify(res.data.user));
      checkAuth();
    } catch (error) {
      if(error.response){
        throw error.response.data.message;
      }
      else {
        console.log("Network sign-in error:", error);
        throw "Server Error";
      }
    }
  };

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
    signUpWithEmail,
    signInWithEmailAndPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
