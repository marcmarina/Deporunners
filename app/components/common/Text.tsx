import React, { FC } from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

export interface TextProps {
  text: string;
  style?: StyleProp<TextStyle>;
  fontFamily?: 'RobotoSlab' | 'Exo';
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const Text: FC<TextProps> = ({
  text,
  style,
  fontFamily = 'Exo',
  fontWeight = 400,
}) => {
  return (
    <RNText
      style={[
        { fontFamily: `${fontFamily}-${fontWeight}`, color: '#f6f6f6' },
        style,
      ]}
    >
      {text}
    </RNText>
  );
};

export default Text;
