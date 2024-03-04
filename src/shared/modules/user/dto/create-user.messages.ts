import { PasswordLength, UsernameLength } from '../../../constants.js';

export const CreateUserValidationMessage = {
  name: {
    minLength: `Minimum name length must be ${UsernameLength.Min}`,
    maxLength: `Maximum name length must be ${UsernameLength.Max}`,
  },
  email: {
    invalid: 'Email is not valid',
  },
  avatar: {
    invalid: 'avatar should be a string',
  },
  type: {
    invalid: 'type must be a "Pro" or "Normal"',
  },
  password: {
    invalidFormat: 'Password should be a string',
    minLength: `Minimum password length must be ${PasswordLength.Min}`,
    maxLength: `Maximum password length must be ${PasswordLength.Max}`,
  },
};
