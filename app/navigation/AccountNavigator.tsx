import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from 'screens/AccountScreen';
import PasswordChangeScreen from 'screens/PasswordChangeScreen';

export type EventsStackParamList = {
  AccountScreen: undefined;
  PasswordChange: undefined;
};

const Stack = createStackNavigator<EventsStackParamList>();

const AccountNavigator = () => (
  <Stack.Navigator initialRouteName="AccountScreen">
    <Stack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PasswordChange"
      component={PasswordChangeScreen}
      options={{ title: 'Canviar Contrasenya' }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
