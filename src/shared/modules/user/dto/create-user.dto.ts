import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { PasswordLength, UsernameLength } from '../../../constants.js';
import { UserType } from '../../../types/index.js';
import { CreateUserValidationMessage } from './create-user.messages.js';

export class CreateUserDto {
  @MinLength(UsernameLength.Min, { message: CreateUserValidationMessage.name.minLength })
  @MaxLength(UsernameLength.Max, { message: CreateUserValidationMessage.name.maxLength })
  public name: string;

  @IsEmail({}, { message: CreateUserValidationMessage.email.invalid })
  public email: string;

  @IsEnum(UserType, { message: CreateUserValidationMessage.type.invalid })
  public type: UserType;

  @IsString({ message: CreateUserValidationMessage.password.invalidFormat })
  @MinLength(PasswordLength.Min, { message: CreateUserValidationMessage.password.minLength })
  @MaxLength(PasswordLength.Max, { message: CreateUserValidationMessage.password.maxLength })
  public password: string;
}
