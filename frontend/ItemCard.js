import React from 'react';
import {View, Text, StyleSheet, Button, Image, SectionList} from 'react-native';
import {SimpleStepper} from 'react-native-simple-stepper';

const ItemCard = ({item}) => {
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
                uri: 'data:image/jpeg;base64,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'
              }}
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