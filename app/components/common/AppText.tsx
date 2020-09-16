import React, { FC } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

interface Props {
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

const AppText: FC<Props> = ({
  text,
  style,
  fontFamily = 'Exo',
  fontWeight = 400,
}) => {
  return (
    <Text style={[{ fontFamily: `${fontFamily}-${fontWeight}` }, style]}>
      {text}
    </Text>
  );
};

export default AppText;
