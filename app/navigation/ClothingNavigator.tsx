import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ClothingScreen from 'screens/ClothingScreen';
import Clothing from 'interfaces/Clothing';
import ClothingDetailsScreen from 'screens/ClothingDetailsScreen';
import CartIcon from 'components/CartIcon';
import { CartContext } from 'hooks/useCart';

export type ClothingStackParamList = {
  ClothingScreen: undefined;
  ClothingDetails: {
    clothing: Clothing;
  };
};

const Stack = createStackNavigator<ClothingStackParamList>();

const ClothingNavigator = () => {
  const [items, setItems] = useState<Clothing[]>([]);
  return (
    <CartContext.Provider value={{ items, setItems }}>
      <Stack.Navigator initialRouteName="ClothingScreen">
        <Stack.Screen
          name="ClothingScreen"
          component={ClothingScreen}
          options={{
            headerShown: true,
            headerTitle: 'Catàleg de roba',
            headerRight: CartIcon,
          }}
        />
        <Stack.Screen
          name="ClothingDetails"
          component={ClothingDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </CartContext.Provider>
  );
};
export default ClothingNavigator;
