import {StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, 
    TextInput, Button, Platform, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';


import { useState } from 'react';
import { StackActions } from '@react-navigation/native';



import { CommonColors, CommonStyles, Alert } from './Common';
import { CustomButton } from './CustomButton';
import Checkbox from 'expo-checkbox';
import { api } from './api';
import DateTimePicker from '@react-native-community/datetimepicker';


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



export const CreateEventForm = ({navigation}) => {
    const [eventName, setEventName] = useState('');
    const [host, setHost] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [isPublic, setPublic] = useState(false);
    const [eventLocation, setEventLocation] = useState(null);
    const [eventRadius, setEventRadius] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [eventNameError, setEventNameError] = useState(false);
    const [hostNameError, setHostNameError] = useState(false);
    const [eventDescriptionError, setEventDescriptionError] = useState(false);

    const route = useRoute();

    useEffect(() => {
        if (route.params && route.params.markerLocation && route.params.radius) {
            const { markerLocation, radius } = route.params;
            setEventLocation(markerLocation);
            setEventRadius(radius);
        }
    }, [route.params]);

    const handleSubmit = async () => {
        console.log("handleSubmit");
        let hasError = false;

        if (eventName.trim() === '') {
            setEventNameError(true);
            hasError = true;
        } else {
            setEventNameError(false);
        }

        if (host.trim() === '') {
            setHostNameError(true);
            hasError = true;
        } else {
            setHostNameError(false);
        }

        if (eventDescription.trim() === '') {
            setEventDescriptionError(true);
            hasError = true;
        } else {
            setEventDescriptionError(false);
        }

        if(!eventDescription){
            hasError = true;
        }

        if (!hasError) {
            setIsLoading(true);

            try {
                const response = await api.post('/api/events', {
                    name: eventName,
                    // description: eventDescription,
                    host: host,
                    public_event: isPublic,
                    location: [eventLocation.longitude, eventLocation.latitude],
                    radius: eventRadius,
                    start_time: startDate.toISOString(),
                    end_time: endDate.toISOString()
                });

                console.log("got response:");
    
                if (response.status === 200 || response.status === 201) {
                    navigation.pop();
                } else {
                    // Handle unsuccessful form submission

                }
            } catch (error) {
                // Handle network errors
                if(error.response){
                    console.log(error.response.data);
                }
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return <View styles={styles.columnContainer}>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Event Name'
            onChangeText={(text) => setEventName(text)}
            />
            {eventNameError && <Alert text="Event Name is required."/>}
        </View>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Host Name'
            onChangeText={(text) => setHost(text)}
            />
            {hostNameError && <Alert text="Host Name is required."/>}
        </View>
        <View styles={styles.rowContainer}>
            <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Event Description'
            onChangeText={(text) => setEventDescription(text)}
            />
            {eventDescriptionError && <Alert text="Event Description is required."/>}
        </View>
        <View style={styles.checkboxContainer}>
            <Text>Public Event</Text>
            <Checkbox
            value={isPublic}
            onValueChange={setPublic}
            style={styles.checkbox}
            color={""}
            />

        </View>

        <View styles={styles.rowContainer}>
            <Text>Start Date:</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode="datetime"
                is24Hour={true}
            />
        </View>
        


        <View styles={styles.rowContainer}>
            <Text>End Date:</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode="datetime"
                is24Hour={true}
            />
        </View>

        {Platform.OS != 'web' && <>
            <CustomButton title="Select Event Location" onPress={() => {navigation.push("EventMapView");}}/>
        </>
        }

        {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <>
                <CustomButton title="Go Back" onPress={() => {navigation.dispatch(StackActions.popToTop());}}/>
                <CustomButton title="Submit" onPress={handleSubmit} />
            </>

        )}

    </View>
}
