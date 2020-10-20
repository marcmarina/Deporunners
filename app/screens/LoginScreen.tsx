import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import Screen from '../components/common/Screen';
import Text from '../components/common/Text';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';
import useAuth from '../auth/useAuth';
import client from '../api/client';
import { head } from 'lodash';
import logger from '../logging/logger';

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

interface FormValues {
  username: string;
  password: string;
}

const initialValues = {
  username: '',
  password: '',
};

const LoginScreen: FunctionComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (
    { username, password }: FormValues,
    { setFieldValue }: FormikHelpers<FormValues>
  ) => {
    Keyboard.dismiss();
    try {
      setIsSubmitting(true);
      setErrorVisible(false);
      const { data, headers } = await client.post('/member/login', {
        username,
        password,
      });
      const refreshToken = headers['x-refresh-token'];
      setIsSubmitting(false);
      login(data, refreshToken);
    } catch (ex) {
      setIsSubmitting(false);
      if (ex?.response && ex.response.status === 400) {
        setErrorVisible(true);
        setErrorText('Les dades introduïdes no són valides');
      } else if (ex.code === 'ECONNABORTED') {
        setErrorVisible(true);
        setErrorText('Hi ha hagut un error connectant a la API');
      } else {
        logger.log(ex);
        console.log(ex);
      }
    }
  };

  return (
    <Screen
      style={{
        backgroundColor: '#20232A',
      }}
    >
      <View style={styles.container}>
        <Text text="Deporunners" fontWeight="700" style={styles.title} />
        <Text
          text="Benvingut/da al club!"
          fontWeight="500"
          style={styles.text}
        />
        <View style={styles.form}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ submitForm, values, setFieldValue }) => (
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
                <Button
                  disabled={isSubmitting}
                  color="secondary"
                  onPress={submitForm}
                  title="Iniciar Sessió"
                />
                <View style={styles.errorContainer}>
                  {errorVisible && (
                    <Text
                      style={styles.errorMessage}
                      text={errorText}
                      fontWeight="600"
                    />
                  )}
                </View>
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
  },
  title: {
    fontSize: 50,
  },
  errorContainer: {
    marginTop: 35,
    height: 35,
    justifyContent: 'center',
  },
  errorMessage: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'tomato',
    fontSize: 15,
  },
});

export default LoginScreen;
