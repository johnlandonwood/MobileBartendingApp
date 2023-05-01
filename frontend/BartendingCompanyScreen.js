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


const API_BASE_URL = 'http://localhost:4000/api'; // Replace with your API base URL

const BartendingCompanyScreen = () => {
  const [companies, setCompanies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logoUri, setLogoUri] = useState(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const fetchCompanies = async (page) => {
    try {
      console.log("fetch for page:" + page);
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/companies`, {
        params: { page, limit: 10 }
      });
      if (response.data.length > 0) {
        setCompanies((prevCompanies) => [...prevCompanies, ...response.data]);
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
    fetchCompanies(page);
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


  const createOrUpdateCompany = async () => {
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
  
      formData.append('name', name);
      formData.append('email', email);
      formData.append('admin', '642ca8ea1b88eb85831f97a8')
  
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      };
  
      const url = isEditing
        ? `${API_BASE_URL}/companies/${currentCompany._id}`
        : `${API_BASE_URL}/companies`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      if (!response.ok) {
        if(data.errors){
            throw new Error(JSON.stringify(data.errors));
        }
        else {
            throw new Error(data.error || 'Error creating or updating company');
        }
      }
  
      if (isEditing) {
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company._id === data._id ? data : company
          )
        );
      } else {
        setCompanies((prevCompanies) => [...prevCompanies, data]);
      }
  
      setModalVisible(false);
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', error.message);
    }
    };

  const openModal = (company = null, editing = false) => {
    if (company) {
      setName(company.name);
      setEmail(company.email);
      setLogoUri(company.logoUrl);
    } else {
      setName('');
      setEmail('');
      setLogoUri(null);
    }
    setCurrentCompany(company);
    setIsEditing(editing);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => openModal(item, true)}>
      <Image
        source={{ uri: item.logoUrl }}
        style={styles.logo}
        PlaceholderContent={<ActivityIndicator />}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
);

    return (
    <View style={styles.container}>
    <FlatList
    data={companies}
    renderItem={renderItem}
    keyExtractor={(item) => item._id}
    onEndReached={handleEndReached}
    onEndReachedThreshold={0.5}
    ListFooterComponent={loading && !allLoaded ? <ActivityIndicator /> : null}
    />
    <Button
    title="Create Company"
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
    {isEditing ? 'Edit Company' : 'Create Company'}
    </Text>
    <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Company Name"
            />
    <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Company Email"
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
    title={isEditing ? 'Update Company' : 'Create Company'}
    onPress={createOrUpdateCompany}
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

export default BartendingCompanyScreen;
