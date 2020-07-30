import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const LoginScreen: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
      </View>
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
      <View style={styles.buttonContainer}>
        <Button
          color="primary"
          onPress={() => console.log('Test')}
          title="Log in"
          width="75%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    flex: 1,
  },
  buttonContainer: {
    padding: 40,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 175,
    height: 175,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
});

export default LoginScreen;
