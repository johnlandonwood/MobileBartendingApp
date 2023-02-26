import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { CustomButton } from './CustomButton';
import { signIn, editProfile, passwordReset, signOut } from './api/Users';
import { storeData, getData } from './AsyncStorage';

// const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, value)
//   } catch (e) {
//     // saving error
//   }
// }

// const getData = async (key) => {
//   try {
//     const value = await AsyncStorage.getItem(key)
//     if(value !== null) {
//       return value;
//     }
//   } catch(e) {
//     // error reading value
//   }
// }
// storeData('chung', 'bung')
// getData('chung')
// let test = getData("chung")
// console.log(test)
// const gd = async()


const LandingPage = ({ navigation, signedIn }) => {
  return (
  <View style={styles.container}>
    {/* if not signed in: */}
    <Text>Welcome to BarPal.</Text>
    <CustomButton title="Sign in / Create Account" onPress={signIn}/>
    {/* if *signed in:> */}
    <CustomButton title="Edit profile" onPress={editProfile}/>
    <CustomButton title="Reset password" onPress={passwordReset}/>
    <CustomButton title="Sign out" onPress={signOut}/>
    <Text>First Name: </Text>
    <Text>Last Name: </Text>
    <Text>Email: </Text>
    <Text>Username: </Text>

  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default LandingPage;
