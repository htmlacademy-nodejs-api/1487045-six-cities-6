import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Controller } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { CommentController, CommentEntity, CommentModel, CommentService, DefaultCommentService } from './index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}
