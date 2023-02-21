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



export const EventDiscoveryMap = ({navigation}) => {
    const initialRegion = {
      latitude: 32.7767,
      longitude: -96.7970,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
   };

   const marker1 = {
    latitude: 32.7767,
    longitude: -96.7970,
   };

   const marker2 = {
    latitude: 32.7777,
    longitude: -96.7990,
   };

    return <MapView initialRegion={initialRegion} style={styles.map}>
                <CustomButton title="Go Back" onPress={() => {navigation.pop();}}/>

                <Marker coordinate={marker1} pinColor={"blue"} title={"Event 1"} description={"Event 1 Description"}/>

                <Marker coordinate={marker2} pinColor={"blue"} title={"Event 2"} description={"Event 2 Description"}/>
    </MapView>
}

