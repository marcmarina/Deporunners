import React, { FunctionComponent } from 'react';
import { Text, TextStyle, TextProperties } from 'react-native';
import defaultStyles from '../config/styles';

interface AppTextProps {
  style: TextStyle;
  otherProps?: TextProperties;
}

const AppText: FunctionComponent<AppTextProps> = ({
  children,
  style,
  ...otherProps
}) => {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
