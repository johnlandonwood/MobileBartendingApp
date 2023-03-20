import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { CustomButton } from './CustomButton';
import { signIn, editProfile, passwordReset, signOut } from './api/Users';
import { storeData, getData } from './AsyncStorage';
// import session from 'express-session'

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

// storeData("value1")
// const x = getData()
//   .then((response) => response)
//   .then(user => {
//     return user
//   })
  

// console.log(x)

// const address = fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then((response) => response.json())
//   .then((user) => {
//     return user.address;
//   });

//   const printAddress = async () => {
//     const a = await address;
//     console.log(a);
//   };

//   printAddress();

// storeData("key1", "value1")
// storeData("key2", "value2")
// const x = getData("key1")
//   .then((response) => response);
// const x2 = getData("key2")
//   .then((response) => response);

// const printResponse1 = async () => {
//   const a = await x;
//   console.log(a)
// }
// const printResponse2 = async () => {
//   const a = await x2;
//   console.log(a)
// }

// const name = getData('name')
//   .then((response) => response)

// const printName = async () => {
//   const x = await name;
//   console.log(x);
// }

// printResponse1();
// printResponse2();
// printName();


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
    {/* <Text>First Name: </Text>
    <Text>Last Name: </Text>
    <Text>Email: </Text>
    <Text>Username: </Text> */}

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
