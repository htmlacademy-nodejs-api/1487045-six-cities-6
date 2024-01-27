import { Location } from './location.type.js';
import { User } from './user.type.js';

export type MockServerData = {
  titles: string[],
  descriptions: string[],
  cities: {
    name: string;
    location: Location
  }[],
  previewImages: string[],
  images: string[],
  types: string[],
  amenities: string[],
  authors: User[]
}
