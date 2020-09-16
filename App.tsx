import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import LoginScreen from './app/screens/LoginScreen';

export default function App() {
  const [user, setUser] = useState();
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
    // const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  // if (!isReady)
  //   return (
  //     <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} />
  //   );

  if (!fontsLoaded) return <AppLoading />;

  return <LoginScreen />;
}
