import React, {useState} from 'react';

import { StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import EventInfo from './EventInfo';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import { CustomButton } from './CustomButton';

// import MapView from 'react-native-maps';

// import {Marker } from 'react-native-maps';

const Stack = createStackNavigator();

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Event 1',
      date: 'Oct 13',
      eventTime: '7PM-10PM',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Event 2',
      date: 'Oct 13',
      eventTime: '7PM-10PM',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Event 3',
      date: 'Oct 13',
      eventTime: '7PM-10PM',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Event 4',
      date: 'Feb 6th',
      eventTime: '7PM-10PM',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Event 5',
      date: 'Feb 7th',
      eventTime: '7PM-10PM',
    },
  ];
  
const Item = ({item, onPress, backgroundColor, textColor}) => {
  const [favorited, setFavorited] = useState(false);

    return <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <View style={[styles.iconView]}>
        <Pressable onPress={() => setFavorited(!favorited)}>
          <FontAwesomeIcon icon="fa-regular fa-star" style={favorited ? styles.fav : {}} size={32}></FontAwesomeIcon>
        </Pressable>

        <Text style={[styles.date, {color: textColor}]}>
            {item.date}
            {"\n"}
            <Text style={[styles.eventTime, {color: textColor}]}>{item.eventTime}</Text>
        </Text>
    </View>
    <Text style={[styles.itemTitle, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
};


const EventDiscovery = ({ route, navigation }) => {
    console.log("Rendering eventsViewer...");
    const [selectedId, setSelectedId] = useState();

    const renderItem = ({item}) => {
      const backgroundColor = item.id === selectedId ? '#BAA7A7' : '#998888';
      const color = item.id === selectedId ? 'black' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={backgroundColor}
          textColor={color}
        />
      );
    };

    const EventList = ({navigation}) => {
      return <SafeAreaView style={styles.container}>
        <View style={{flexDirection: "row", margin: 10, marginLeft: 30, marginRight: 30,justifyContent: "space-between"}}>
          <FontAwesomeIcon icon="fa-solid fa-sort" size={32}/>
          <TouchableOpacity onPress={()=> {navigation.push("EventMap")}}>
            <FontAwesomeIcon icon="fa-regular fa-map" size={32}/>
          </TouchableOpacity>
          <FontAwesomeIcon icon="fa-solid fa-filter" size={32}/>
        </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
    }

    const EventMap = ({navigation}) => {
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

     return <View></View>

//       return <MapView initialRegion={initialRegion} style={styles.map}>
//                     <CustomButton title="Go Back" onPress={() => {
//                 navigation.pop();
//         }}></CustomButton>

//         <Marker coordinate={marker1} pinColor={"blue"} title={"Event 1"} description={"Event 1 Description"}
//         ></Marker>

// <Marker coordinate={marker2} pinColor={"blue"} title={"Event 2"} description={"Event 2 Description"}
//         ></Marker>
//         </MapView>
    }
  
    return (
      <SafeAreaView style={styles.container}>
        
          <Stack.Navigator
          initialRouteName="EventList"
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: '#EADEDA',
            }
          }}
          >
            <Stack.Screen name="EventList" component={EventList} />
            <Stack.Screen name="EventInfo" component={EventInfo} />
            <Stack.Screen name="EventMap" component={EventMap} />
          </Stack.Navigator>
      </SafeAreaView>
    );
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      border: 'none',
    },
    item: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
    },
    itemTitle: {
      fontSize: 32,
      paddingTop: 100,
      paddingLeft: 10,
    },
    date: {
        fontSize: 18,
        textAlign: 'right',
        display: 'inline',
    },
    eventTime: {
        fontSize: 16,
        textAlign: 'right',
        paddingBottom: 40,
    },
    header: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    fav: {
      color: 'goldenrod',
    },

    iconView: {
        paddingVertical: 0,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    map: {
      ...StyleSheet.absoluteFillObject,
      zIndex: -1,
    },
  });
  


export default EventDiscovery;



  