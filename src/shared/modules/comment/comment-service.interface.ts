import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity, CreateCommentDto } from './index.js';
import { CommentStatistics } from './types/comment-statistics.type.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findById(commentId: string): Promise<DocumentType<CommentEntity> | null>;
  findByOfferId(offerId: string, limit?: number): Promise<DocumentType<CommentEntity>[]>;
  getOfferStatistics(offerId: string): Promise<CommentStatistics>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
