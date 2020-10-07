import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import openMap from 'react-native-open-maps';
import { useNavigation } from '@react-navigation/native';

import Event from '../interfaces/Event';
import colors from '../config/colors';
import Text from './common/Text';

interface Props {
  event: Event;
}

const EventListItem: FC<Props> = ({ event }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('EventDetails', { event })}
    >
      <View style={styles.container}>
        <Text text={event.name} fontWeight="600" style={styles.name} />
        <Text
          text={dayjs(event.dateTime).format('DD/MM/YYYY HH:MM:ss')}
          fontWeight="500"
          style={styles.dateTime}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.secondary,
    padding: 10,
  },
  dateTime: {
    fontSize: 15,
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
});

const goToMap = (coordinates: string) => {
  const [latitude, longitude] = coordinates.replace(/,/g, '').split(' ');
  openMap({
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    zoom: 50,
  });
};

export default EventListItem;
