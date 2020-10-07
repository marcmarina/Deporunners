import React, { FC } from 'react';
import {
  Text as RNText,
  StyleProp,
  TextStyle,
  TextProps as RNTextProps,
} from 'react-native';

export interface TextProps extends RNTextProps {
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
  ...other
}) => {
  return (
    <RNText
      style={[
        { fontFamily: `${fontFamily}-${fontWeight}`, color: '#f6f6f6' },
        style,
      ]}
      {...other}
    >
      {text}
    </RNText>
  );
};

export default Text;
