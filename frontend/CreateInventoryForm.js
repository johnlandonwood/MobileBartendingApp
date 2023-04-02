import {StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, TextInput, Button, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useState } from 'react';
import { StackActions } from '@react-navigation/native';


import { CommonColors, CommonStyles } from './Common';
import { CustomButton } from './CustomButton';
import Checkbox from 'expo-checkbox';


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
    checkboxContainer: {
        // flex: 1, 
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        margin: 8,
        marginLeft: 12,
        marginRight: 12,
    },

    header: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDiv: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 0,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        'textAlign': 'center',
        alignItems: 'center',
    },
    eventButton: {
        backgroundColor: CommonColors.primaryButtonColor,
        width: 96,
        height: 96,
        borderRadius: 96,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    eventButtonLabel: {
       // color: '#F8F3F2', 
       color: 'black',
        fontWeight: 'bold',
        fontSize: 18, 
        textAlign: 'center',
        display: 'block',
        height: '10%',

        // paddingLeft: 20,
        paddingBottom: 20,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    checkbox: {
        margin: 5,
    },

});



export const CreateInventoryForm = ({navigation}) => {
    return <View styles={styles.columnContainer}>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Item Name'
            />
        </View>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Item Description'
            />
        </View>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Item Price'
            />
        </View>
        <CustomButton title="Upload Item Picture" onPress={() => {
                navigation.dispatch(StackActions.popToTop());
        }}></CustomButton>
                <CustomButton title="Submit" onPress={() => {
                navigation.dispatch(StackActions.popToTop());
        }}></CustomButton>
        <CustomButton title="Go Back" onPress={() => {
                navigation.dispatch(StackActions.popToTop());
        }}></CustomButton>
    </View>
}
