import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';

const RegistrationForm = () => {

  const { control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
        first_name: "",
        last_name: "",
        email: '',
        password: '',
        phone_number: '',
        user_type: '', 
        date_of_birth: '' // js date type?
    }
  });
  const onSubmit = data => console.log(data);


  return (
  <View>
    <Text>Create an Account</Text>
    <Controller
      control={control}
      rules = {{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          onChangeText={onChange}
          value={value} 
          placeholder={"First Name"}
          placeholderTextColor={"gray"}
          style={styles.input}
        />
      )}
      name="first_name"
    >
    </Controller> 
    {errors.first_name && <Text style={{color: 'red'}}>First name is required.</Text>}

    <Controller
      control={control}
      rules = {{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput
          onChangeText={onChange}
          value={value} 
          placeholder={"Last Name"}
          placeholderTextColor={"gray"}
          style={styles.input}
        />
      )}
      name="last_name"
    >
    </Controller> 
    {errors.last_name && <Text style={{color: 'red'}}>Last name is required.</Text>}

    <Controller
      control={control}
      rules = {{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput // Validation for email 
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

    <Controller
      control={control}
      rules = {{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput // Validation for password strength
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
    {errors.password && <Text style={{color: 'red'}}>Password is required.</Text>}

    <Controller
      control={control}
      rules = {{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <TextInput // Validation for phone number and additional frontend pretty display code
          onChangeText={onChange}
          value={value} 
          placeholder={"Phone Number"}
          placeholderTextColor={"gray"}
          style={styles.input}
        />
      )}
      name="phone_number"
    >
    </Controller> 
    {errors.phone_number && <Text style={{color: 'red'}}>Phone number is required.</Text>}

    <Text>User Type</Text>
    <Controller
      control={control}
      rules = {{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.input}
        >
            <Picker.Item label="Guest" value="Guest"/>
            <Picker.Item label="Bartender" value="Bartender"/>
            <Picker.Item label="Admin" value="Admin"/>
        </Picker>
      )}
      name="user_type"
    >
    </Controller> 
    {errors.user_type && <Text style={{color: 'red'}}>User type is required.</Text>}


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

export default RegistrationForm;
