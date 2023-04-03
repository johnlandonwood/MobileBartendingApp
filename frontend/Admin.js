import {StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable, TextInput, Button, Platform, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createStackNavigator } from '@react-navigation/stack';
import {CreateEventForm} from './CreateEventForm';
import { CreateInventoryForm } from './CreateInventoryForm';
import { EventCreationMap } from './EventCreationMap';
import { CommonColors } from './Common';
import { ManageInventory } from './ManageInventory';
import EventDiscovery from './EventDiscovery';


const Stack = createStackNavigator();
      
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      border: 'none',
      flexDirection: "row",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
    },

    header: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDiv: {
        flex: 1,
        justifyContent: 'center',
        // display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 10,
        // marginLeft: 50,
        // marginRight: 50,
    },
    eventButton: {
        backgroundColor: CommonColors.primaryButtonColor,
        width: 96,
        height: 96,
        borderRadius: 96,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    eventButtonLabel: { 
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18, 
        textAlign: 'center',
        //display: 'block',
        padding: 0,
        margin: 0,
        marginHorizontal: 0,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },

});


const CreateAdminButton = ({navigation, icon, nextScreen, title}) => {
    return <View style={styles.buttonDiv}>
        <TouchableOpacity onPress={() => navigation.navigate(nextScreen, {isAdmin: true})}
            style={[styles.eventButton, styles.shadowProp]}>
                <FontAwesomeIcon icon={icon} size={48} style={{color: CommonColors.lightTextColor}} /> 
        </TouchableOpacity>
        <Text style={styles.eventButtonLabel}>{title}</Text>
    </View>
}


const CreateEventButton = ({navigation}) => {
    return CreateAdminButton({navigation, icon: "fa-solid fa-calendar-days", nextScreen: "CreateEventForm", title: "Create Event"})
}

const ManageEventsButton = ({navigation}) => {
    return CreateAdminButton({navigation, icon: "fa-solid fa-calendar-days", nextScreen: "ManageEvents", title: "Manage Events"})
}


const CreateInventoryButton = ({navigation}) => {
    return CreateAdminButton({navigation, icon: "fa-solid fa-wine-bottle", nextScreen: "CreateInventoryForm", title: "Create Inventory"})
}


const ManageInventoryButton = ({navigation}) => {
    return CreateAdminButton({navigation, icon: "fa-solid fa-wine-bottle", nextScreen: "ManageInventory", title: "Manage Inventory"})
}


const AdminMenu = ({navigation}) => {
    return <ScrollView contentContainerStyle={styles.container}>
        <CreateEventButton navigation={navigation} />
        <ManageEventsButton navigation={navigation}/>
        <CreateInventoryButton navigation={navigation}/>
        <ManageInventoryButton navigation={navigation} />
    </ScrollView>
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
        <Stack.Screen name="ManageEvents" component={EventDiscovery}/>
        <Stack.Screen name="CreateInventoryForm" component={CreateInventoryForm} />
        <Stack.Screen name="ManageInventory" component={ManageInventory} />
        <Stack.Screen name="EventMapView" component={EventCreationMap} />
    </Stack.Navigator>

}


export default Admin;
