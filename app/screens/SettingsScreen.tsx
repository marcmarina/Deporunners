import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import Screen from 'components/common/Screen';

const SettingsScreen: FC = () => {
  return <Screen style={styles.container}></Screen>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20232A',
  },
});

export default SettingsScreen;
