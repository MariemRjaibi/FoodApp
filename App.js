import 'react-native-gesture-handler'; // https://reactnavigation.org/docs/drawer-navigator#installation

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';
import SearchScreen from './screens/SearchScreen';
import MyRecipesScreen from './screens/MyRecipesScreen';
import Header from './components/Header';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favorites from './reducers/favorites';

const store = configureStore({
  reducer: { favorites },
});

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      header: (props) => <Header {...props} />,
      drawerActiveTintColor: '#655074',
      drawerType: 'back',
    }}>
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="My recipes" component={MyRecipesScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Recipe" component={RecipeScreen} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
