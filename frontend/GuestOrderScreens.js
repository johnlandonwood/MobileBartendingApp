import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import ItemList from "./ItemList";
import ItemDetails from "./ItemDetails";
import CartSummary from "./CartSummary";
import { CommonColors, CommonStyles } from './Common';

const Stack = createStackNavigator();

const GuestOrderScreens = ({navigation}) => {
    return <>
        <SafeAreaView style={styles.container}>
            
            <Stack.Navigator
            initialRouteName="ItemList"
            screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: CommonColors.primaryBackgroundColor,
            }
            }}
            >
            <Stack.Screen name="ItemList" component={ItemList} />
            <Stack.Screen name="ItemDetails" component={ItemDetails} />
            <Stack.Screen name="CartSummary" component={CartSummary} />
            </Stack.Navigator>
        </SafeAreaView>
    </>

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      border: 'none',
    }
  });

export default GuestOrderScreens;