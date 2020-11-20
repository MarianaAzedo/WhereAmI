import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Currency from './src/Currency';
import Timeline from './src/Timeline';
import React from 'react';

const Stack = createStackNavigator();

export default function App() {
  //Navigations between Screens
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          option={{
            title: 'Welcome',
            headerTitleStyle: { alignSelf: 'center' },
          }}
        />
        <Stack.Screen name="Currency" component={Currency} />
        <Stack.Screen name="Timeline" component={Timeline} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
