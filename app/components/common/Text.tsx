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
  fontFamily?: 'Exo' | 'Montserrat';
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
  fontSize?: number;
}

const Text: FC<TextProps> = ({
  text,
  style,
  fontFamily = 'Exo',
  fontWeight = 400,
  fontSize,
  ...other
}) => {
  return (
    <RNText
      style={[
        {
          fontFamily: `${fontFamily}-${fontWeight}`,
          color: '#f6f6f6',
          fontSize: fontSize,
        },
        style,
      ]}
      {...other}
    >
      {text}
    </RNText>
  );
};

export default Text;
