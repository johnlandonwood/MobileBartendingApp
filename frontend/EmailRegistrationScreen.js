import { useState } from "react";
import {View, Text, TextInput} from "react-native";
import { CustomButton } from "./CustomButton";

import { CommonStyles } from "./Common";

import { StyleSheet, StatusBar } from "react-native";



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
    };
    return (
        <View style={styles.columnContainer}>
          <Text>Sign up with email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={CommonStyles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={CommonStyles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            style={CommonStyles.input}
          />
          <TextInput
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
            style={CommonStyles.input}
          />
          <CustomButton title="Sign up" onPress={handleSignUp}/>
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
  });

  export default EmailRegistrationScreen;