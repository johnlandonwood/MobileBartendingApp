import { View, StyleSheet, Text } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { CustomButton } from './CustomButton';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import EmailRegistrationScreen from './EmailRegistrationScreen';
import * as Google from 'expo-auth-session/providers/google';

import { makeRedirectUri, ResponseType } from 'expo-auth-session';
import { handleAuthResponse } from './AuthContext';

import { api } from './api';

import {useAuth} from './AuthContext';
import { TextInput, StatusBar } from 'react-native';

import {CommonStyles } from './Common';


const Stack = createStackNavigator();

const LandingScreen = ({ navigation }) => {
  const { isAuthenticated, profile, checkAuth, logout } = useAuth();
  const googleClientId = "381439407225-fj25n8gmh9ub9dgvjhj0p5qi9igbq6jj.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: googleClientId,
      redirectUri: makeRedirectUri({
        native: 'barpal://redirect',
        useProxy: true,
      }),
    },
    { responseType: ResponseType.IdToken }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // Send the ID token to your backend for validation and further processing.
      api
        .post('/api/auth/google', { id_token })
        .then(async(res) => {
          // Handle the response from your backend, e.g., store the access token.
          console.log('Authenticated successfully');
          // Store the JWT token using expo-secure-store
          console.log("res.data:", res.data);
          handleAuthResponse(res);
          checkAuth();
        })
        .catch((error) => {
          console.error('Authentication failed:', error);
        });
    }
  }, [response]);
  
  const handleSignUp = (provider) => {
    if(provider === 'google'){
      promptAsync();
    }
  }

  const welcomeText = (isAuthenticated && profile) ? `Welcome, ${profile.email}.` : 'Welcome to BarPal.';
  
  const signOut = async () => {
    // Remove the JWT token and user profile from expo-secure-store
    logout();
    console.log("signed out");

    // Update the authentication state
    checkAuth();
  };

  return (
    <View style={styles.container}>
      <Text>{welcomeText}</Text>
      {isAuthenticated ? (
        <>
          <CustomButton title="Edit profile" onPress={() => navigation.navigate('EditProfile')}/>
          {profile?.provider == "local" && <CustomButton title="Reset password" onPress={() => navigation.navigate('EditProfile')}/>}
          <CustomButton title="Sign out" onPress={async () => {
            await signOut();
          }}/>
        </>
      ) : (
        <>
            <CustomButton title="Create Account" onPress={() => navigation.navigate('EmailRegistrationScreen')}/>
            <CustomButton title="Sign In" onPress={() => navigation.navigate('SignInEmail')}/>
            <CustomButton title="Sign In with Google" onPress={() => handleSignUp('google')}>
              <FontAwesome name="google" size={20} color="white" />
            </CustomButton>
        </>
      )}
    </View> 
  );
};

const LandingPage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="EmailRegistrationScreen" component={EmailRegistrationScreen} />
      <Stack.Screen name="SignInEmail" component={SignInEmail} />
    </Stack.Navigator>
  );
};


const SignInEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithEmailAndPassword } = useAuth();
  const [loginError, setLoginError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      navigation.goBack();
    } catch (error) {
      console.log('Sign in failed:', error);
      setLoginError(error);
    }
  };

  return (
    <View styles={styles.columnContainer}>
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
      <View styles={styles.rowContainer}>
        <TextInput
          style={CommonStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View styles={styles.rowContainer}>
        <TextInput
          style={CommonStyles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <CustomButton title="Sign In" onPress={handleSignIn} />
    </View>
  );
};



const styles = StyleSheet.create({
  columnContainer: {
      marginTop: StatusBar.currentHeight || 0,
      flex: 1,
      flexDirection: "column",
  },
  rowContainer: {
      flex: 1, 
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});


export {LandingPage};
