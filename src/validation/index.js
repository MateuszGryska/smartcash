import * as Yup from 'yup';

const phoneNumberRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const PasswordSectionSchema = Yup.object().shape({
  password: Yup.string()
    .required('The passoword is required.')
    .min(8, 'Too short. Password must be at least 8 characters.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.'),
});

export const ProfileDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The first name is required.'),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The last name is required.'),
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  phoneNumber: Yup.string()
    .matches(phoneNumberRegex, 'Phone number is not valid')
    .min(8, 'Too short.')
    .max(10, 'Too long.'),
  country: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    ),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string()
    .required('The passoword is required.')
    .min(8, 'Too short. Password must be at least 8 characters.'),
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string()
    .required('The passoword is required.')
    .min(8, 'Too short. Password must be at least 8 characters.'),
  firstName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The first name is required.'),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The last name is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.'),
});

export const ResetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
});
