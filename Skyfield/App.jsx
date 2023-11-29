import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Home';
import Details from './src/Details';
import Hourly from './src/Hourly';
import Daily from './src/Daily';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='Hourly' component={Hourly} />
        <Stack.Screen name='Daily' component={Daily} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}