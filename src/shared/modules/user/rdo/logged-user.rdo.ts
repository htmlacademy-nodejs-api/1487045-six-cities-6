import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user.type.js';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;

  @Expose()
  public type: UserType;
}
