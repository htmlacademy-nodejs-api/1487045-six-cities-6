/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { Amenity, City, Location, OfferType } from '../../types/index.js';
import {
  DescriptionLength,
  BedroomsAmount,
  GuestsAmount,
  PriceRange,
  TitleLength,
  Rating,
} from '../../constants.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: TitleLength.Min,
    maxlength: TitleLength.Max,
  })
  public title: string;

  @prop({
    required: true,
    trim: true,
    minlength: DescriptionLength.Min,
    maxlength: DescriptionLength.Max,
  })
  public description: string;

  @prop({ required: true, type: () => String, enum: City })
  public city!: City;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true, type: () => [String], default: [] })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: false })
  public isFavorite!: boolean;

  @prop({ min: Rating.Min, max: Rating.Max, default: null })
  public rating: number;

  @prop({ required: true, type: () => String, enum: OfferType })
  public type!: OfferType;

  @prop({ required: true, min: BedroomsAmount.Min, max: BedroomsAmount.Max })
  public bedrooms: number;

  @prop({ required: true, min: GuestsAmount.Min, max: GuestsAmount.Max })
  public guests: number;

  @prop({ required: true, min: PriceRange.Min, max: PriceRange.Max })
  public price: number;

  @prop({ required: true, type: () => [String], default: [] })
  public amenities: Amenity[];

  @prop({ default: 0 })
  public commentsAmount: number;

  @prop({ required: true, ref: UserEntity })
  public authorId: Ref<UserEntity>;

  @prop({ required: true })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
