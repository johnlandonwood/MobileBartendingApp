import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { CommonColors } from './Common';

export function CustomButton(props) {
  const {buttonStyle, textStyle, onPress, title = 'Submit' } = props;
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: CommonColors.primaryButtonColor,
    margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: CommonColors.lightTextColor,
  },
});
