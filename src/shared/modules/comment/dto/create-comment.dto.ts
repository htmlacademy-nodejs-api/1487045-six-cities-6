import { IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CommentLength, Rating } from '../../../constants.js';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @MinLength(CommentLength.Min, { message: CreateCommentMessages.text.minLength })
  @MaxLength(CommentLength.Max, { message: CreateCommentMessages.text.maxLength })
  public text: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(Rating.Min, { message: CreateCommentMessages.rating.minValue })
  @Max(Rating.Max, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentMessages.authorId.invalidFormat })
  public authorId: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;
}
