import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  BedroomsAmount,
  DescriptionLength,
  GuestsAmount,
  IMAGE_URL_MAX_LENGTH,
  PriceRange,
  TitleLength,
} from '../../../constants.js';
import { Amenity, City, OfferType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { LocationDto } from './offer-location.dto.js';

export class CreateOfferDto {
  @MinLength(TitleLength.Min, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(TitleLength.Max, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(DescriptionLength.Min, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(DescriptionLength.Max, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsString({ message: CreateOfferValidationMessage.previewImage.invalidFormat })
  @MaxLength(IMAGE_URL_MAX_LENGTH, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsString({ each: true, message: CreateOfferValidationMessage.images.invalidFormat })
  @MaxLength(IMAGE_URL_MAX_LENGTH, {
    each: true,
    message: CreateOfferValidationMessage.images.maxLength,
  })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(BedroomsAmount.Min, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(BedroomsAmount.Max, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(GuestsAmount.Min, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(GuestsAmount.Max, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(PriceRange.Min, { message: CreateOfferValidationMessage.price.minValue })
  @Max(PriceRange.Max, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsString({ each: true, message: CreateOfferValidationMessage.amenities.invalidFormat })
  public amenities: Amenity[];

  public authorId: string;

  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;
}
