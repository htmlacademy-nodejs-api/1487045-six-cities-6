import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity, UpdateOfferDto } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  findAll(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremiumOffers(cityId: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  findFavoriteOffers(limit?: number): Promise<DocumentType<OfferEntity>[]>;
}

// TODO:  Добавление/удаление оффера в/из избранное ?
