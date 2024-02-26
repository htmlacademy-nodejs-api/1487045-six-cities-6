import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';
import { Component, SortType } from '../../types/index.js';
import { CreateOfferDto, OfferEntity, OfferService, UpdateOfferDto } from './index.js';
import { inject, injectable } from 'inversify';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';

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

  private commentsLookup = [
    {
      $lookup: {
        from: 'comments',
        let: { offerId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
          {
            $group: {
              _id: null,
              averageRating: { $avg: '$rating' },
              commentsAmount: { $sum: 1 },
            },
          },
        ],
        as: 'comments',
      },
    },
    {
      $addFields: {
        id: { $toString: '$_id' },
        commentsAmount: { $arrayElemAt: ['$comments.commentsAmount', 0] },
        rating: { $arrayElemAt: ['$comments.averageRating', 0] },
      },
    },
    {
      $unset: 'comments',
    },
  ];

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.aggregate([
      {
        $match: { $expr: { $eq: ['$_id', { $toObjectId: offerId }] } },
      },
      ...this.commentsLookup,
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author',
        },
      },
    ]);

    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  public async findAll(limit = DEFAULT_OFFER_COUNT): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...this.commentsLookup,
        {
          $limit: limit,
        },
      ])
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('authorId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentsAmount: 1,
        },
      })
      .exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: offerId })) !== null;
  }

  public async findPremiumOffers(
    cityId: string,
    limit = DEFAULT_PREMIUM_OFFER_COUNT
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isPremium: true, cityId })
      .limit(limit)
      .sort({ publishDate: SortType.Down })
      .exec();
  }

  public async findFavoriteOffers(): Promise<DocumentType<OfferEntity>[]> {
    //TODO: Доделать получение Favorites
    //
    return this.offerModel.find();
  }
}
