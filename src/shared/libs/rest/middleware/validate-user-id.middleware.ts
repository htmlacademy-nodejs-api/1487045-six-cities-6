import { NextFunction, Request, Response } from 'express';
import { OfferService } from '../../../modules/offer/offer-service.interface.js';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class ValidateUserIdMiddleware implements Middleware {
  constructor(
    private readonly service: OfferService,
    private readonly entityName: string,
    private readonly paramName: string
  ) {}

  public async execute(
    { tokenPayload, params }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const documentId = params[this.paramName];

    if (!(await this.service.checkUserPermisson(tokenPayload.id, documentId))) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `Access to this ${this.entityName} is forbidden for user with id ${tokenPayload.id}`,
        'ValidateUserIdMiddleware'
      );
    }

    next();
  }
}
