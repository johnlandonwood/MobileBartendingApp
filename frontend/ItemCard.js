import React from 'react';
import {View, Text, StyleSheet, Button, Image, SectionList} from 'react-native';
import {SimpleStepper} from 'react-native-simple-stepper';

const ItemCard = ({item}) => {
  console.log(item.logoUrl);
  return <>
        <View style={styles.wrapper}>
          <View style={styles.heading}>
            <Text style={styles.title}>{item.item_name}</Text>
            <Text style={styles.subtitle}>${item.price}</Text>
            <Text style={styles.subtitle}>{item.description}</Text>
          </View>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: `${item.logoUrl}` }}
              />
          </View>
        </View>
  </>;
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: '2%',
    borderRadius: '8px'
  },
  imageWrapper: {
    width: '60%'
  },
  heading:{
    width: '40%'
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#303540',
    marginBottom: 5,
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
});

export default ItemCard;