import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React,{useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { FavoriteContext } from '../data/FavoriteContext';

const Items = ({item}) => {
  
  const navigation = useNavigation();
  const { favorites } = useContext(FavoriteContext); 
  
  const isFav = favorites[item.id];

  return (
    <View style={[styles.container, { backgroundColor: isFav ? '#fab20aff' : '#d8d8d8' }]}>
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate("Detail", {data: item})}>
        <Image
        resizeMode='cover'
        style={{width: 75, height:75, borderWidth:2}}
        source={require('../src/ebru.jpg')}
        />
        <Text style={styles.text}>{isFav ? '★ ' : ' '}{item.name}</Text>
        <Text style={[styles.text,styles.text2]}>  {item.date}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        padding:30,
        borderBottomWidth:1,
        flexDirection:"row"
    },
    text:{
        fontSize:18
    },
    text2:{
        color:"rgba(226, 194, 13, 1)",
        backgroundColor:"rgb(0,0,0)",
        borderWidth:1,
        fontWeight:"bold"
    },
    touchable: {
    flexDirection: "row", 
    alignItems: "center",  
    gap: 10 }
})

export default Items