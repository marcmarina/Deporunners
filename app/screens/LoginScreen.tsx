import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen from 'components/common/Screen';
import Text from 'components/common/Text';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import useAuth from 'auth/useAuth';
import { http } from 'api';
import { logger } from 'logging';
import { useMutation } from 'react-query';

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
  const [errorText, setErrorText] = useState<string | null>(null);

  const loginMutation = useMutation(async (values: any) =>
    http.post('/member/login', values)
  );

  const { login } = useAuth();

  const handleSubmit = async ({ username, password }: FormValues) => {
    Keyboard.dismiss();
    try {
      setErrorText(null);
      const { data: authToken, headers } = await loginMutation.mutateAsync({
        username,
        password,
      });

      const refreshToken = headers['x-refresh-token'];
      login({ authToken, refreshToken });
    } catch (ex) {
      if (ex?.response?.status === 401) {
        setErrorText('Les dades introduïdes no són valides');
      } else if (ex.code === 'ECONNABORTED') {
        setErrorText('Hi ha hagut un error connectant a la API');
      } else {
        logger.log(ex);
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
            {({ submitForm, values, setFieldValue, isSubmitting }) => (
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <TextInput
                  placeholder="DNI o Email"
                  icon="email"
                  style={{ opacity: 0.9 }}
                  value={values.username}
                  onChangeText={(text) => setFieldValue('username', text)}
                  keyboardType="email-address"
                />
                <TextInput
                  value={values.password}
                  onChangeText={(text) => setFieldValue('password', text)}
                  placeholder="Contrasenya"
                  icon="lock"
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
                  {errorText && (
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
    width: '80%',
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
