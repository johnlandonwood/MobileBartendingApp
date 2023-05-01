import React, {Component} from 'react';
import { useContext, useState } from 'react';
import {View, Button, Alert, StyleSheet, FlatList, Text} from 'react-native';
import ItemDetailsCard from './ItemDetailsCard';
import { CartContext } from './context/CartContext';
import { placeOrder } from './api/bartenderOrders';

function sumofArray(sum, num) {
    return sum + num;
}
  
const getSubTotal = items => {
    if (items.length) {
      const subtotals = items.map(item => item.price * item.qty);
      return subtotals.reduce(sumofArray);
    }
    return 0;
};

const API_BASE_URL = 'http://localhost:4000/api'; // Replace with your API base URL

const CartSummary = ({route, navigation}) => {
    const cartContext = useContext(CartContext);

    const subtotal = getSubTotal(cartContext.context.cart);
    const renderCartItem = ({item}) => {
        return <>
            <View style={styles.cartItemContainer}>
                <View>
                    <Text style={styles.priceLabel}>
                        {item.qty}x {item.item_name}
                    </Text>
                </View>
                <View>
                <Text style={styles.price}>${item.price}</Text>
                </View>
            </View>
        </>;
    };

    console.log("cartContext", cartContext);
    console.log("cartContext.context.cart",cartContext.context.cart);
    return <>
      <View style={styles.wrapper}>
        <View style={styles.cartItemsContainer}>
          <FlatList
            data={cartContext.context.cart}
            renderItem={renderCartItem}
            keyExtractor={item => item._id.toString()}
          />
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.spacerBox} />

          {subtotal > 0 && (
            <View style={styles.paymentSummaryContainer}>
              <View style={styles.endLabelContainer}>
                <Text style={styles.priceLabel}>Subtotal</Text>
                <Text style={styles.priceLabel}>Tax??</Text>
                <Text style={styles.priceLabel}>Total</Text>
              </View>

              <View>
                <Text style={styles.price}>${subtotal}</Text>
                <Text style={styles.price}>$Tax???</Text>
                <Text style={styles.price}>${subtotal}</Text>
              </View>
            </View>
          )}
        </View>

        {subtotal == 0 && (
          <View style={styles.messageBox}>
            <Text style={styles.messageBoxText}>Your cart is empty</Text>
          </View>
        )}

        {subtotal > 0 && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                console.log("pressed");
                placeOrder(cartContext.context.cart);
            }}
              title="Place Order"
              color="#c53c3c"
            />
          </View>
        )}
      </View>
    </>;
};

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    linkButtonContainer: {
      marginTop: 10,
    },
    linkButton: {
      color: '#0366d6',
      fontSize: 13,
      textDecorationLine: 'underline',
    },
    cartItemsContainer: {
      flex: 5,
      marginTop: 20,
    },
    lowerContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    spacerBox: {
      flex: 2,
    },
    cartItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    paymentSummaryContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 20,
    },
    endLabelContainer: {
      alignItems: 'flex-end',
    },
    price: {
      fontSize: 17,
      fontWeight: 'bold',
    },
    priceLabel: {
      fontSize: 16,
    },
    messageBox: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4c90d4',
    },
    messageBoxText: {
      fontSize: 18,
      color: '#fff',
    },
    buttonContainer: {
      flex: 1,
      padding: 20,
    },
  });

export default CartSummary;