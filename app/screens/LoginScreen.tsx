import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from '../components/TextInput';

const LoginScreen: FunctionComponent = props => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="DNI o Email"
        icon="email"
        width="90%"
        style={{ opacity: 0.8 }}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contrasenya"
        icon="lock"
        width="90%"
        style={{ opacity: 0.8 }}
        secureTextEntry={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    flex: 1,
  },
});

export default LoginScreen;
