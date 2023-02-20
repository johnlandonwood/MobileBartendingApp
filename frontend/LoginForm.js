import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { CustomButton } from './CustomButton';
import { SafeAreaView } from 'react-native';

import { CommonStyles, Alert } from './Common';

const LoginForm = () => {

  const { control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = data => console.log(data);


  return (
  <SafeAreaView style={{backgroundColor: '#EADEDA'}}>
    <Controller
      control={control}
      rules = {{
        required: true,
        // TODO: email regex
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          onChangeText={onChange}
          value={value} 
          placeholder={"Email"}
          placeholderTextColor={"gray"}
          style={CommonStyles.input}
        >
        </TextInput>
      )}
      name="email"
    >
    </Controller> 
    {errors.email && <Alert text="Email is required."></Alert>}
    {/* Error messages persist? */}

    <Controller
      control={control}
      rules = {{
        required: true,
        // TODO: password strength
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          onChangeText={onChange}
          value={value}
          placeholder={"Password"}
          placeholderTextColor={"gray"}
          secureTextEntry={true}
          style={CommonStyles.input}
        />
      )}
      name="password"
    >
    </Controller>
    {errors.email  && <Alert text="Password is required."></Alert>}

    <CustomButton title="Log In" onPress={handleSubmit(onSubmit)} style={styles.loginButton}/>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default LoginForm;
