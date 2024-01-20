import { Amenity } from './amenity.type.js';
import { City } from './city.enum.js';
import { Location } from './location.type.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publishDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  author: User;
  commentsAmount: number;
  location: Location;
};
