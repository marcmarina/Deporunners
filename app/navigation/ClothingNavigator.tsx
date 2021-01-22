import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ClothingScreen from 'screens/ClothingScreen';
import Clothing from 'interfaces/Clothing';
import ClothingDetailsScreen from 'screens/ClothingDetailsScreen';

export type ClothingStackParamList = {
  ClothingScreen: undefined;
  ClothingDetails: {
    clothing: Clothing;
  };
};

const Stack = createStackNavigator<ClothingStackParamList>();

const ClothingNavigator = () => (
  <Stack.Navigator initialRouteName="ClothingScreen">
    <Stack.Screen
      name="ClothingScreen"
      component={ClothingScreen}
      options={{ headerShown: true, headerTitle: 'Catàleg de roba' }}
    />
    <Stack.Screen
      name="ClothingDetails"
      component={ClothingDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ClothingNavigator;
