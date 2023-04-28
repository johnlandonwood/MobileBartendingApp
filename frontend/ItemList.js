import React from 'react';
import {View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, SectionList} from 'react-native';
import { useState, useEffect } from 'react';
import { getDrinkList } from './api/DrinkLists';
import ItemCard from './ItemCard';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import NavigationContainer from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { create } from 'express-handlebars';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetails from './ItemDetails';

// const Stack = createStackNavigator();

// function MyStack() {
//   const dimensions = useWindowDimensions();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="ItemDetails"
//           component={ItemDetails}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

const beer_addons = [];
const wine_addons = [];
const liquor_addons = [];
const mixeddrink_addons = [];
const nonalcoholic_addons = [];

const ItemList = ({navigation}) => {

    const [ drinkList, setItemList ] = useState([]);

    const [search, setSearch] = useState('');

    // onChangeQuery = (text) => {
    //     this.setState({
    //         query: text,
    //     });
    // };
    useEffect(() => {
      const id = "643e0aa97af5cbba5016df75";
      getDrinkList(id).then(x => {
        // drinkList = x[0];
        setItemList(x);
      });
    }, []);
    console.log(drinkList);

    return <>
        <View style={styles.wrapper}>
            <View style={styles.topWrapper}>
                <View style={styles.textInputWrapper}>
                    <TextInput 
                    style={styles.textInput}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    placeholder={'Search drink list'}
                    keyboardType="numeric"
                    />
                </View>

                <View style={styles.buttonWrapper}>
                    {/* <Button
                        onPress={() => filterList()}
                        title="Go"
                        color="#c53c3c"
                    /> */}
                </View>
            </View>
            <SectionList
              sections={drinkList}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => {
                  const handleOnPress = () => navigation.navigate('ItemDetails', {item});
                  return<>
                  <TouchableOpacity
                      onPress={handleOnPress}
                  >
                  <ItemCard item={item}/>
                  </TouchableOpacity>
                  </>
              }}
              renderSectionHeader={({section: {title} }) => {
                return<>
                  <Text style={styles.header}>{title}</Text>
                </>
              }}
              contentContainerStyle={styles.list}
            />
        </View>
    
    </>;
};

const styles = StyleSheet.create({
    headerButtonContainer: {
      marginRight: 10,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      backgroundColor: "#f5f5dc",
      marginBottom: 8,
      borderRadius: '4px',
      padding: 4,
      textAlign: 'center'
    },
    wrapper: {
      flex: 1,
      padding: 10,
    },
    topWrapper: {
      flexDirection: 'row',
    },
    textInputWrapper: {
      flex: 4,
    },
    textInput: {
      height: 35,
      borderColor: '#5d5d5d',
      borderWidth: 1,
      borderRadius: '4px',
      paddingLeft: 6
    },
    buttonWrapper: {
      flex: 1,
    },
    list: {
      marginTop: 20,
    },
  });

export default ItemList;