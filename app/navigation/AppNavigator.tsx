import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/HomeScreen';
import { colors } from 'config';
import TabBarIcon from 'components/common/TabBarIcon';
import EventsNavigator from './EventsNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
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
        name="Events"
        component={EventsNavigator}
        options={{
          tabBarIcon: (props) => (
            <TabBarIcon name="calendar-month" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Carnet"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <TabBarIcon name="card-account-details" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Compte"
        component={AccountNavigator}
        options={{
          tabBarIcon: (props) => <TabBarIcon name="account" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
