import dayjs from 'dayjs';
import { generateRandomNumber, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { BedroomsAmount, GuestsAmount, PriceRange } from '../../constants.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = dayjs()
      .subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const cityName = city.name;
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = Boolean(generateRandomNumber(0, 1));
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomNumber(BedroomsAmount.Min, BedroomsAmount.Max);
    const guests = generateRandomNumber(GuestsAmount.Min, GuestsAmount.Max);
    const price = generateRandomNumber(PriceRange.Min, PriceRange.Max);
    const amenities = getRandomItems(this.mockData.amenities).join(';');
    const author = Object.values(getRandomItem(this.mockData.authors)).join(';');
    const location = `${city.location.latitude};${city.location.longitude}`;

    return [
      title,
      description,
      publishDate,
      cityName,
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
    ].join('\t');
  }
}
