import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EventsScreen from 'screens/EventsScreen';
import EventDetailsScreen from 'screens/EventDetailsScreen';
import Event from 'interfaces/Event';

export type EventsStackParamList = {
  EventDetails: {
    event: Event;
  };
  EventsList: undefined;
};

const Stack = createStackNavigator<EventsStackParamList>();

const EventsNavigator = () => (
  <Stack.Navigator
    initialRouteName="EventsList"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="EventsList" component={EventsScreen} />
    <Stack.Screen
      name="EventDetails"
      component={EventDetailsScreen}
      initialParams={{ event: undefined }}
    />
  </Stack.Navigator>
);

export default EventsNavigator;
