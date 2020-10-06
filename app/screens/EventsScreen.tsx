import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../components/common/Text';
import Screen from '../components/common/Screen';

const EventsScreen: FC = () => {
  return (
    <Screen style={styles.container}>
      <Text text="Events" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#20232A',
  },
});

export default EventsScreen;
