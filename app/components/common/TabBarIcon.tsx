import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconName } from './Icon';

interface Props {
  name: IconName;
  color: string;
  size: number;
  focused: boolean;
}

export default function TabBarIcon({ color, size, focused, name }: Props) {
  return (
    <MaterialCommunityIcons
      name={`${name}${focused ? '' : '-outline'}` as IconName}
      color={color}
      size={size}
    />
  );
}
