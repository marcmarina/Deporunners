import React, { FunctionComponent } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

interface Props {
  icon?: string;
  width: React.ReactText;
  placeholder: string;
  style: ViewStyle;
  [x: string]: any;
}

const AppTextInput: FunctionComponent<Props> = ({
  icon,
  width,
  style,
  placeholder,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { width: width }, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={styles.input}
        placeholder={placeholder}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: { marginRight: 10 },
  input: { width: '100%' },
});

export default AppTextInput;
