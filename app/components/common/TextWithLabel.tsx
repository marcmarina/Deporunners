import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import Text, { TextProps } from './Text';

interface Props extends TextProps {
  label: string;
}

const TextWithLabel: FC<Props> = ({
  label,
  text,
  style,
  fontWeight = '400',
  fontFamily,
}) => {
  return (
    <View style={styles.container}>
      <Text text={label} style={style} />
      <Text
        text={text}
        style={style}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'row' },
});

export default TextWithLabel;
