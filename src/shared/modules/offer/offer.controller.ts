import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { fillDTO } from '../../helpers/common.js';
import { Logger } from '../../libs/logger/index.js';
import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import {
  CreateOfferDto,
  OfferPreviewRdo,
  OfferRdo,
  OfferService,
  UpdateOfferDto,
} from './index.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { UpdateOfferRequest } from './types/update-offer-request.type.js';
import { StatusCodes } from 'http-status-codes';
import { ParamOfferId } from './types/param-offerid.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)],
    });

    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    //TODO: this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    //TODO: добавить маршрут для добавления/удаления оффера в/из favorites (path: '/favorites?offerId=123' или '/:offerId/favorites' ?)
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAll();
    const responseData = fillDTO(OfferPreviewRdo, offers);
    this.ok(res, responseData);
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    const responseData = fillDTO(OfferRdo, offer);
    this.created(res, responseData);
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async update({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.updateById(String(params.offerId), body);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    await this.offerService.deleteById(params.offerId);
    this.noContent(res, null);
  }

  public async getPremiumOffers({ query }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumOffers(query.city as string);
    const responseData = fillDTO(OfferPreviewRdo, offers);
    this.ok(res, responseData);
  }

  public async getComments({ params }: Request, res: Response): Promise<void> {
    if (!(await this.offerService.exists(params.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }
}
