import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { fillDTO, fillFavorites } from '../../helpers/common.js';
import { Logger } from '../../libs/logger/index.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  ValidateUserIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import {
  CreateOfferDto,
  OfferPreviewRdo,
  OfferRdo,
  OfferService,
  UpdateOfferDto,
} from './index.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { UpdateOfferRequest } from './types/update-offer-request.type.js';
import { UserService } from '../user/user-service.interface.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)],
    });

    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavoriteOffers,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateUserIdMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateUserIdMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Patch,
      handler: this.addToFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.deleteFromFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findAll();
    const user = tokenPayload ? await this.userService.findById(tokenPayload.id) : null;

    this.ok(res, fillDTO(OfferPreviewRdo, fillFavorites(offers, user)));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    const responseData = fillDTO(OfferRdo, offer);
    this.created(res, responseData);
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async update({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.updateById(String(params.offerId), body);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    await this.offerService.deleteById(params.offerId);
    this.noContent(res, offer);
  }

  public async getPremiumOffers({ query }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumOffers(query.city as string);
    const responseData = fillDTO(OfferPreviewRdo, offers);
    this.ok(res, responseData);
  }

  public async getComments({ params }: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async getFavoriteOffers(
    { tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const user = await this.userService.findById(tokenPayload.id);
    if (!user) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with id «${tokenPayload.id}» not found.`,
        'OfferController'
      );
    }
    const offers = await this.offerService.findOffersByIds(user.favorites);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async addToFavorites({ tokenPayload, params }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const user = await this.userService.findById(tokenPayload.id);
    if (!user?.favorites.includes(offerId)) {
      await this.userService.addOfferToFavorites(tokenPayload.id, offerId);
    }
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async deleteFromFavorites({ tokenPayload, params }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const user = await this.userService.findById(tokenPayload.id);
    if (user?.favorites.includes(offerId)) {
      await this.userService.deleteFromFavorites(tokenPayload.id, offerId);
    }
    this.noContent(res, null);
  }
}
