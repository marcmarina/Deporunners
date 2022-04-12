import { DefaultTheme, Theme } from '@react-navigation/native';
import { colors } from 'config';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#fafafa',
    background: colors.primary,
    card: colors.secondary,
    border: 'white',
  },
};

export default theme;
