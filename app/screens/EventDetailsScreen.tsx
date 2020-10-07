import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../components/common/Screen';
import Text from '../components/common/Text';
import { EventsStackParamList } from '../navigation/EventsNavigator';

interface Props {
  route: RouteProp<EventsStackParamList, 'EventDetails'>;
}

const EventDetailsScreen: FC<Props> = ({ route }) => {
  const { event } = route.params;
  return (
    <Screen style={styles.container}>
      <Text text={event.name} style={styles.title} fontWeight="600" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 10,
  },
});

export default EventDetailsScreen;
