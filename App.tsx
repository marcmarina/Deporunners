import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import AppNavigator from './app/navigation/AppNavigator';
import LoginScreen from './app/screens/LoginScreen';
import { getRefreshToken, getToken } from './app/auth/storage';
import Member from './app/interfaces/Member';
import AuthContext from './app/auth/context';
import navigationTheme from './app/navigation/navigationTheme';
import { navigationRef } from './app/navigation/rootNavigation';
import client from './app/api/client';
import logger from './app/logging/logger';

export default function App() {
  const [member, setMember] = useState<Member>();
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Exo-100': require('./app/assets/fonts/Exo/Exo-100.ttf'),
    'Exo-200': require('./app/assets/fonts/Exo/Exo-200.ttf'),
    'Exo-300': require('./app/assets/fonts/Exo/Exo-300.ttf'),
    'Exo-400': require('./app/assets/fonts/Exo/Exo-400.ttf'),
    'Exo-500': require('./app/assets/fonts/Exo/Exo-500.ttf'),
    'Exo-600': require('./app/assets/fonts/Exo/Exo-600.ttf'),
    'Exo-700': require('./app/assets/fonts/Exo/Exo-700.ttf'),
    'Exo-800': require('./app/assets/fonts/Exo/Exo-800.ttf'),
    'Exo-900': require('./app/assets/fonts/Exo/Exo-900.ttf'),
    'Montserrat-100': require('./app/assets/fonts/Montserrat/Montserrat-100.ttf'),
    'Montserrat-200': require('./app/assets/fonts/Montserrat/Montserrat-200.ttf'),
    'Montserrat-300': require('./app/assets/fonts/Montserrat/Montserrat-300.ttf'),
    'Montserrat-400': require('./app/assets/fonts/Montserrat/Montserrat-400.ttf'),
    'Montserrat-500': require('./app/assets/fonts/Montserrat/Montserrat-500.ttf'),
    'Montserrat-600': require('./app/assets/fonts/Montserrat/Montserrat-600.ttf'),
    'Montserrat-700': require('./app/assets/fonts/Montserrat/Montserrat-700.ttf'),
    'Montserrat-800': require('./app/assets/fonts/Montserrat/Montserrat-800.ttf'),
    'Montserrat-900': require('./app/assets/fonts/Montserrat/Montserrat-900.ttf'),
  });

  logger.start();

  const restoreMember = async () => {
    try {
      if ((await getToken()) && (await getRefreshToken())) {
        const { data } = await client.get('/member/self');
        setMember(data);
      }
    } catch (ex) {
      if (ex.response.status !== 401) {
        logger.log(ex);
        console.log(ex);
      }
    }
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreMember}
        onFinish={() => setIsReady(true)}
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
