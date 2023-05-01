import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export async function setItem(key, value) {
  if (!isWeb) {
    await SecureStore.setItemAsync(key, value);
  } else {
    await AsyncStorage.setItem(key, value);
  }
}

export async function getItem(key) {
  if (!isWeb) {
    return await SecureStore.getItemAsync(key);
  } else {
    return await AsyncStorage.getItem(key);
  }
}

export async function removeItem(key) {
  if (!isWeb) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await AsyncStorage.removeItem(key);
  }
}

export async function handleAuthResponse(response) {
  await setItem('authToken', response.data.token);
  await setItem('userProfile', JSON.stringify(response.data.user));
}

export async function clearAuthData() {
  await removeItem('authToken');
  await removeItem('userProfile');
}


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
      await handleAuthResponse(res);
      checkAuth(); // Add this line to update the authentication state and user profile after signing up.
    } catch (error) {
      console.log('Error on sign up:', error);
      throw error; // Add this line to throw the error, so it can
    }
};  

  const signInWithEmailAndPassword = async (email, pw) => {
    try {
      const res = await api.post('/signin', {email: email, password: pw});
      await handleAuthResponse(res);
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
    clearAuthData();
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
      await setItem('userProfile', JSON.stringify(response.data));
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
    const token = await getItem('authToken');
    const userProfile = await getItem('userProfile');

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
