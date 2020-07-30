import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ViewStyle,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';

interface ScreenProps {
  children: any;
  style: ViewStyle;
  barStyle: 'dark-content' | 'default' | undefined | 'light-content';
}

export default function Screen({
  children,
  style,
  barStyle = 'dark-content',
}: ScreenProps) {
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
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
