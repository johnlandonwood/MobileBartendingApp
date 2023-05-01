import React from 'react';
import { useState } from 'react';
import {View, Text, Image, Button, Dimensions, StyleSheet, TextInput} from 'react-native';
import SimpleStepper from 'react-native-simple-stepper';
import { CustomButton } from './CustomButton';
const screenWidth = Dimensions.get('window').width;

const ItemDetailsCard = ({item, qty, qtyChanged, addToCart}) => {
  const [additionalNotes, onChangeText] = useState('');
  const [iceSelected, setIceSelected] = useState("");
  console.log(qty);
  console.log(additionalNotes);

  const iceAddOns = [
    {key:'1', value:'No Ice'},
    {key:'2', value:'Light Ice'},
    {key:'3', value:'Regular Ice'},
    {key:'4', value:'Extra Ice'}
  ];

  return <>
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={{
            uri: `${item.logoUrl}` 
        }}
      />
      <View style={styles.heading}>
        <View style={styles.smallItemContainer}>
          <Text style={styles.mainText}>{item.item_name}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>

        <View style={styles.smallItemContainer}>
          <Text style={styles.subText}>{item.description}</Text>
        </View>
      </View>

      {/* <View style={styles.addOns}>
        <Text style={styles.labelText}>Ice Add-Ons</Text>
        <SelectList
          setSelected={(val) => setIceSelected(val)}
          data={iceAddOns}
          save="value"
          search={false}
        />
      </View> */}

      <View style={styles.specialInstructions}>
        <Text style={styles.labelText}>Special Instructions </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={additionalNotes}
          placeholder="Add a note for your bartender"
          keyboardType='alphanumeric'
        />
      </View>

      <View style={styles.stepper}>
      <Text style={styles.labelText}>How many?</Text>
      <View style={styles.itemContainer}>
        <SimpleStepper
          valueChanged={value => qtyChanged(value)}
          initialValue={1}
          minimumValue={1}
          maximumValue={2}
          showText={true}
          containerStyle={styles.stepperContainer}
          incrementImageStyle={styles.stepperButton}
          decrementImageStyle={styles.stepperButton}
          textStyle={styles.stepperText}
        />
      </View>
      </View>

      <View style={styles.itemContainer}>
      <CustomButton title="Add to Basket" onPress={() => {
                addToCart(item, qty, additionalNotes);
        }}></CustomButton>
      </View>
    </View>
    </>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // alignItems: 'center',
    marginHorizontal: 10
  },
  heading: {
    backgroundColor: 'white',
    padding: '2%',
    borderRadius: '8px',
    margin: 5
  },
  addOns: {
    backgroundColor: 'white',
    padding: '2%',
    borderRadius: '8px',
    margin: 5
  },
  specialInstructions: {
    backgroundColor: 'white',
    padding: '2%',
    borderRadius: '8px',
    margin: 5
  },
  stepper: {
    backgroundColor: 'white',
    padding: '2%',
    borderRadius: '8px',
    margin: 5
  },
  image: {
    width: screenWidth - 20,
    height: 300,
    marginBottom: 5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    resizeMode: 'cover'
  },
  stepperContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  itemContainer: {
    marginBottom: 10,
  },
  smallItemContainer: {
    marginBottom: 5,
  },
  mainText: {
    fontSize: 24,
    fontWeight: '700'
  },
  subText: {
    fontSize: 14,
    color: '#3a3a3a',
  },
  priceText: {
    fontSize: 22,
    fontWeight: '400',
  },
  labelText: {
    fontSize: 18,
    color: '#303540',
    fontweight: '700',
    marginBottom: 5
  },
  inputText: {
    fontSize: 18,
    color: '#303540',
    fontWeight: 'bold',
    marginTop: 8
  },
  stepperButton: {
    height: 20,
    width: 20,
  },
  stepperText: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 80,
    backgroundColor: '#E4EBEC',
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: '8px',
  },
});

export default ItemDetailsCard;