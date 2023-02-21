import {StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, TextInput, Button, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createStackNavigator } from '@react-navigation/stack';
import {CreateEventForm} from './CreateEventForm';
// import { EventCreationMap } from './EventCreationMap';


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
        {/* {Platform.OS != 'web' &&
        <Stack.Screen name="EventMapView" component={EventCreationMap} />
        } */}
        
    </Stack.Navigator>

}


export default Admin;
