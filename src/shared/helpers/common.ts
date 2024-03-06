import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ApplicationError, ValidationErrorField } from '../libs/rest/index.js';
import { OfferEntity } from '../modules/offer/index.js';
import { UserEntity } from '../modules/user/index.js';

export function generateRandomNumber(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomNumber(0, items.length - 1);
  const endPosition = startPosition + generateRandomNumber(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomNumber(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : JSON.stringify(error);
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(
  errorType: ApplicationError,
  error: string,
  details: ValidationErrorField[] = []
) {
  return { errorType, error, details };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

export function fillFavorites(
  offers: OfferEntity[] | null,
  user: UserEntity | null
): OfferEntity[] | null {
  if (!user || !offers) {
    return offers;
  }
  return offers.map((offer) => {
    offer.isFavorite = user.favorites.includes(offer.id);
    return offer;
  });
}
