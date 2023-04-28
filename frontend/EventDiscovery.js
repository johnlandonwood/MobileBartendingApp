import React, {useState, useEffect} from 'react';

import { StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, Platform , ActivityIndicator} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import EventInfo from './EventInfo';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import { CustomButton } from './CustomButton';

import { EventDiscoveryMap } from './EventDiscoveryMap';

import { CommonColors, CommonStyles } from './Common';
import { TextInput } from 'react-native';

import { StackActions } from '@react-navigation/core';

import * as Location from 'expo-location';

import { getDistance } from 'geolib';

import { ENDPOINT } from './api/Util';


const Stack = createStackNavigator();
  
const formatDateOnly = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleString('en-US', options);
};

const formatTimeOnly = (dateString) => {
  const date = new Date(dateString);
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC', // Change this to the desired time zone, e.g., 'America/New_York'
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
};
  
const Item = ({item, userLocation, onPress, backgroundColor, textColor, isAdmin}) => {
  const [favorited, setFavorited] = useState(false);

  // Calculate the distance between user's location and event's location
  const distance = userLocation && item.location
    ? getDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: item.location[1], longitude: item.location[0] },
        1
      ) / 1000
    : null;

  // Format the distance value
  const formattedDistance = distance !== null ? `${distance.toFixed(2)} m\n` : 'Unknown distance\n';

    return <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <View style={[styles.iconView]}>
        <Pressable onPress={() => setFavorited(!favorited)}>
          <FontAwesomeIcon icon="fa-regular fa-star" style={favorited ? styles.fav : {}} size={32}></FontAwesomeIcon>
        </Pressable>

        <Text style={[styles.date, {color: textColor}]}>
            {formatDateOnly(item.start_time)}
            {"\n"}
            <Text style={[styles.eventTime, {color: textColor}]}>{formatTimeOnly(item.start_time)}</Text>
            {"\n"}
            {formattedDistance}
        </Text>
    </View>
    <Text style={[styles.itemTitle, {color: textColor}]}>{item.name}</Text>
    {isAdmin && <View style={{flexDirection: "row", flex: 1, flexWrap: "wrap", justifyContent: "space-between"}}>
    <CustomButton title="Modify" textStyle={{fontSize: 13, lineHeight: 13}} buttonStyle={{paddingHorizontal: 18}}/>
    <CustomButton title="Delete" textStyle={{fontSize: 13, lineHeight: 13}} buttonStyle={{paddingHorizontal: 18}}/>
    <CustomButton title="Archive" textStyle={{fontSize: 13, lineHeight: 13}} buttonStyle={{paddingHorizontal: 18}}/>
      </View>}
  </TouchableOpacity>
};


const EventDiscovery = ({ route, navigation }) => {
    console.log("Rendering eventsViewer...");
    const [selectedId, setSelectedId] = useState();

    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [location, setLocation] = useState(null);

    const isAdmin = route.params?.isAdmin;

    const fetchEvents = async () => {
      setLoading(true);
      try {
          const locationQuery = location ? `&latitude=${location.latitude}&longitude=${location.longitude}` : '';
          const requestUrl = `${ENDPOINT}/api/events?page=${page}&limit=10${locationQuery}`;
          console.log(requestUrl);
          const response = await fetch(requestUrl);
          if (!response.ok) {
            console.error(
              `Error fetching events: status ${response.status}, text:`,
              await response.text()
            );
            setLoading(false);
            return;
          }

          const data = await response.json();
          if (data.length === 0) {
              setAllLoaded(true);
          } else {
              setEvents(prevEvents => [...prevEvents, ...data]);
          }
      } catch (error) {
          console.error('Error fetching events:', error);
      }
      setLoading(false);
    };


    // Request user's location
    useEffect(() => {
      let locationSubscription;

        const requestLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Location permission not granted');
                    return;
                }
                const userLocation = await Location.getCurrentPositionAsync({});
                setLocation(userLocation.coords);


                // Subscribe to location updates
                // locationSubscription = await Location.watchPositionAsync(
                //   {
                //     accuracy: Location.Accuracy.High,
                //     distanceInterval: 100, // Update location every 100 meters
                //   },
                //   (newLocation) => {
                //     setLocation(newLocation.coords);
                //     fetchEvents(); // Fetch events with the updated location
                //   }
                // );

            } catch (error) {
                console.error('Error getting location:', error);
            }
        };
        requestLocation();
        // Cleanup function to remove location listener
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
    }, []);

    // Fetch events from API
    useEffect(() => {
        if (!allLoaded && location) {
            fetchEvents();
        }
    }, [page, location]);

    const renderItem = ({item}) => {
      const backgroundColor = item.id === selectedId ? '#BAA7A7' : '#998888';
      const color = item.id === selectedId ? 'black' : 'black';
  
      return (
        <Item
          item={item}
          userLocation={location}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={backgroundColor}
          textColor={color}
          isAdmin={isAdmin}
        />
      );
    };

    const EventList = ({navigation}) => {
      return <SafeAreaView style={styles.container}>
        {isAdmin && <CustomButton title="Go Back" onPress= {() => navigation.dispatch(StackActions.popToTop())}/>}
        <TextInput
            style={CommonStyles.input}
            placeholderTextColor="grey"
            placeholder='Search for Events'
            />
        <View style={{flexDirection: "row", margin: 10, marginLeft: 30, marginRight: 30,justifyContent: "space-between"}}>
          <FontAwesomeIcon icon="fa-solid fa-sort" size={32}/>
          {!isAdmin && 
          <TouchableOpacity onPress={()=> {navigation.push("EventMap", {events: events})}}>
            <FontAwesomeIcon icon="fa-regular fa-map" size={32}/>
          </TouchableOpacity>
          }

          <FontAwesomeIcon icon="fa-solid fa-filter" size={32}/>
        </View>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          extraData={selectedId}
          onEndReached={() => {
            if (!loading && !allLoaded) {
              setPage(prevPage => prevPage + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
    </SafeAreaView>
    }
  
    return (
      <SafeAreaView style={styles.container}>
        
          <Stack.Navigator
          initialRouteName="EventList"
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: CommonColors.primaryBackgroundColor,
            }
          }}
          >
            <Stack.Screen name="EventList" component={EventList} />
            <Stack.Screen name="EventInfo" component={EventInfo} />
            <Stack.Screen name="EventMap" component={EventDiscoveryMap} />
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



  