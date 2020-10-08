import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import AppNavigator from './app/navigation/AppNavigator';
import LoginScreen from './app/screens/LoginScreen';
import { getMember } from './app/auth/storage';
import Member from './app/interfaces/Member';
import AuthContext from './app/auth/context';
import navigationTheme from './app/navigation/navigationTheme';

export default function App() {
  const [member, setMember] = useState<Member>();
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'RobotoSlab-100': require('./app/assets/fonts/RobotoSlab/RobotoSlab-100.ttf'),
    'RobotoSlab-200': require('./app/assets/fonts/RobotoSlab/RobotoSlab-200.ttf'),
    'RobotoSlab-300': require('./app/assets/fonts/RobotoSlab/RobotoSlab-300.ttf'),
    'RobotoSlab-400': require('./app/assets/fonts/RobotoSlab/RobotoSlab-400.ttf'),
    'RobotoSlab-500': require('./app/assets/fonts/RobotoSlab/RobotoSlab-500.ttf'),
    'RobotoSlab-600': require('./app/assets/fonts/RobotoSlab/RobotoSlab-600.ttf'),
    'RobotoSlab-700': require('./app/assets/fonts/RobotoSlab/RobotoSlab-700.ttf'),
    'RobotoSlab-800': require('./app/assets/fonts/RobotoSlab/RobotoSlab-800.ttf'),
    'RobotoSlab-900': require('./app/assets/fonts/RobotoSlab/RobotoSlab-900.ttf'),
    'Exo-100': require('./app/assets/fonts/Exo/Exo-100.ttf'),
    'Exo-200': require('./app/assets/fonts/Exo/Exo-200.ttf'),
    'Exo-300': require('./app/assets/fonts/Exo/Exo-300.ttf'),
    'Exo-400': require('./app/assets/fonts/Exo/Exo-400.ttf'),
    'Exo-500': require('./app/assets/fonts/Exo/Exo-500.ttf'),
    'Exo-600': require('./app/assets/fonts/Exo/Exo-600.ttf'),
    'Exo-700': require('./app/assets/fonts/Exo/Exo-700.ttf'),
    'Exo-800': require('./app/assets/fonts/Exo/Exo-800.ttf'),
    'Exo-900': require('./app/assets/fonts/Exo/Exo-900.ttf'),
  });

  const restoreToken = async () => {
    const member = await getMember();
    if (member) {
      setMember(member);
    }
    setIsReady(true);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} />
    );

  if (!fontsLoaded) return null;

  return (
    <AuthContext.Provider value={{ member, setMember }}>
      <NavigationContainer theme={navigationTheme}>
        {member ? <AppNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
