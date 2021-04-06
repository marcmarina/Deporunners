import colors from 'config/colors';
import React, { FunctionComponent } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import Text from './Text';

interface Props {
  value: number;
  minus: () => void;
  plus: () => void;
}

const NumberPicker: FunctionComponent<Props> = ({ value, minus, plus }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={minus}>
          <Icon
            name="minus"
            size={60}
            style={{
              borderRadius: 25,
              ...styles.button,
            }}
            backgroundColor={colors.medium}
          />
        </TouchableOpacity>
        <SquareText
          size={60}
          style={{
            borderRadius: 25,
            ...styles.button,
          }}
          text={value.toString()}
          textColor="white"
          backgroundColor={'gray'}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={plus}>
          <Icon
            name="plus"
            size={60}
            style={{
              borderRadius: 25,
              ...styles.button,
            }}
            backgroundColor={colors.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface SquareTextProps {
  text: string;
  textColor?: string;
  size: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

const SquareText: FunctionComponent<SquareTextProps> = ({
  text,
  textColor,
  size = 40,
  backgroundColor = colors.primary,
  style,
}) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text
        text={text}
        style={{
          color: textColor,
          fontSize: 35,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
  },
});

export default NumberPicker;
