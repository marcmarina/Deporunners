import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  name: string;
  color: string;
  size: number;
  focused: boolean;
}

export default function TabBarIcon({ color, size, focused, name }: Props) {
  return (
    <MaterialCommunityIcons
      name={`${name}${focused ? '' : '-outline'}`}
      color={color}
      size={size}
    />
  );
}
