import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, } from 'react-native';
import { CustomButton } from './CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBeer, faWineGlass, faWhiskeyGlass, faMartiniGlass, faGlassWater } from '@fortawesome/free-solid-svg-icons';
import { getOrders } from './api/bartenderOrders';

const sortOrder = ['Claimed/Preparing', 'Unclaimed', 'Ready for Pickup']

const getColor = (item) => {
  switch (item.status) {
    case 'Claimed/Preparing':
      return '#FEFF97'
    case "Unclaimed":
      return '#BAA7A7'
    case 'Ready for Pickup':
      return '#8FE6A1'
  }
}

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor: getColor(item)}]}>
    <View style={styles.itemView}>
      <Text style={styles.itemStatus}>{item.status}</Text>
      <Text style={styles.timePlaced}>Placed: {item.timePlaced}</Text>
    </View>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    {item.status === "Ready for Pickup" &&
        <Text style={styles.timePlaced}>Fulfilled: {item.timeFulfilled}</Text>
      }
  </TouchableOpacity>
);

const BartenderOrders = () => {

  const [selectedId, setSelectedId] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const response = await getOrders();
    setOrders(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []); 

  const renderItem = ({item}) => {

    const backgroundColor = item._id === selectedId ? '#BAA7A7' : '#998888';
    const color = item._id === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
            setSelectedId(item._id);
            setSelectedOrder(orders.find(item => item._id === selectedId));
          }
        }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const claimOrder = () => {
    setSelectedOrder((pre) => {return ({...pre, status: "Claimed/Preparing"})})
    orders.find(item => item._id === selectedId).status = "Claimed/Preparing"
  }

  const readyForPickup = () => {
    setSelectedOrder((pre) => {return ({...pre, status: "Ready for Pickup"})})
    orders.find(item => item._id === selectedId).status = "Ready for Pickup"
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: "numeric", 
        minute: "numeric"
      }
    )
    orders.find(item => item._id === selectedId).timeFulfilled = currentTime
  }

  const setFulfilledTime = () => {
    setSelectedOrder((pre) => {return ({...pre, status: "Ready for Pickup"})})
  }

  return (
  <View style={styles.container}>
      <View style={styles.container}>
        {/* <FlatList
          data={ORDERS.sort((a,b) => sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status))}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        /> */}
        {loading && <Text>Loading orders...</Text>}
        {orders && (
          <FlatList
            data={orders.sort((a,b) => sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status))}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            extraData={selectedId}
          />
        )}
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
          {selectedOrder.drinks.map((item,index) => { return( 
            <View style={styles.drink} key={index}>
              <View style={styles.drinkInline}>
                {item.category === "Beer" && 
                  <FontAwesomeIcon icon={faBeer} size={32} style={styles.icon}/>
                }
                {item.category === "Wine" && 
                  <FontAwesomeIcon icon={faWineGlass} size={32} style={styles.icon}/>
                }
                {item.category === "Mixed Drink" && 
                  <FontAwesomeIcon icon={faMartiniGlass} size={32} style={styles.icon}/>
                }
                {item.category === "Liquor" && 
                  <FontAwesomeIcon icon={faWhiskeyGlass} size={32} style={styles.icon}/>
                }
                {item.category === "Non-Alcoholic" && 
                  <FontAwesomeIcon icon={faGlassWater} size={32} style={styles.icon}/>
                }
                <Text style={styles.name}>{item.item_name}</Text>
                <Text style={styles.qty}>x{item.qty}</Text>
              </View>
              <Text style={styles.additionalNotes}>{item.additionalNotes}</Text>
            </View>
            )})}
          {selectedOrder.status === "Unclaimed" && 
              <CustomButton title="Claim Order" onPress={claimOrder}/>
            }
            {selectedOrder.status === "Claimed/Preparing" && 
              <CustomButton title="Mark Ready for Pickup" onPress={readyForPickup}/>
            }
           </View>
          }
            {/* {selectedOrder.drink2.qty !== 0 && 
              <View style={styles.drink}>
                <View style={styles.drinkInline}>
                  {selectedOrder.drink2.category === "beer" && 
                    <FontAwesomeIcon icon={faBeer} size={32} style={styles.icon}/>
                  }
                  {selectedOrder.drink2.category === "wine" && 
                    <FontAwesomeIcon icon={faWineGlass} size={32} style={styles.icon}/>
                  }
                  {selectedOrder.drink2.category === "cocktail" && 
                    <FontAwesomeIcon icon={faWhiskeyGlass} size={32} style={styles.icon}/>
                  }
                  <Text style={styles.item_name}>{selectedOrder.drink2.name}</Text>
                  <Text style={styles.qty}>x{selectedOrder.drink2.qty}</Text>
                </View>
                <Text style={styles.additionalNotes}>{selectedOrder.drink2.additionalNotes}</Text>
              </View>
            } */}
        
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
  name: {
    fontWeight: 'bold',
  },
  additionalNotes: {
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
  qty : {
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