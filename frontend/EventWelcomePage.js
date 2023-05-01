import React from 'react';
import { getEvent } from './api/EventWelcomePage';
import {View, Text, TextInput, Button, StyleSheet, Image, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const EventWelcomePage = ({navigation}) => {

    return <>
        <View style={{height: '100%', width: '100%'}}>
            <ImageBackground 
            style={styles.eventImage}
            source={{
                uri: 'https://www.christmasconnections.co.uk/wp-content/uploads/sites/2/2016/08/christmas-party-venue-earthhalls3.jpg',
            }}>
                <Text style={styles.titleText}>
                WELCOME TO "EVENT TITLE"
                </Text>
            </ImageBackground>
            <Text style={styles.detailsText}>
                    Hosted by HOST
                    {'\n'}
                    Location
                    {'\n'}
                    Served by BARTENDING COMPANY
                    {'\n'}
                    Date
                    {'\n'}
                    Start time
                    End time
            </Text>
            {/* <Button>
                title="Order"
                onPress={() => 
                    navigation.navigate('OrderField')
                }
            </Button> */}
        </View>
    </>;

};

const styles = StyleSheet.create({
    titleText: {
        fontSize:30,
        fontWeight:'bold',
        textAlign: 'center'
    },
    detailsText: {
        
        fontSize: 20,
        fontWeight: 'normal'
    },
    eventImage: {
        height: '40%',
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px'
    }
});

export default EventWelcomePage;
