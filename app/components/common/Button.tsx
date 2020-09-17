import React, { FunctionComponent } from 'react';
import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import AppText from '../common/Text';
import colors from '../../config/colors';

interface Props extends ButtonProps {
  style?: ViewStyle;
  width?: React.ReactText;
}

const Button: FunctionComponent<Props> = ({
  title,
  onPress,
  color = 'primary',
  style,
  width,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color], width: width },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 5,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Button;
