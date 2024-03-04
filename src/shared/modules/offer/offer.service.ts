import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';
import { Component, SortType } from '../../types/index.js';
import { CreateOfferDto, OfferEntity, OfferService, UpdateOfferDto } from './index.js';
import { inject, injectable } from 'inversify';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { CommentStatistics } from '../comment/types/comment-statistics.type.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findById(offerId).populate('authorId').exec();

    if (!result) {
      return null;
    }
    return result;
  }

  public async findAll(limit = DEFAULT_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel.find().limit(limit).sort({ createdAt: SortType.Down }).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('authorId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateOfferStatistics(
    offerId: string,
    statistics: CommentStatistics
  ): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findByIdAndUpdate(offerId, statistics).exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: offerId })) !== null;
  }

  public async findPremiumOffers(
    city: string,
    limit = DEFAULT_PREMIUM_OFFER_COUNT
  ): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .find({ isPremium: true, city })
      .limit(limit)
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async findFavoriteOffers(): Promise<DocumentType<OfferEntity>[]> {
    //TODO: Доделать получение Favorites
    //
    return await this.offerModel.find();
  }
}
