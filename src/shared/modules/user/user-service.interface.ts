import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto, UpdateUserDto, UserEntity } from './index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  addOfferToFavorites(userId: string, offerId: string): Promise<unknown>;
  deleteFromFavorites(userId: string, offerId: string): Promise<unknown>;
}
