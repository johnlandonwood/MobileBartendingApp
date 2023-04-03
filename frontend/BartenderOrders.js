import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, } from 'react-native';
import { CustomButton } from './CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBeer, faWineGlass, faWhiskeyGlass } from '@fortawesome/free-solid-svg-icons';

const ORDERS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order #1', // replace titles with just numbers as they are removed and added from the queue?
    timePlaced: "7:00 PM",
    placedBy: "Landon Wood",
    drink1: {
      name: "Deep Ellum IPA",
      additionalInstructions: "",
      type: "beer", // For favicon display on selected order display
      quantity: 1,
    },
    drink2: {
      name: "Whiskey Sour",
      additionalInstructions: "Light ice",
      type: "cocktail",
      quantity: 1, // Note: it should always be drink1 that has 2 quantity. If a user wants to order 2 of the same drink,
      // they should not be able to fill out a drink2. 
    },
    status: "Unclaimed", // In Queue/Unclaimed, Claimed/Preparing, Ready to Pickup, Completed, Cancelled
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order #2',
    timePlaced: "7:01 PM",
    placedBy: "Maria Harrison",
    drink1: {
      name: "Pinot Noir",
      additionalInstructions: "",
      type: "wine",
      quantity: 1,
    },
    drink2: {
      name: "Tequila",
      additionalInstructions: "Light ice",
      type: "cocktail",
      quantity: 1,
    },
    status: "Unclaimed",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Order #3',
    timePlaced: "7:02 PM",
    placedBy: "Alex Cerpa",
    drink1: {
      name: "Martini",
      additionalInstructions: "Shaken, not stirred",
      type: "cocktail",
      quantity: 1,
    },
    drink2: {
      name: "Vodka Red Bull",
      additionalInstructions: "Tito's for the vodka",
      type: "cocktail",
      quantity: 1,
    },
    status: "Unclaimed",
  },
  {
    id: 'fffffffa-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order #4', 
    timePlaced: "7:03 PM",
    placedBy: "Landon Wood",
    drink1: {
      name: "Miller Lite",
      additionalInstructions: "",
      type: "beer", 
      quantity: 2,
    },
    drink2: {
      name: "",
      additionalInstructions: "",
      type: "",
      quantity: 0,
    },
    status: "Unclaimed",
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>

    <View style={styles.itemView}>
      <Text style={styles.itemStatus}>{item.status}</Text>
      <Text style={styles.timePlaced}>{item.timePlaced}</Text>
    </View>

    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    
  </TouchableOpacity>
);



// TODO:
// How to dynamically change colors of the queue items?
  // is in the renderItem function the right place to do it?
  // It doesn't seem like it, as it changes all 4 colors.
// Claiming orders:
  // When claim button is pressed, update order status to preparing
  // remove claim order button and replace with "Ready for pickup" button
  // when "ready for pickup" button is pressed, set order status to ready for pickup, move order to bottom of queue.
// Queue:
  // Claimed/Preparing goes at the top, 
  // in queue/unclaimed in the middle 
  // ready for pickup at the bottom.

const BartenderOrders = () => {

  const [selectedId, setSelectedId] = useState();
  const [selectedOrder, setSelectedOrder] = useState();

  const renderItem = ({item}) => {

    const backgroundColor = item.id === selectedId ? '#BAA7A7' : '#998888';
    const color = item.id === selectedId ? 'black' : 'black';


    // const order = ORDERS.find(item => item.id);
    // if (order.status === "Ready for Pickup") {
    //   backgroundColor = '#66ff66'
    // }

    return (
      <Item
        item={item}
        onPress={() => {
            setSelectedId(item.id);
            setSelectedOrder(ORDERS.find(item => item.id === selectedId));
          }
        }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const claimOrder = () => {
    setSelectedOrder((pre) => {return ({...pre, status: "Claimed/Preparing"})})
    ORDERS.find(item => item.id === selectedId).status = "Claimed/Preparing"
  }

  const readyForPickup = () => {
    setSelectedOrder((pre) => {return ({...pre, status: "Ready for Pickup"})})
    ORDERS.find(item => item.id === selectedId).status = "Ready for Pickup"
  }

  return (
  <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={ORDERS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <View style={styles.selectedOrder}>
        {selectedOrder === undefined && 
          <Text style={styles.selectPrompt}>Select an order from the queue to view it.</Text>
        }
        {selectedOrder !== undefined &&
           <View>
            <Text style={styles.title}>{selectedOrder.title}</Text>
            <Text style={{textAlign: 'center'}}>Time placed: {selectedOrder.timePlaced}</Text>
            <Text style={{textAlign: 'center'}}>Placed by: {selectedOrder.placedBy}</Text>
            <View style={styles.drink}>
              <View style={styles.drinkInline}>
                {selectedOrder.drink1.type === "beer" && 
                  <FontAwesomeIcon icon={faBeer} size={32} style={styles.icon}/>
                }
                {selectedOrder.drink1.type === "wine" && 
                  <FontAwesomeIcon icon={faWineGlass} size={32} style={styles.icon}/>
                }
                {selectedOrder.drink1.type === "cocktail" && 
                  <FontAwesomeIcon icon={faWhiskeyGlass} size={32} style={styles.icon}/>
                }
                <Text style={styles.drinkName}>{selectedOrder.drink1.name}</Text>
                <Text style={styles.quantity}>x{selectedOrder.drink1.quantity}</Text>
              </View>
              <Text style={styles.additionalInstructions}>{selectedOrder.drink1.additionalInstructions}</Text>
            </View>
            {selectedOrder.drink2.quantity !== 0 && 
              <View style={styles.drink}>
                <View style={styles.drinkInline}>
                  {selectedOrder.drink2.type === "beer" && 
                    <FontAwesomeIcon icon={faBeer} size={32} style={styles.icon}/>
                  }
                  {selectedOrder.drink2.type === "wine" && 
                    <FontAwesomeIcon icon={faWineGlass} size={32} style={styles.icon}/>
                  }
                  {selectedOrder.drink2.type === "cocktail" && 
                    <FontAwesomeIcon icon={faWhiskeyGlass} size={32} style={styles.icon}/>
                  }
                  <Text style={styles.drinkName}>{selectedOrder.drink2.name}</Text>
                  <Text style={styles.quantity}>x{selectedOrder.drink2.quantity}</Text>
                </View>
                <Text style={styles.additionalInstructions}>{selectedOrder.drink2.additionalInstructions}</Text>
              </View>
            }
            {selectedOrder.status === "Unclaimed" && 
              <CustomButton title="Claim Order" onPress={claimOrder}/>
            }
            {selectedOrder.status === "Claimed/Preparing" && 
              <CustomButton title="Mark Ready for Pickup" onPress={readyForPickup}/>
            }
           </View>
        }
      </View>
    </View>
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
    fontSize: 16,
    textAlign: 'right',
  },
  selectedOrder: {
    flex: 1,
    backgroundColor: '#BAA7A7',
  },
  drink: {
    border: 'solid',
    borderRadius: 4,
    borderColor: 'black',
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 5,
  },
  drinkName: {
    fontWeight: 'bold',
  },
  additionalInstructions: {
    textAlign: 'center',
  },
  selectPrompt: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 20,
  },
  icon: {
    paddingLeft: 50,
  },
  quantity : {
    paddingRight: 50,
    fontWeight: 'bold',
  },
  drinkInline: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemStatus: {
    fontSize: 16,
    textAlign: 'left',
  },
  itemView: {
    flexDirection: 'row', 
    justifyContent:'space-between'
  }

  
});


export default BartenderOrders;