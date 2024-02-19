import { Amenity, City, Location, OfferCreate, OfferType, User } from '../types/index.js';

export function createOffer(offerData: string): OfferCreate {
  const [
    title,
    description,
    createdDate,
    city,
    previewImage,
    images,
    isPremium,
    type,
    bedrooms,
    guests,
    price,
    amenities,
    author,
    location,
  ] = offerData.replace('\n', '').split('\t');

  const [latitude, longitude] = location.split(';');
  const [name, email, avatar, password, userType] = author.split(';');

  return {
    title,
    description,
    publishDate: new Date(createdDate),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium.toLowerCase() === 'true',
    type: type as OfferType,
    bedrooms: Number(bedrooms),
    guests: Number(guests),
    price: Number(price),
    amenities: amenities.split(';').map((item) => item.trim()) as Amenity[],
    author: {
      name,
      email,
      avatar,
      password,
      type: userType,
    } as User,
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    } as Location,
  };
}
