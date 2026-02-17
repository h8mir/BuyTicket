import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoriteProvider } from './data/FavoriteContext';

import Home from './components/HomeScreen'; 
import Detail from './components/DetailScreen';
import Items from './components/Items';
import Favorite from './components/FavoritesScreen';

const Stack = createNativeStackNavigator();
 //burası zaten app.js burda sadece navigate yapısını oluşturuyoruz

export default function App() {

  return (
    <FavoriteProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{title: "Anasayfa", headerTitleAlign: 'center',}}/>
          <Stack.Screen name='Detail' component={Detail} options={{ headerTitleAlign: 'center' }}/>
          <Stack.Screen name='Items' component={Items} options={{title: "Hakkında", headerTitleAlign: 'center',}}/>
          <Stack.Screen name='Favorite' component={Favorite} options={{title: "Favoriler", headerTitleAlign: 'center',}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>

  );
}
