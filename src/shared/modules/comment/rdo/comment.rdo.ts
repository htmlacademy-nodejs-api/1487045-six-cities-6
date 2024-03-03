import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose({ name: '_id' })
  @Type(() => String)
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'authorId' })
  @Type(() => UserRdo)
  public author: UserRdo;
}
