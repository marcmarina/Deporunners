import { useCart } from 'hooks/useCart';
import React from 'react';
import { View } from 'react-native';
import Text from './common/Text';

export default function CartIcon() {
  const { items } = useCart();

  if (!items) return null;

  return (
    <View>
      {items.length === 0 ? (
        <Text text="No Items" />
      ) : (
        <Text text={items.length.toString()} />
      )}
    </View>
  );
}
