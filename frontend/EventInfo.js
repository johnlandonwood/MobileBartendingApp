import { StatusBar, SafeAreaView, FlatList, 
    StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';

      
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    header: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const EventInfo = () => {
    return <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Events</Text>
    </SafeAreaView>
}


export default EventInfo;
