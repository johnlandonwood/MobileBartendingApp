import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Button, Image, ListItem, Icon, Input } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { getDrinkItems } from './api/Items';
import { SelectList } from 'react-native-dropdown-select-list'


const API_BASE_URL = 'http://localhost:4000/api'; // Replace with your API base URL

const DrinksScreen = () => {
    const [drinkItems, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [logoUri, setLogoUri] = useState(null);

    const data = [
      {key:'1', value:'Beer'},
      {key:'2', value:'Wine'},
      {key:'3', value:'Liquor'},
      {key:'4', value:'Mixed Drink'},
      {key:'5', value:'Non-Alcoholic'},
    ];

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    const fetchItems = async (page) => {
        try {
          console.log("fetch for page:" + page);
          setLoading(true);
          const response = await axios.get(`${API_BASE_URL}/drinks`, {
            params: { page, limit: 10 }
          });
          if (response.data.length > 0) {
            setItems((prevItems) => [...prevItems, ...response.data]);
          } else {
            setAllLoaded(true);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    const handleEndReached = () => {
        if (!loading && !allLoaded) {
        console.log("going to page:" + (page + 1));
        setPage((page) => page + 1);
        }
    };

    useEffect(() => {
        fetchItems(page);
    }, [page]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        if (!result.canceled) {
        setLogoUri(result.uri);
        }
    };


  const createOrUpdateDrink = async () => {
    try {
      const formData = new FormData();
  
      if (logoUri) {
        const fileExtension = logoUri.split('.').pop();
        const fileName = `logo.${fileExtension}`;
        formData.append('logo', {
          uri: logoUri,
          type: `image/${fileExtension}`,
          name: fileName,
        });
      }
  
      formData.append('item_name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
  
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      };
  
      const url = isEditing
        ? `${API_BASE_URL}/drinks/${currentItem._id}`
        : `${API_BASE_URL}/drinks`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      if (!response.ok) {
        if(data.errors){
            throw new Error(JSON.stringify(data.errors));
        }
        else {
            throw new Error(data.error || 'Error creating or updating drink');
        }
      }
  
      if (isEditing) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === data._id ? data : item
          )
        );
      } else {
        setItems((prevItems) => [...prevItems, data]);
      }
  
      setModalVisible(false);
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', error.message);
    }
    };

  const openModal = (drink = null, editing = false) => {
    if (drink) {
      setName(drink.item_name);
      setDescription(drink.description);
      setPrice(drink.price);
      setCategory(drink.category);
      setLogoUri(drink.logoUrl);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setLogoUri(null);
    }
    setCurrentItem(drink);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider key={index} onPress={() => openModal(item, true)}>
      <Image
        source={{ uri: item.logoUrl }}
        style={styles.logo}
        PlaceholderContent={<ActivityIndicator />}
      />
      <ListItem.Content>
        <ListItem.Title>{item.item_name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.category}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
);

    return (
    <View style={styles.container}>
    <FlatList
    data={drinkItems}
    renderItem={renderItem}
    keyExtractor={(item) => item._id}
    onEndReached={handleEndReached}
    onEndReachedThreshold={0.5}
    ListFooterComponent={loading && !allLoaded ? <ActivityIndicator /> : null}
    />
    <Button
    title="Create Drink Item"
    onPress={() => openModal(null, false)}
    containerStyle={styles.createButton}
    />
    {modalVisible && (
    <View style={styles.modal}>
    <View style={styles.modalContent}>
    <TouchableOpacity
    style={styles.closeButton}
    onPress={() => setModalVisible(false)}
    >
    <Icon name="close" type="material" />
    </TouchableOpacity>
    <Text style={styles.modalTitle}>
    {isEditing ? 'Edit Drink Item' : 'Create Drink Item'}
    </Text>
    <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Drink Name"
            />
    <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Drink Description"
            />
    <Input
            label="Price"
            value={price}
            onChangeText={setPrice}
            placeholder="Drink Price"
            />
    <SelectList setSelected={(val) => setCategory(val)}
      data={data}
      save="value"
      />
    {logoUri ? (
    <Image source={{ uri: logoUri }} style={styles.logoPreview} />
    ) : (
    <View style={styles.logoPlaceholder}>
    <Text>No Logo</Text>
    </View>
    )}
    <Button title="Pick Logo" onPress={pickImage} />
    <Button
    title={isEditing ? 'Update Drink Item' : 'Create Drink Item'}
    onPress={createOrUpdateDrink}
    />
    </View>
    </View>
    )}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    createButton: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    modal: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logoPreview: {
        width: 100,
        height: 100,
        borderRadius: 5,
        alignSelf: 'center',
    },
    logoPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
});

export default DrinksScreen;
