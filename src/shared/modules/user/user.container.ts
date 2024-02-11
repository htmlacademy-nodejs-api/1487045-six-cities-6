import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DefaultUserService, UserEntity, UserModel, UserService } from './index.js';
import { types } from '@typegoose/typegoose';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
