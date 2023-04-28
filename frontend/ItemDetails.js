import React, {Component} from 'react';
import { useContext, useState } from 'react';
import {View, Button, Alert} from 'react-native';
import ItemDetailsCard from './ItemDetailsCard';
import { CartContext } from './context/CartContext';

const ItemDetails = ({route, navigation}) => {
  const cartContext = useContext(CartContext);

  const {item} = route.params;
  
  const [qty, setQtyState] = useState(1);

  const qtyChanged = value => {
    const nextValue = Number(value);
    setQtyState(nextValue);
  };

  const addToCart = (item, qty, text) => {
    Alert.alert(
      'Added to basket',
      `${qty} ${item.item_name} was added to the basket.`
    );
    cartContext.addToCart(item, qty, text);
  };

    return <>
      <ItemDetailsCard
        item={item}
        qty={qty}
        qtyChanged={qtyChanged}
        addToCart={addToCart}
      />
    </>;
};

export default ItemDetails;