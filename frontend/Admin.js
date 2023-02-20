import {StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, TextInput, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useState } from 'react';


import { createStackNavigator } from '@react-navigation/stack';

import { StackActions } from '@react-navigation/native';


import MapView from 'react-native-maps';

import { Circle, Marker } from 'react-native-maps';

import {Slider} from '@miblanchard/react-native-slider';

import { CommonStyles } from './Common';
import { CustomButton } from './CustomButton';

const Stack = createStackNavigator();
      
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


const CreateEventButton = ({navigation}) => {
    return <View style={styles.buttonDiv}>
        <TouchableOpacity onPress={() => 
            navigation.navigate('CreateEventForm', {})
        }
            style={[styles.eventButton, styles.shadowProp]}
            >
                <FontAwesomeIcon icon="fa-solid fa-calendar-days" size={48} style={{color: '#F8F3F2'}} /> 
        </TouchableOpacity>
        <Text style={styles.eventButtonLabel}>
                        Create Event
                </Text>
    </View>
}


const ManageEventsButton = ({navigation}) => {
    return <View style={styles.buttonDiv}>
        <TouchableOpacity onPress={() => 
            navigation.navigate('CreateEventForm', {})
        }
            style={[styles.eventButton, styles.shadowProp]}
            >
                <FontAwesomeIcon icon="fa-solid fa-calendar-days" size={48} style={{color: '#F8F3F2'}} /> 
        </TouchableOpacity>
        <Text style={styles.eventButtonLabel}>
                        Manage Events
                </Text>
    </View>
}


const AdminMenu = ({navigation}) => {
    return <SafeAreaView style={styles.container}>
        <CreateEventButton navigation={navigation}></CreateEventButton>
        <ManageEventsButton>

        </ManageEventsButton>
    </SafeAreaView>
}

const CreateEventForm = ({navigation}) => {
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
        <CustomButton title="Select Event Location" onPress={() => {
            navigation.push("EventMapView");
        }}></CustomButton>
        <CustomButton title="Go Back" onPress={() => {
                navigation.dispatch(StackActions.popToTop());
        }}></CustomButton>
    </View>
}


const EventMapView = ({navigation}) => {
    const initialRegion = {
        latitude: 32.7767,
        longitude: -96.7970,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
     };

     const maxRadius = 50.0;
     const initialSliderValue = 0.5;

     const [region, setRegion] = useState({initialRegion});
     const [sliderValue, setSliderValue] = useState(initialSliderValue);
     const [radius, setRadius] = useState(initialSliderValue * maxRadius);


    const [markerLocation, setMarkerLocation] = useState({
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude
    });

    return <View style={StyleSheet.absoluteFillObject}>
        <MapView
            initialRegion={initialRegion}
            style={styles.map}
            //onRegionChangeComplete runs when the user stops dragging MapView
            onRegionChangeComplete={(region) => setRegion(region)}

        >
            <Marker
                draggable
                coordinate={{latitude: initialRegion.latitude, 
                    longitude: initialRegion.longitude}}
                onDragEnd={(e) => {
                    setMarkerLocation(e.nativeEvent.coordinate);
                }}
            />
            <Circle
                center={markerLocation}
                radius={radius}
                fillColor={"rgba(255, 0.0, 0.0, 0.5)"}
            />
            </MapView>
        <View>
            <CustomButton title="Go Back" onPress={()=> {
                navigation.pop();
            }}/>
        </View>

        <Slider value={sliderValue} onValueChange={value => {
            setSliderValue(value);
            setRadius(value * maxRadius);
        }}/>
    </View>

}

const Admin = ({navigation, route}) => {
    return <Stack.Navigator
          initialRouteName="AdminMenu"
          screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: '#EADEDA',
              }
          }}
          >
        <Stack.Screen name="AdminMenu" component={AdminMenu} />
        <Stack.Screen name="CreateEventForm" component={CreateEventForm} />
        <Stack.Screen name="EventMapView" component={EventMapView} />
    </Stack.Navigator>

}


export default Admin;
