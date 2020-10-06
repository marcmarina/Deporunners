import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import Event from '../interfaces/Event';
import colors from '../config/colors';
import Text from './common/Text';

interface Props {
  event: Event;
}

const EventListItem: FC<Props> = ({ event }) => {
  return (
    <View style={styles.container}>
      <Text text={event.name} fontWeight="600" style={styles.name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.secondary,
    padding: 10,
    margin: 10,
  },
  name: {
    fontSize: 20,
  },
});

export default EventListItem;
