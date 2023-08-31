import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from './user.mongo.entity';

@Injectable()
export class UserService {
  @Inject('USER_REPOSITORY')
  private userRepo: MongoRepository<User>;

  createOrSave(user) {
    return this.userRepo.save(user);
  }
}
