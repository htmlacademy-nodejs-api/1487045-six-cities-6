import dayjs from 'dayjs';
import { generateRandomNumber, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';

const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 100;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData
  ){}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs().subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.cities);
    const cityName = city.name;
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = Boolean(generateRandomNumber(0, 1));
    const isFavorite = Boolean(generateRandomNumber(0, 1));
    const rating = generateRandomNumber(MIN_RATING, MAX_RATING, 1);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomNumber(MIN_BEDROOMS, MAX_BEDROOMS);
    const guests = generateRandomNumber(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomNumber(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems(this.mockData.amenities).join(';');
    const author = Object.values(getRandomItem(this.mockData.authors)).join(';');
    const commentsAmount = generateRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    const location = `${city.location.latitude};${city.location.longitude}`;

    return [
      title,
      description,
      publishDate,
      cityName,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      guests,
      price,
      amenities,
      author,
      commentsAmount,
      location
    ].join('\t');
  }
}
