import React, { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { ObjectSchema } from 'yup';

interface Props {
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  initialValues: any;
  validationSchema: ObjectSchema;
}

const Form: FC<Props> = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default Form;
