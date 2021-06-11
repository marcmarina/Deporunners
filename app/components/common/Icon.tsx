import React from 'react';
import { View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'config/colors';

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;
interface Props {
  name: IconName;
  size: number;
  backgroundColor?: string;
  iconColor?: string;
  style?: ViewStyle;
}

export default function Icon({
  name,
  size = 40,
  backgroundColor = colors.primary,
  iconColor = 'white',
  style,
}: Props) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={0.5 * size} />
    </View>
  );
}
