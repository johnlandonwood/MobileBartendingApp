import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm from './frontend/LoginForm';
import TestButton from './frontend/TestButton';

export default function App() {
  return (
      <View style={styles.container}>
        <LoginForm></LoginForm>
        <Text> Test API call: </Text>
        <TestButton></TestButton>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
