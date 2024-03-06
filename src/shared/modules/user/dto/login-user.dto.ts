import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginUserValidationMessage } from './login-user.messages.js';
import { PasswordLength } from '../../../constants.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserValidationMessage.email.invalid })
  public email: string;

  @IsString({ message: LoginUserValidationMessage.password.invalidFormat })
  @MinLength(PasswordLength.Min, { message: LoginUserValidationMessage.password.minLength })
  @MaxLength(PasswordLength.Max, { message: LoginUserValidationMessage.password.maxLength })
  public password: string;
}
