import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { CustomButton } from './CustomButton';

// var drink1 = {
//   title: ''
// }
// var drink2 = {
//   title: ''
// }

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order #1',
    timePlaced: "7:00 PM",
    placedBy: "Landon Wood",
    drink1: "Deep Ellum IPA",
    drink2: "Topo Chico Seltzer"
    // drink1: {
    //   title: "Deep Ellum IPA",
    //   additionalInstructions: "",
    // },
    // drink2: {
    //   title: "Topo Chico Seltzer",
    //   additionalInstructions: "",
    // }
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order #2',
    timePlaced: "7:01 PM",
    placedBy: "Maria Harrison",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Order #3',
    timePlaced: "7:02 PM",
    placedBy: "Alex Cerpa",
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <View>
      <Text style={styles.timePlaced}>{item.timePlaced}</Text>
    </View>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    {/* <Text>{item.placedBy}</Text> */}
    {/* <Text>{item.drink1}</Text> */}
  </TouchableOpacity>
);

const selectedOrder = ({item}) => (
  <View>
    <Text style={styles.title}>{item.title}</Text>
    <Text>{item.timePlaced}</Text>
  </View>

);

const BartenderOrders = () => {

 

  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#BAA7A7' : '#998888'; // Green for completed, 
    const color = item.id === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderSelectedOrder = ({item}) => {
    // const selectedOrder = DATA.find(item => item.id === selectedId)
    // Need to figure out how to actually select an item from the list
    // Selected id set to null on page load - if selected id is null, then display "Selet an item"
    // then set the selected id
    // then re-render the component on the right side of the page?

    return ( 
        <Text style={styles.title}>{item.title}</Text>
    );


  };


  return (
  <SafeAreaView style={styles.container}>
      <View style={{flex:1}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <View style={styles.selectedOrder}>
      {/* If an order is not selected, should display a big prompt to select an order from the left side of the screen */}
        <Text style={styles.title}>Order #1</Text>
        <Text>Time placed: 7:00 PM</Text>
        <Text>Placed by: Landon Wood</Text>
        <View style={styles.drink}>
          <Text>Deep Ellum IPA</Text>
        </View>
        <View style={styles.drink}>
          <Text>Topo Chico Seltzer</Text>
        </View>
        <CustomButton title="Claim Order"/>

        {/* status dropdown */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight || 0,
    border: 'none',
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  timePlaced: {
    fontSize: 20,
    textAlign: 'right',
  },
  selectedOrder: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#BAA7A7',
  },
  drink: {
    border: 'solid',
    borderRadius: 3,
    borderColor: 'black',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 3,
  }
  
});


export default BartenderOrders;