import React, { FC } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Text from '../components/common/Text';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import useAuth from '../auth/useAuth';

const AccountScreen: FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Tancar Sessió?', 'Confirmar', [
      { text: 'No' },
      { text: 'Si', onPress: logout },
    ]);
  };
  return (
    <Screen style={styles.container}>
      <Text text="Compte" />
      <Button
        title="Tancar sessió"
        onPress={handleLogout}
        color="secondary"
        style={{
          backgroundColor: 'tomato',
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
});

export default AccountScreen;
