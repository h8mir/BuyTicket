import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';
import React,{ useState, useLayoutEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import { FavoriteContext } from '../data/FavoriteContext';
import MapView from 'react-native-maps';

const DetailScreen = () => {
  const navigation = useNavigation();
  
  const route = useRoute();
  
  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=37.0662,37.3833`;
    Linking.openURL(url);
  };
  
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const data = route.params?.data;
  const isFav = favorites[data.id] || false;

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            toggleFavorite(data.id); // sadece bunu çağır yeterli
            Alert.alert(!isFav ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı');
          }}
          style={{
            backgroundColor: isFav ? '#fab20aff' : '#f2f2f2',
            borderRadius: 20,
            padding: 6,
            marginRight: 10,
          }}
        >
          <Ionicons
            name={isFav ? 'star' : 'star-outline'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFav]);

  return (
    <View style={styles.container}>
      <Image
              resizeMode='cover'
              style={{width: 200, height:200, borderWidth:2}}
              source={require('../src/basketball.jpg')}
              />
      <Text style={styles.name}>{isFav ? '★ ' : ' '}{data.name}</Text>
      <ScrollView>
        <Text style={styles.date}>{data.dates?.start?.localDate}</Text>
        <Text style={styles.desc}>Organizasyon konumu: </Text>
        <TouchableOpacity onPress={openInMaps}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.0662,
            longitude: 37.3833,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />
        </TouchableOpacity>
        <Text style={styles.desc}>Açıklama:{"\n"}{data.info}</Text>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8"
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20
  },
  date: {
    fontSize: 18,
    color: "gray",
    marginVertical: 10
  },
  desc: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth:2
  }
});


export default DetailScreen