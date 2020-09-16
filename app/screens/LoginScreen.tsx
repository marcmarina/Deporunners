import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen from '../components/common/Screen';
import AppText from '../components/common/AppText';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const LoginScreen: FunctionComponent = () => {
  return (
    <Screen
      style={{
        backgroundColor: '#20232A',
      }}
    >
      <View style={styles.container}>
        <AppText
          text="Deporunners"
          fontFamily="Exo"
          fontWeight="700"
          style={styles.title}
        />
        <AppText
          text="Benvingut/da al club!"
          fontFamily="Exo"
          fontWeight="500"
          style={styles.text}
        />
        <View style={styles.form}>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}
          >
            {({ isValid, dirty, submitForm, values, setFieldValue }) => (
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <TextInput
                  placeholder="DNI o Email"
                  icon="email"
                  width="90%"
                  style={{ opacity: 0.9 }}
                  value={values.username}
                  onChangeText={text => setFieldValue('username', text)}
                  keyboardType="email-address"
                />
                <TextInput
                  value={values.password}
                  onChangeText={text => setFieldValue('password', text)}
                  placeholder="Contrasenya"
                  icon="lock"
                  width="90%"
                  style={{ opacity: 0.9 }}
                  secureTextEntry
                />
                {isValid && (
                  <Button
                    color="primary"
                    onPress={submitForm}
                    title="Iniciar Sessió"
                  />
                )}
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  form: {
    marginTop: 70,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: '#f6f6f6',
  },
  title: {
    fontSize: 50,
    color: '#f6f6f6',
  },
});

export default LoginScreen;
