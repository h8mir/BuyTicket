import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoriteContext } from '../data/FavoriteContext';

const FavoritesScreen = ({ navigation, route }) => {
  const { favorites } = useContext(FavoriteContext);
  const { events } = route.params;

  const favoriteIds = Object.keys(favorites).filter((id) => favorites[id]);
  const favoriteEvents = events.filter(event => favoriteIds.includes(event.id));

  return (
    <View style={styles.container}>
      {favoriteEvents.length === 0 ? (
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <Text style={styles.text}>Favori bir etkinlik yok. Hadi biraz Etkinlik keşfedelim</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Keşfet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        favoriteEvents.map((event) => (
          <View key={event.id} style={styles.eventBox}>
            <TouchableOpacity 
              style={styles.buttonStyle} 
              onPress={() => navigation.navigate('Detail', { data: event })}>
              <Text style={styles.text}> {event.name}</Text>
              <Text style={styles.date}> {event.dates?.start?.localDate}</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center"
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: "center"
  },
  eventBox: {
    backgroundColor: '#e5f0ff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  button: {
    backgroundColor: '#a9b7c2ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FavoritesScreen;
