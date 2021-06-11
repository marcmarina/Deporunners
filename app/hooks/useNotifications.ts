import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import expoPushTokensApi from 'api/expoPushTokens';
import { useEffect } from 'react';
import navigation from 'navigation/rootNavigation';
import logger from 'logging/logger';

const useNotifications = () => {
  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      await expoPushTokensApi.register(token);
    } catch (error) {
      console.log(error);
      logger.log(error);
    }
  };

  useEffect(() => {
    registerForPushNotifications();
    Notifications.addListener(notification => {
      if (notification.origin === 'selected')
        navigation.navigate(notification.data.route, notification.data.params);
    });
  }, []);
};

export default useNotifications;
