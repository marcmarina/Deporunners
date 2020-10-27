import React, { FC } from 'react';
import { useFormikContext } from 'formik';

import TextInput, { TextInputProps } from 'TextInput';
// import ErrorMessage from './ErrorMessage';

interface Props extends TextInputProps {
  name: string;
  width: React.ReactText;
}

const AppFormField: FC<Props> = ({ name, width, ...otherProps }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <TextInput
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChangeText={text => setFieldValue(name, text)}
        // value={values[name]}
        width={width}
      />
      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </>
  );
};

export default AppFormField;
