import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import expoPushTokensApi from '../api/expoPushTokens';
import { useEffect } from 'react';
import navigation from '../navigation/rootNavigation';

const useNotifications = (notificationListener?: any) => {
  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
    } catch (error) {
      console.log('Error getting a push token', error);
    }
  };

  useEffect(() => {
    registerForPushNotifications();
    console.log('AAAAAAAAAAA');
    Notifications.addListener(notification => {
      if (notification.origin === 'selected') navigation.navigate('Events');
    });
  }, []);
};

export default useNotifications;
