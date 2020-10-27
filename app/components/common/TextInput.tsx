import React, { FunctionComponent, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'config/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export interface TextInputProps extends RNTextInputProps {
  icon?: string;
  width?: React.ReactText;
  style: ViewStyle;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  icon,
  width = '100%',
  style,
  placeholder,
  secureTextEntry,
  ...otherProps
}) => {
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.container, { width: width }, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.leftIcon}
        />
      )}
      <RNTextInput
        placeholderTextColor={colors.medium}
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secure}
        {...otherProps}
      />
      {secureTextEntry && (
        <TouchableWithoutFeedback onPress={() => setSecure(!secure)}>
          <MaterialCommunityIcons
            name={`eye${secure ? '' : '-off'}`}
            size={20}
            color={colors.medium}
            style={styles.rightIcon}
          />
        </TouchableWithoutFeedback>
      )}
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
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
  },
});

export default TextInput;
