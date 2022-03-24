import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid'),
  password: yup.string().required('Password is required'),
});
