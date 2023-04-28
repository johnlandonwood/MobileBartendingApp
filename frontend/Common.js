import { StyleSheet, View, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export const CommonColors = {
    primaryBackgroundColor: "#EADEDA",
    secondaryBackgroundColor: "#722F37",
    lightTextColor: '#F8F3F2',

    primaryButtonColor: "#722F37",
    secondaryButtonColor: "#998888",

}

export const CommonStyles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        borderColor: '#4D4242'
      },
});


const styles = StyleSheet.create({
    errorContainer: {
        borderRadius: 4,
        backgroundColor: '#998888',
        overflow: 'hidden',
        marginLeft: 12,
        marginRight: 12,
        padding: 6,
        paddingLeft: 0,
      },
      errorText: {
        color: '#721c24',
        fontWeight: 'bold',
      }
});



export const Alert = ({text}) => {
  return  <View style={styles.errorContainer}>
    <Text style={styles.errorText}> 
      <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" color="#722F37"/>
      {text}
    </Text>
  </View>
};

