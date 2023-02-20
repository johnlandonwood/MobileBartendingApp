import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";

const LoginForm = () => {

  const { control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = data => console.log(data);

  return (
  <View>
    <Text>Login</Text>
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
          style={styles.input}
        />
      )}
      name="email"
    >
    </Controller> 
    {errors.email && <Text style={{color: 'red'}}>Email is required.</Text>}
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
          style={styles.input}
        />
      )}
      name="password"
    >
    </Controller>
    {errors.email && <Text style={{color: 'red'}}>Password is required.</Text>}

    <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
  </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginForm;
