import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Amenities, City, Location, Offer, OfferType, User } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, previewImage, images, isPremium, isFavorite, rating, type, bedrooms, guests, price, amenities, author, commentsAmount, location]) => {
        const [latitude, longitude] = location.split(';');
        const [name, email, avatar, password, userType ] = author.split(';');

        return {
          title,
          description,
          publishDate: new Date(createdDate),
          city: city as City,
          previewImage,
          images: images.split(';'),
          isPremium: isPremium.toLowerCase() === 'true',
          isFavorite: isFavorite.toLowerCase() === 'true',
          rating: Number.parseFloat(rating),
          type: type as OfferType,
          bedrooms: Number(bedrooms),
          guests: Number(guests),
          price: Number(price),
          amenities: amenities.split(',').map((item) => item.trim()) as Amenities[],
          author: {
            name,
            email,
            avatar,
            password,
            type: userType
          } as User,
          commentsAmount: Number(commentsAmount),
          location: {
            latitude: Number.parseFloat(latitude),
            longitude: Number.parseFloat(longitude)
          } as Location
        };
      });
  }
}
