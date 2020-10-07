import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
      <ScrollView>
        <Text text={event.name} style={styles.title} fontWeight="600" />
        <Text
          text={dayjs(event.dateTime).format('DD/MM/YYYY\nHH:MM')}
          style={styles.dateTime}
          fontWeight="600"
        />
        <Text
          text={event.description}
          style={styles.description}
          fontWeight="400"
        />
      </ScrollView>
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
  dateTime: { fontSize: 20, alignSelf: 'center', textAlign: 'center' },
  description: {
    fontSize: 18,
    padding: 8,
  },
});

export default EventDetailsScreen;
