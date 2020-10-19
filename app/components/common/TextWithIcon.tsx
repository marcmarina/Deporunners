import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from './Icon';
import Text from './Text';

interface Props {
  text: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  size: number;
}

const TextWithIcon: FC<Props> = ({
  text,
  icon,
  iconBgColor,
  iconColor,
  size,
}) => {
  return (
    <View style={styles.container}>
      <Icon
        backgroundColor={iconBgColor}
        iconColor={iconColor}
        name={icon}
        size={size}
      />
      <Text text={text} fontWeight="500" style={styles.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TextWithIcon;
