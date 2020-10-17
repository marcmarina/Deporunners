import React, { FunctionComponent } from 'react';
import {
  ButtonProps,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Text from '../common/Text';
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
      <Text text={title} fontWeight="700" style={styles.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
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
  },
});

export default Button;
