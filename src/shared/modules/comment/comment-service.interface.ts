import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity, CreateCommentDto } from './index.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string, limit?: number): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
