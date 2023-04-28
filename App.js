import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, useWindowDimensions } from 'react-native';
import LoginForm from './frontend/LoginForm';
import EventDiscovery from './frontend/EventDiscovery';
import Admin from './frontend/Admin';
import ItemList from './frontend/ItemList';
import ItemDetails from './frontend/ItemDetails';
import LandingPage from './frontend/LandingPage';
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
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';

import { faImage } from '@fortawesome/free-regular-svg-icons';

import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons/faCircleExclamation'

import { faStar as farStar } from '@fortawesome/free-regular-svg-icons/faStar'
import { faMap as farMap } from '@fortawesome/free-regular-svg-icons/faMap'



library.add(faStar, farStar, faCalendarDays, faCircle, faCheck, faCircleExclamation,
  faWineGlass, faWineGlassEmpty, farMap, faSort, faFilter, faWineBottle, faImage);

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BartenderOrders from './frontend/BartenderOrders';
import { CommonColors } from './frontend/Common';

import BartendingCompanyScreen from './frontend/BartendingCompanyScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator useLegacyImplementation={false}
      screenOptions={{
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerStyle: {
          backgroundColor: CommonColors.secondaryBackgroundColor,
          color: CommonColors.lightTextColor,
        },
        headerStyle: {
          backgroundColor: CommonColors.secondaryBackgroundColor,
        },
        drawerLabelStyle: {
          color: CommonColors.lightTextColor,
        },
        drawerActiveBackgroundColor: CommonColors.secondaryButtonColor,
        sceneContainerStyle: {
          backgroundColor: CommonColors.primaryBackgroundColor,
        }
      }}
    >
      <Drawer.Screen name="ItemList" component={ItemList} />
      <Drawer.Screen name="ItemDetails" component={ItemDetails} />
      <Drawer.Screen name="LandingPage" component={LandingPage}/>
      <Drawer.Screen name="Login" component={LoginForm} />
      <Drawer.Screen name="Events" component={EventDiscovery} />
      <Drawer.Screen name="Orders" component={BartenderOrders} />
      <Drawer.Screen name="Admin" component={Admin} />
      <Drawer.Screen name="Bartender" component={Admin} />
      <Drawer.Screen name="Orders" component={Admin} />
      <Drawer.Screen name="Companies" component={BartendingCompanyScreen} />
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
