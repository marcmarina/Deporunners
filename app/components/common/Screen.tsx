import React, { FC } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ViewStyle,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';

interface Props {
  style?: ViewStyle;
  barStyle?: 'dark-content' | 'light-content' | 'default';
}

const Screen: FC<Props> = ({ children, style, barStyle = 'light-content' }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle}
      />
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
