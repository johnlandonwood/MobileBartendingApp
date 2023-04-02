import React, {useState} from 'react';

import { StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, Platform } from 'react-native';
    
import MapView from 'react-native-maps';
import {Marker } from 'react-native-maps';
import { CustomButton } from './CustomButton';

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
      },
});



export const EventDiscoveryMap = ({route, navigation}) => {
    const events = route.params?.events || [];


    const initialRegion = {
        latitude: 32.7767,
        longitude: -96.7970,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
     };

    const mapMarkers = events.map(
        (event) => {

            console.log(event);
            const coordinate = {
                longitude: event.location[0],
                latitude: event.location[1]
            }

            return <Marker coordinate={coordinate} pinColor={"blue"} title={event.title} />
        });
    
    console.log(mapMarkers);

    return <MapView initialRegion={initialRegion} style={styles.map}>
            <CustomButton title="Go Back" onPress={() => {navigation.pop();}}/>
            {mapMarkers}             
    </MapView>
}

