import React from 'react';
import {View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, SectionList} from 'react-native';
import { useState, useEffect } from 'react';
import { getDrinkList } from './api/OrderList';
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

const ItemList = ({navigation}) => {

    // const [ itemList, setItemList ] = useState([]);

    const [query, onChangeQuery] = useState('');

    // onChangeQuery = (text) => {
    //     this.setState({
    //         query: text,
    //     });
    // };
    const id = "643e0aa97af5cbba5016df75";

    // getDrinkList(id).then(x => setItemList(x));

    const itemList = [
      {
    	title: "Beer",
    	data: [
    		{
    			"item_name": "Bud Light",
		      "description": "This is a good beer.",
		      "price": "8.99",
		    },
		    {
		      "item_name": "Budweiser",
		      "description": "a pretty good beer",
		      "price": "8.49",
		    },
		    {
		      "item_name": "Busch",
		      "description": "beer beer beer",
		      "price": "5.42",
		    },
		    {
		      "item_name": "Coors Light",
		      "description": "yummmy",
		      "price": "5.72",
		    },
		    {
		      "item_name": "Michelob Ultra",
		      "description": "delicious",
		      "price": "8.45",
		      "category": "Beer"
		    },
		    {
		      "item_name": "Miller High Life",
		      "description": "a good time",
		      "price": "4.56",
		    }
    	]
    },
    {
    	title: "Wine",
    	data: [
    		{
		      "item_name": "brunello",
		      "description": "luscious black and red fruits",
		      "price": "12.99",
		    },
		    {
		      "item_name": "cabernet sauvignon",
		      "description": "full bodied wines with great depth",
		      "price": "12.46",
		    },
		    {
		      "item_name": "chardonnay",
		      "description": "takes well with oak aging",
		      "price": "11.46",
		    },
		    {
		      "item_name": "chianti",
		      "description": "fruity and light",
		      "price": "11.42",
		    },
		    {
		      "item_name": "malbec",
		      "description": "not-very-hardy grape",
		      "price": "13.55",
		      "category": "Wine"
		    },
		    {
		      "item_name": "merlot",
		      "description": "softer and medium in weight",
		      "price": "14.26",
    		}
    	]
    },
    {
      title: "Liquor",
    	data: [
    		{
		      "item_name": "bourbon",
		      "description": "not familiar with this",
		      "price": "5.45",
		    },
		    {
		      "item_name": "brandy",
		      "description": "also not familiar",
		      "price": "4.52",
		    },
		    {
		      "item_name": "cognac",
		      "description": "yum i guess",
		      "price": "5.32",
		    },
		    {
		      "item_name": "gin",
		      "description": "delicious",
		      "price": "4.72",
		    },
		    {
		      "item_name": "vodka",
		      "description": "oh gosh",
		      "price": "5.52",
		    },
		    {
		      "item_name": "tequila",
		      "description": "absolutely not",
		      "price": "5.52",
		    },
		    {
		      "item_name": "rum",
		      "description": "it's a taste",
		      "price": "6.47",
    		}
    	]
    },
    {
      title: "Non-Alcoholic",
    	data: [
    		{
		    	"item_name": "diet coke",
		      "description": "yay",
		      "price": "3.40",
		    },
		    {
		      "item_name": "dr. pepper",
		      "description": "not my taste",
		      "price": "3.48",
		    },
		    {
		      "item_name": "shirley temple",
		      "description": "so good",
		      "price": "5.56",
    		}
    	]
    }
];
    // const itemList = [{
    //   "_id": {
    //     "$oid": "643e014d7af5cbba5016df5c"
    //   },
    //   "item_name": "Bud Light",
    //   "description": "a good beer",
    //   "price": "8.99",
    //   "category": "Beer"
    // },{
    //   "_id": {
    //     "$oid": "643e02d47af5cbba5016df5d"
    //   },
    //   "item_name": "Budweiser",
    //   "description": "a pretty good beer",
    //   "price": "8.49",
    //   "category": "Beer"
    // },{
    //   "_id": {
    //     "$oid": "643e030c7af5cbba5016df5e"
    //   },
    //   "item_name": "Busch",
    //   "description": "beer beer beer",
    //   "price": "5.42",
    //   "category": "Beer"
    // },{
    //   "_id": {
    //     "$oid": "643e03377af5cbba5016df5f"
    //   },
    //   "item_name": "Coors Light",
    //   "description": "yummmy",
    //   "price": "5.72",
    //   "category": "Beer"
    // },{
    //   "_id": {
    //     "$oid": "643e03677af5cbba5016df60"
    //   },
    //   "item_name": "Michelob Ultra",
    //   "description": "delicious",
    //   "price": "8.45",
    //   "category": "Beer"
    // },{
    //   "_id": {
    //     "$oid": "643e03937af5cbba5016df61"
    //   },
    //   "item_name": "Miller High Life",
    //   "description": "a good time",
    //   "price": "4.56",
    //   "category": "Beer"
    // },{
    //   "_id": {
    //     "$oid": "643e03bb7af5cbba5016df62"
    //   },
    //   "item_name": "brunello",
    //   "description": "luscious black and red fruits",
    //   "price": "12.99",
    //   "category": "Wine"
    // },{
    //   "_id": {
    //     "$oid": "643e04217af5cbba5016df63"
    //   },
    //   "item_name": "cabernet sauvignon",
    //   "description": "full bodied wines with great depth",
    //   "price": "12.46",
    //   "category": "Wine"
    // },{
    //   "_id": {
    //     "$oid": "643e04427af5cbba5016df64"
    //   },
    //   "item_name": "chardonnay",
    //   "description": "takes well with oak aging",
    //   "price": "11.46",
    //   "category": "Wine"
    // },{
    //   "_id": {
    //     "$oid": "643e04627af5cbba5016df65"
    //   },
    //   "item_name": "chianti",
    //   "description": "fruity and light",
    //   "price": "11.42",
    //   "category": "Wine"
    // },{
    //   "_id": {
    //     "$oid": "643e047d7af5cbba5016df66"
    //   },
    //   "item_name": "malbec",
    //   "description": "not-very-hardy grape",
    //   "price": "13.55",
    //   "category": "Wine"
    // },{
    //   "_id": {
    //     "$oid": "643e04a57af5cbba5016df67"
    //   },
    //   "item_name": "merlot",
    //   "description": "softer and medium in weight",
    //   "price": "14.26",
    //   "category": "Wine"
    // },{
    //   "_id": {
    //     "$oid": "643e04ea7af5cbba5016df68"
    //   },
    //   "item_name": "bourbon",
    //   "description": "not familiar with this",
    //   "price": "5.45",
    //   "category": "Liquor"
    // },{
    //   "_id": {
    //     "$oid": "643e050d7af5cbba5016df69"
    //   },
    //   "item_name": "brandy",
    //   "description": "also not familiar",
    //   "price": "4.52",
    //   "category": "Liquor"
    // },{
    //   "_id": {
    //     "$oid": "643e052b7af5cbba5016df6a"
    //   },
    //   "item_name": "cognac",
    //   "description": "yum i guess",
    //   "price": "5.32",
    //   "category": "Liquor"
    // },{
    //   "_id": {
    //     "$oid": "643e05457af5cbba5016df6b"
    //   },
    //   "item_name": "gin",
    //   "description": "delicious",
    //   "price": "4.72",
    //   "category": "Liquor"
    // },{
    //   "_id": {
    //     "$oid": "643e05597af5cbba5016df6c"
    //   },
    //   "item_name": "vodka",
    //   "description": "oh gosh",
    //   "price": "5.52",
    //   "category": "Liquor"
    // },{
    //   "_id": {
    //     "$oid": "643e05687af5cbba5016df6d"
    //   },
    //   "item_name": "tequila",
    //   "description": "absolutely not",
    //   "price": "5.52",
    //   "category": "Liquor"
    // },{
    //   "_id": {
    //     "$oid": "643e057f7af5cbba5016df6e"
    //   },
    //   "item_name": "rum",
    //   "description": "it's a taste",
    //   "price": "6.47",
    //   "category": "Liquor"
    // },{
    //   "_id": {
    //     "$oid": "643e05a97af5cbba5016df6f"
    //   },
    //   "item_name": "diet coke",
    //   "description": "yay",
    //   "price": "3.40",
    //   "category": "Non-Alcoholic"
    // },{
    //   "_id": {
    //     "$oid": "643e05c37af5cbba5016df70"
    //   },
    //   "item_name": "dr. pepper",
    //   "description": "not my taste",
    //   "price": "3.48",
    //   "category": "Non-Alcoholic"
    // },{
    //   "_id": {
    //     "$oid": "643e05d57af5cbba5016df71"
    //   },
    //   "item_name": "shirley temple",
    //   "description": "so good",
    //   "price": "5.56",
    //   "category": "Non-Alcoholic"
    // }];

    return <>
        <View style={styles.wrapper}>
            <View style={styles.topWrapper}>
                <View style={styles.textInputWrapper}>
                    <TextInput 
                    style={styles.textInput}
                    onChangeText={onChangeQuery}
                    value={query}
                    placeholder={'What are you craving?'}
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

            {/* sections={
   DATA.filter((city)=>city.title.toUpperCase().includes(searchPhrase.toUpperCase()))
} */}
            <SectionList
              sections={itemList}
              keyExtractor={(item, index) => item+ index}
              renderItem={({item}) => {
                  const handleOnPress = () => navigation.navigate('ItemDetails', {item});
                  return<>
                  <TouchableOpacity
                      onPress={handleOnPress}
                  >
                  <ItemCard item={item} viewItem={viewItem} />
                  </TouchableOpacity>
                  </>
              }
              }
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

    const viewItem = item =>  {
        props.navigation.navig
    }

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