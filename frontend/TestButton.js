import React from 'react';
import { Button, StyleSheet } from 'react-native';

const api_get = () => {
    return fetch('https://reactnative.dev/movies.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json.movies)
    })
    .catch((error) => {
      console.error(error);
    });
}

const TestButton = () => {
    return (
        <Button 
            title="Test API Call" 
            onPress={api_get}
        >
        </Button>
    );
}

export default TestButton;