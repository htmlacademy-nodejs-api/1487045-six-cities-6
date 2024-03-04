import {
  BedroomsAmount,
  DescriptionLength,
  GuestsAmount,
  PriceRange,
  TitleLength,
} from '../../../constants.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${TitleLength.Min}`,
    maxLength: `Maximum title length must be ${TitleLength.Max}`,
  },
  description: {
    minLength: `Minimum description length must be ${DescriptionLength.Min}`,
    maxLength: `Maximum description length must be ${DescriptionLength.Max}`,
  },
  // publishDate: {
  //   invalidFormat: 'postDate must be a valid ISO date',
  // },
  city: {
    invalid: 'Invalid city',
  },
  previewImage: {
    invalidFormat: 'PreviewImage must be a string',
    maxLength: 'Too long for field «previewImage»',
  },
  images: {
    invalidFormat: 'Images must be an array of strings',
    maxLength: 'Too long for field «image»',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  type: {
    invalid: 'type must be an "Apartment" or "House" or "Room" or "Hotel"',
  },
  bedrooms: {
    invalidFormat: 'Bedrooms must be an integer',
    minValue: `Minimum bedrooms is ${BedroomsAmount.Min}`,
    maxValue: `Maximum bedrooms is ${BedroomsAmount.Max}`,
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: `Minimum guests is ${GuestsAmount.Min}`,
    maxValue: `Maximum guests is ${GuestsAmount.Max}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${PriceRange.Min}`,
    maxValue: `Maximum price is ${PriceRange.Max}`,
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array of strings',
  },
  authorId: {
    invalidId: 'authorId field must be a valid id',
  },
  location: {
    latitude: {
      invalidFormat: 'latitude coordinate is not valid',
    },
    longitude: {
      invalidFormat: 'longitude coordinate is not valid',
    },
  },
} as const;
