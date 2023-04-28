import { ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { CustomButton } from "./CustomButton";
import { StackActions } from "@react-navigation/core";

import { StatusBar, Text, Image } from "react-native";
import { CommonColors } from "./Common";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      paddingVertical: 20,
      paddingHorizontal: 30,
      border: 'none',
      flexDirection: "row",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      flexGrow:1 
    },
    item: {
        marginVertical: 10,
        padding: 5,
        backgroundColor: "white",
        borderRadius: 6,
        width: "100%",
    },
    placeholder: {
        backgroundColor: "white",
        width: "100%",
    },
    itemName: {
        fontSize: 18, 
    }
});


const InventoryItem = ({navigation}) => {
    return <TouchableOpacity style={styles.item}>
        <FontAwesomeIcon icon="fa-regular fa-image" size={128} style={styles.placeholder}/>
        <Text style={styles.itemName}>Test</Text>
        <CustomButton title="Modify"/>
    </TouchableOpacity>
}


export const ManageInventory = ({navigation}) => {
    return <ScrollView contentContainerStyle={styles.container}>
                <CustomButton title="Go Back" onPress={() => {
                navigation.dispatch(StackActions.popToTop());
        }}></CustomButton>
        <InventoryItem/>
        <InventoryItem/>
        <InventoryItem/>
    </ScrollView>
}

