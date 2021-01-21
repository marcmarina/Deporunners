import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/HomeScreen';
import colors from 'config/colors';
import TabBarIcon from 'components/common/TabBarIcon';
import EventsNavigator from './EventsNavigator';
import useNotifications from 'hooks/useNotifications';
import AccountNavigator from './AccountNavigator';
import ClothingNavigator from './ClothingNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator
      initialRouteName="Carnet"
      tabBarOptions={{
        activeBackgroundColor: colors.secondary,
        activeTintColor: colors.white,
        inactiveBackgroundColor: colors.primary,
        inactiveTintColor: colors.white,
        style: {
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Roba"
        component={ClothingNavigator}
        options={{
          tabBarIcon: props => <TabBarIcon name="account" {...props} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          tabBarIcon: props => <TabBarIcon name="calendar-month" {...props} />,
        }}
      />
      <Tab.Screen
        name="Carnet"
        component={HomeScreen}
        options={{
          tabBarIcon: props => (
            <TabBarIcon name="account-card-details" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Compte"
        component={AccountNavigator}
        options={{
          tabBarIcon: props => <TabBarIcon name="account" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
