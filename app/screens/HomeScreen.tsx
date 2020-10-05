import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../components/common/Screen';
import Text from '../components/common/Text';
import Button from '../components/common/Button';
import useAuth from '../auth/useAuth';

const LoginScreen: FunctionComponent = () => {
  const { logout, member } = useAuth();

  return (
    <Screen style={styles.container}>
      <Text text={JSON.stringify(member)} style={styles.title} />
      <Button title="Log Out" onPress={() => logout()} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20232A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
  },
});

export default LoginScreen;
