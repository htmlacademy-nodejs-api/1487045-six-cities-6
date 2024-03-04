import { Rating, CommentLength } from '../../../constants.js';

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'Text is required',
    minLength: `Minimum comment length must be ${CommentLength.Min}`,
    maxLength: `Maximum comment length must be ${CommentLength.Max}`,
  },
  rating: {
    invalidFormat: 'rating must be a number',
    minValue: `Minimum value must be ${Rating.Min}`,
    maxValue: `Maximum value must be ${Rating.Max}`,
  },
  authorId: {
    invalidFormat: 'authorId field must be a valid id',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
} as const;
