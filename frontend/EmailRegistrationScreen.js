import { useState } from "react";
import {View, ScrollView, Text, TextInput} from "react-native";
import { CustomButton } from "./CustomButton";

import { CommonStyles } from "./Common";

import { StyleSheet, StatusBar } from "react-native";

import { Picker } from '@react-native-picker/picker';

import { useAuth } from "./AuthContext";



const EmailRegistrationScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('user');
    const [dob, setDob] = useState('');

    const { signUpWithEmail } = useAuth();

    const handleSignUp = async () => {
      try {
        await signUpWithEmail(email, password, firstName, lastName, role, dob);
        navigation.goBack();
      } catch (error) {
        console.log('Error signing up:', error);
      }
    };
  
    return (
        <ScrollView style={styles.columnContainer}>
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
          <Text>Role</Text>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={{ width: '100%' }}
          >
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Company Owner" value="company_owner" />
            <Picker.Item label="Bartender" value="bartender" />
            <Picker.Item label="User" value="user" />
          </Picker>
          <TextInput
            placeholder="Date of birth (YYYY-MM-DD)"
            value={dob}
            onChangeText={setDob}
            style={CommonStyles.input}
          />
          <CustomButton title="Sign up" onPress={handleSignUp}/>
        </ScrollView>
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