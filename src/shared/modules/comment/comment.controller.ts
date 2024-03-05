import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { fillDTO } from '../../helpers/common.js';
import { Logger } from '../../libs/logger/index.js';
import {
  BaseController,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { CommentService } from './comment-service.interface.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateCommentDto)],
    });
  }

  public async create({ body, tokenPayload }: CreateCommentRequest, res: Response): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const result = await this.commentService.create({ ...body, authorId: tokenPayload.id });
    const statistics = await this.commentService.getOfferStatistics(body.offerId);
    await this.offerService.updateOfferStatistics(body.offerId, statistics);
    const comment = await this.commentService.findById(result.id);
    const responseData = fillDTO(CommentRdo, comment);
    this.created(res, responseData);
  }
}
