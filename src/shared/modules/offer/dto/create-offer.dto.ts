import { Amenity, City, Location, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  // public publishDate: Date;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public type: OfferType;
  public bedrooms: number;
  public guests: number;
  public price: number;
  public amenities: Amenity[];
  public authorId: string;
  public location: Location;
}
