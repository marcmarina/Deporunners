import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ClothingScreen from 'screens/ClothingScreen';

export type EventsStackParamList = {
  ClothingScreen: undefined;
};

const Stack = createStackNavigator<EventsStackParamList>();

const AccountNavigator = () => (
  <Stack.Navigator initialRouteName="ClothingScreen">
    <Stack.Screen
      name="ClothingScreen"
      component={ClothingScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
