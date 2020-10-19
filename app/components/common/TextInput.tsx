import React, { FunctionComponent } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';

export interface TextInputProps extends RNTextInputProps {
  icon?: string;
  width: React.ReactText;
  placeholder: string;
  style: ViewStyle;
}

const TextInput: FunctionComponent<TextInputProps> = ({
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
      <RNTextInput
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
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: { marginRight: 10 },
  input: { width: '100%' },
});

export default TextInput;
