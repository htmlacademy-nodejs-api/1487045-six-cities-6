import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
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
import { LocationDto } from './offer-location.dto.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(TitleLength.Min, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(TitleLength.Max, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(DescriptionLength.Min, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(DescriptionLength.Max, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  // @IsOptional()
  // public publishDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.previewImage.invalidFormat })
  @MaxLength(IMAGE_URL_MAX_LENGTH, { message: UpdateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsString({ each: true, message: UpdateOfferValidationMessage.images.invalidFormat })
  @MaxLength(IMAGE_URL_MAX_LENGTH, {
    each: true,
    message: UpdateOfferValidationMessage.images.maxLength,
  })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: UpdateOfferValidationMessage.type.invalid })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(BedroomsAmount.Min, { message: UpdateOfferValidationMessage.bedrooms.minValue })
  @Max(BedroomsAmount.Max, { message: UpdateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.guests.invalidFormat })
  @Min(GuestsAmount.Min, { message: UpdateOfferValidationMessage.guests.minValue })
  @Max(GuestsAmount.Max, { message: UpdateOfferValidationMessage.guests.maxValue })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(PriceRange.Min, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(PriceRange.Max, { message: UpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsString({ each: true, message: UpdateOfferValidationMessage.amenities.invalidFormat })
  public amenities?: Amenity[];

  @IsOptional()
  @IsMongoId({ message: UpdateOfferValidationMessage.authorId.invalidId })
  public authorId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  public location?: LocationDto;
}
