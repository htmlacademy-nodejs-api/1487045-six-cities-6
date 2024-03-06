import { Expose } from 'class-transformer';
import { City, OfferType } from '../../../types/index.js';

export class OfferPreviewRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose({ name: 'createdAt' })
  public publishDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: OfferType;

  @Expose()
  public price: number;

  @Expose()
  public commentsAmount: number;
}
