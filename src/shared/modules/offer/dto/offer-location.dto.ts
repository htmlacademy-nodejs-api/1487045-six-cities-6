import { IsNumber } from 'class-validator';
import { CreateOfferValidationMessage } from '../index.js';

export class LocationDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: CreateOfferValidationMessage.location.latitude.invalidFormat }
  )
  public latitude: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: CreateOfferValidationMessage.location.longitude.invalidFormat }
  )
  public longitude: number;
}
