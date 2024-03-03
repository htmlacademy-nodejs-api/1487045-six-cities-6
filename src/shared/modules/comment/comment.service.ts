import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_COMMENTS_AMOUNT } from './comment.constant.js';
import { CommentEntity, CommentService, CreateCommentDto } from './index.js';
import { CommentStatistics } from './types/comment-statistics.type.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);
    const result = await comment.populate(['authorId']);
    return result;
  }

  public async findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    const result = await this.commentModel.findById(commentId).populate('authorId');
    if (!result) {
      return null;
    }
    return result;
  }

  public async findByOfferId(
    offerId: string,
    limit = DEFAULT_COMMENTS_AMOUNT
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .limit(limit)
      .sort({ createdAt: SortType.Down })
      .populate(['authorId'])
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();
    return result.deletedCount;
  }

  public async getOfferStatistics(offerId: string): Promise<CommentStatistics> {
    const [{ rating, commentsAmount }] = await this.commentModel.aggregate([
      { $match: { offerId: new mongoose.Types.ObjectId(offerId) } },
      {
        $group: {
          _id: null,
          rating: { $avg: '$rating' },
          commentsAmount: { $sum: 1 },
        },
      },
    ]);

    return { rating: Number(rating.toFixed(2)), commentsAmount };
  }
}
