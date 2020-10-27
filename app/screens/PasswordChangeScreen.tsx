import React, { FC, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { View, StyleSheet, Keyboard } from 'react-native';
import * as Yup from 'yup';

import Button from 'components/common/Button';
import Text from 'components/common/Text';
import TextInput from 'components/common/TextInput';
import client from 'api/client';
import logger from 'logging/logger';

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues: FormValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Obligatori'),
  newPassword: Yup.string().required('Obligatori'),
  confirmNewPassword: Yup.string().required('Obligatori'),
});

const PasswordChangeScreen: FC = () => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    Keyboard.dismiss();
    try {
      const { data } = await client.patch('/member/changepassword', values);
      resetForm();
      setSuccessVisible(true);
    } catch (ex) {
      logger.log(ex);
      console.log(ex);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          submitForm,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <View style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
            <TextInput
              placeholder="Contrasenya actual"
              icon="key"
              width="90%"
              style={{ opacity: 0.9 }}
              value={values.oldPassword}
              onChangeText={text => setFieldValue('oldPassword', text)}
              secureTextEntry
              keyboardType="default"
            />
            <TextInput
              placeholder="Nova contrasenya"
              icon="key"
              width="90%"
              style={{ opacity: 0.9 }}
              value={values.newPassword}
              onChangeText={text => setFieldValue('newPassword', text)}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirmar nova contrasenya"
              icon="key"
              width="90%"
              style={{ opacity: 0.9 }}
              value={values.confirmNewPassword}
              onChangeText={text => setFieldValue('confirmNewPassword', text)}
              secureTextEntry
            />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              color="secondary"
              onPress={submitForm}
              title="Canviar contrasenya"
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
            <View style={styles.errorContainer}>
              {successVisible && (
                <Text
                  style={styles.errorMessage}
                  text="La contrasenya s'ha canviat"
                  fontWeight="600"
                />
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 35,
    height: 35,
    justifyContent: 'center',
  },
  errorMessage: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    fontSize: 15,
  },
});

export default PasswordChangeScreen;
