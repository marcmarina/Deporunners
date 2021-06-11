import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import AppNavigator from 'navigation/AppNavigator';
import LoginScreen from 'screens/LoginScreen';
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
} from 'auth/storage';
import Member from 'interfaces/Member';
import AuthContext from 'auth/context';
import navigationTheme from 'navigation/navigationTheme';
import { navigationRef } from 'navigation/rootNavigation';
import client from 'api/client';
import logger from 'logging/logger';

import { DeviceEventEmitter } from 'react-native';

export default function App() {
  const [member, setMember] = useState<Member>();
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Exo-100': require('assets/fonts/Exo/Exo-100.ttf'),
    'Exo-200': require('assets/fonts/Exo/Exo-200.ttf'),
    'Exo-300': require('assets/fonts/Exo/Exo-300.ttf'),
    'Exo-400': require('assets/fonts/Exo/Exo-400.ttf'),
    'Exo-500': require('assets/fonts/Exo/Exo-500.ttf'),
    'Exo-600': require('assets/fonts/Exo/Exo-600.ttf'),
    'Exo-700': require('assets/fonts/Exo/Exo-700.ttf'),
    'Exo-800': require('assets/fonts/Exo/Exo-800.ttf'),
    'Exo-900': require('assets/fonts/Exo/Exo-900.ttf'),
    'Montserrat-100': require('assets/fonts/Montserrat/Montserrat-100.ttf'),
    'Montserrat-200': require('assets/fonts/Montserrat/Montserrat-200.ttf'),
    'Montserrat-300': require('assets/fonts/Montserrat/Montserrat-300.ttf'),
    'Montserrat-400': require('assets/fonts/Montserrat/Montserrat-400.ttf'),
    'Montserrat-500': require('assets/fonts/Montserrat/Montserrat-500.ttf'),
    'Montserrat-600': require('assets/fonts/Montserrat/Montserrat-600.ttf'),
    'Montserrat-700': require('assets/fonts/Montserrat/Montserrat-700.ttf'),
    'Montserrat-800': require('assets/fonts/Montserrat/Montserrat-800.ttf'),
    'Montserrat-900': require('assets/fonts/Montserrat/Montserrat-900.ttf'),
  });

  logger.start();

  DeviceEventEmitter.addListener('userUnauthorized', async () => {
    removeRefreshToken();
    removeToken();
    setMember(undefined);
  });

  const restoreMember = async () => {
    try {
      if ((await getToken()) && (await getRefreshToken())) {
        const res = await client.get('/member/self');
        if (res) {
          setMember(res.data);
        }
      }
    } catch (ex) {
      logger.log(ex);
    }
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreMember}
        onFinish={() => setIsReady(true)}
        onError={logger.log}
      />
    );

  if (!fontsLoaded) return null;

  return (
    <AuthContext.Provider value={{ member, setMember }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {member ? <AppNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
