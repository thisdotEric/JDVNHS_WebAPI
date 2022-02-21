import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import UserRepository from '../repository/user.repository';

@injectable()
class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepo: UserRepository
  ) {}

  async getUser(user_id: string) {
    return this.userRepo.getUser(user_id);
  }
}

export default UserService;
