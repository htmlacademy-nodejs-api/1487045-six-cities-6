import { inject, injectable } from 'inversify';
import { CommentEntity, CommentService, CreateCommentDto } from './index.js';
import { Component } from '../../types/component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';
import { DEFAULT_COMMENTS_AMOUNT } from './comment.constant.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);

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
}