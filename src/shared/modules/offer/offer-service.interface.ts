import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity, UpdateOfferDto } from './index.js';
import { CommentStatistics } from '../comment/types/comment-statistics.type.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findAll(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremiumOffers(city: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  updateOfferStatistics(
    offerId: string,
    statistics: CommentStatistics
  ): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
  checkUserPermisson(authorId: string, offerId: string): Promise<boolean>;
  findOffersByIds(offersIds: string[]): Promise<DocumentType<OfferEntity>[]>;
}
