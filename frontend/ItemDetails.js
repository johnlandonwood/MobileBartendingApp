import React, {Component} from 'react';
import { useContext, useState } from 'react';
import {View, Button, Alert} from 'react-native';
import ItemDetailsCard from './ItemDetailsCard';

const ItemDetails = ({route, navigation}) => {

  const {item} = route.params;
  
  const [qty, setQtyState] = useState(1);

  const qtyChanged = value => {
    const nextValue = Number(value);
    setQtyState(nextValue);
  }

  // const addToCart = (item, qty) => {
  //   Alert.alert(
  //     'Added to basket',
  //     `${qty} ${item.name} was added to the basket.`,
  //   );
  // };

    return <>
      <ItemDetailsCard
        item={item}
        qty={qty}
        qtyChanged={qtyChanged}
        // addToCart={addToCart}
      />
    </>;
};
//

export default ItemDetails;