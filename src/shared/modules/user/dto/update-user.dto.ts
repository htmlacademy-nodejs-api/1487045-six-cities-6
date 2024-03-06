import { UserType } from '../../../types/user.type.js';

export class UpdateUserDto {
  public name?: string;
  public type?: UserType;
  public avatar?: string;
  public favorites?: string[];
}
