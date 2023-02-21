import {StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, TextInput, Button, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useState } from 'react';
import { StackActions } from '@react-navigation/native';



import { CommonStyles } from './Common';
import { CustomButton } from './CustomButton';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      paddingTop: 30,
      paddingLeft: 30,
      paddingRight: 30,
      backgroundColor: '#EADEDA',
      border: 'none',
    },
    columnContainer: {
        flex: 1,
        flexDirection: "column",
    },
    rowContainer: {
        flex: 1, 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
        backgroundColor: '#722F37',
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

    },

});



export const CreateEventForm = ({navigation}) => {
    const [isPublic, setPublic] = useState(false);

    return <View styles={styles.columnContainer}>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Event Name'
            />
        </View>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Event Description'
            />
        </View>
        <View style={styles.rowContainer}>
            <Text>Public Event</Text>
            {/* <Checkbox
            value={isPublic}
            onValueChange={setPublic}
            style={styles.checkbox}
            /> */}

        </View>

        {/* {Platform.OS != 'web' &&
            <CustomButton title="Select Event Location" onPress={() => {
                navigation.push("EventMapView");
            }}></CustomButton>
        } */}

        <CustomButton title="Go Back" onPress={() => {
                navigation.dispatch(StackActions.popToTop());
        }}></CustomButton>
    </View>
}
