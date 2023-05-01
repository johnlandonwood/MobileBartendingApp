import 'react-native-gesture-handler';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faStar, 
  faCalendarDays, 
  faCircle, 
  faCheck, 
  faWineGlassEmpty, 
  faWineGlass, 
  faSort, 
  faFilter, 
  faWineBottle, 
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faImage, 
  faStar as farStar, 
  faMap as farMap 
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faStar, 
  farStar, 
  faCalendarDays, 
  faCircle, 
  faCheck, 
  faExclamationCircle,
  faWineGlass, 
  faWineGlassEmpty, 
  farMap, 
  faSort, 
  faFilter, 
  faWineBottle, 
  faImage
);



import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import EventDiscovery from './frontend/EventDiscovery';
import Admin from './frontend/Admin';
import {LandingPage} from './frontend/LandingPage';
import { AuthProvider, useAuth } from './frontend/AuthContext';
import BartenderOrders from './frontend/BartenderOrders';
import { CommonColors } from './frontend/Common';
import BartendingCompanyScreen from './frontend/BartendingCompanyScreen'

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const dimensions = useWindowDimensions();
  const { isAuthenticated, profile } = useAuth();

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
            <Drawer.Screen name="Home" component={LandingPage}/>

            {isAuthenticated && <>
              <Drawer.Screen name="Events" component={EventDiscovery} />
            </>}

            {profile?.role == "admin" && <>
              <Drawer.Screen name="Admin" component={Admin} />
              <Drawer.Screen name="Companies" component={BartendingCompanyScreen} />
            </>}

            {profile?.role == "bartender" && <>
              <Drawer.Screen name="Bartender" component={Admin} />
            </>}

            <Drawer.Screen name="Orders" component={BartenderOrders} />
            
      </Drawer.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MyDrawer />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
