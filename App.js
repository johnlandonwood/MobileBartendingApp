import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, useWindowDimensions } from 'react-native';
import LoginForm from './frontend/LoginForm';
import EventDiscovery from './frontend/EventDiscovery';
import Admin from './frontend/Admin';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";


import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays'
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faWineGlassEmpty } from '@fortawesome/free-solid-svg-icons/faWineGlassEmpty'
import { faWineGlass} from '@fortawesome/free-solid-svg-icons/faWineGlass'
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter'

import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons/faCircleExclamation'

import { faStar as farStar } from '@fortawesome/free-regular-svg-icons/faStar'
import { faMap as farMap } from '@fortawesome/free-regular-svg-icons/faMap'



library.add(faStar, farStar, faCalendarDays, faCircle, faCheck, faCircleExclamation,
  faWineGlass, faWineGlassEmpty, farMap, faSort, faFilter);

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BartenderOrders from './frontend/BartenderOrders';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator useLegacyImplementation={false}
      screenOptions={{
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerStyle: {
          backgroundColor: '#722F37',
          color: '#F8F3F2',
        },
        headerStyle: {
          backgroundColor: '#722F37',//'#BFB8AD',
          // color: '#F8F3F2',
        },
        drawerLabelStyle: {
          color: '#F8F3F2'
        },
        drawerActiveBackgroundColor: '#998888',
        sceneContainerStyle: {
          backgroundColor: '#EADEDA'
        }
      }}
    >
      <Drawer.Screen name="Login" component={LoginForm} />
      <Drawer.Screen name="Events" component={EventDiscovery} />
      <Drawer.Screen name="Orders" component={BartenderOrders} />
      <Drawer.Screen name="Admin" component={Admin} />
    </Drawer.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
