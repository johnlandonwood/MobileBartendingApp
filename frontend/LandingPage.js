import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CustomButton } from './CustomButton';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const LandingScreen = ({ navigation, signedIn }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to BarPal.</Text>
      {signedIn ? (
        <>
          <CustomButton title="Edit profile" onPress={() => navigation.navigate('EditProfile')}/>
          <CustomButton title="Reset password" onPress={() => navigation.navigate('EditProfile')}/>
          <CustomButton title="Sign out" onPress={() => navigation.navigate('EditProfile')}/>
        </>
      ) : (
        <>
            <CustomButton title="Create Account" onPress={() => navigation.navigate('SignUp')}/>
            <CustomButton title="Sign In" onPress={() => navigation.navigate('SignIn')}/>
        </>
      )}
    </View> 
  );
};


const EmailRegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async () => {
    const user = await signUpWithEmail(email, password, firstName, lastName);
    if (user) {
      navigation.goBack();
    }
    return (
      <View style={styles.container}>
        <Text>Sign up with email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <CustomButton title="Sign up" onPress={handleSignUp}/>
      </View>
    );
  };
}


const SignUpScreen = ({ navigation }) => {
  const handleSignUp = async (provider) => {
    const user = await signUpWithProvider(provider);

    if (user) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign up for BarPal</Text>
      <View style={styles.signupButtonsContainer}>
        <CustomButton title="Sign up with Google" onPress={() => handleSignUp('google')}>
          <FontAwesome name="google" size={20} color="white" />
        </CustomButton>
        <CustomButton title="Sign up with Apple" onPress={() => handleSignUp('apple')}>
          <FontAwesome name="apple" size={20} color="white" />
        </CustomButton>
        <CustomButton title="Sign up with Microsoft" onPress={() => handleSignUp('microsoft')}>
          <FontAwesome name="windows" size={20} color="white" />
        </CustomButton>
        <CustomButton title="Sign up with Email" onPress={() => handleSignUp('email')}>
        </CustomButton>
      </View>
    </View>
  );
};



const LandingPage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="EmailRegistrationScreen" component={EmailRegistrationScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});


export default LandingPage;
