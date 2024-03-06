import { PasswordLength } from '../../../constants.js';

export const LoginUserValidationMessage = {
  email: {
    invalid: 'Email is not valid',
  },
  password: {
    invalidFormat: 'Password should be a string',
    minLength: `Minimum password length must be ${PasswordLength.Min}`,
    maxLength: `Maximum password length must be ${PasswordLength.Max}`,
  },
};
