import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  name: string;
  size: number;
  backgroundColor: string;
  iconColor: string;
}

export default function Icon({
  name,
  size = 40,
  backgroundColor = 'black',
  iconColor = 'white',
}: Props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Feather name={name} color={iconColor} size={0.5 * size} />
    </View>
  );
}
