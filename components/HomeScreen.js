import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import data from '../data/events';
import axios from 'axios';
import { FavoriteContext } from '../data/FavoriteContext';
import { Formik } from 'formik'; // ✅ Formik import edildi

const HomeScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoriteContext); 
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorite', { events })}>
          <Text style={styles.buttonText}>Favoriler</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, events]);

  useEffect(() => {
    axios.get('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=CvwwKLshuoBQEGehjgqg3qDdYBMqPX5E')
      .then(response => {
        const apiEvents = response.data._embedded?.events || [];
        setEvents(apiEvents);
        setFilteredEvents(apiEvents); // ✅ Başlangıçta tüm listeyi göster
        setLoading(false);
      })
      .catch(error => {
        console.log('Hata:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* ✅ Formik ile Arama Kutusu */}
      <Formik
        initialValues={{ search: '' }}
        onSubmit={() => {}}
      >
        {({ handleChange, values }) => (
          <TextInput
            style={styles.searchInput}
            placeholder="Etkinlik ara..."
            value={values.search}
            onChangeText={(text) => {
              handleChange('search')(text);  // Formik içindeki state güncelleniyor
              handleSearch(text);            // Liste filtreleniyor
            }}
          />
        )}
      </Formik>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isFav = favorites[item.id];

          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Detail', { data: item })}
            >
              <View style={{ backgroundColor: isFav ? '#fab20aff' : '#d8d8d8', flexDirection: "row" }}>
                <Image
                  resizeMode='cover'
                  style={{ width: 50, height: 50, borderWidth: 2 }}
                  source={require('../src/basketball.jpg')}
                />
                <View>
                  <Text style={styles.title}>{isFav ? '★ ' : ' '}{item.name}</Text>
                  <Text style={styles.date}>{item.dates?.start?.localDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
  }
});

export default HomeScreen;
