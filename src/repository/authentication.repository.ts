import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';
import {
  UserNotFoundException,
  PasswordIncorrectException,
} from '../exceptions/';
import PasswordUtil from '../algorithms/password/password';
import { USERS, PASSWORD } from '../constant/tables';

@injectable()
class AuthenticationRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async validateLoginCredential(id: string, passwordAttempt: string) {
    const storedPassword = await this.getPasswordAndSaltValue(id);

    const samePasswordHash = await PasswordUtil.verifyPassword(
      passwordAttempt,
      storedPassword.password,
      storedPassword.salt
    );

    if (!samePasswordHash) throw new PasswordIncorrectException();

    const user = await this.db
      .getDbInstance()(USERS)
      .where(`${USERS}.user_id`, id)
      .andWhere(`${PASSWORD}.password`, storedPassword.password)
      .join(PASSWORD, `${USERS}.user_id`, '=', `${USERS}.user_id`)
      .select('users.user_id', 'users.role')
      .first();

    if (!user) throw new UserNotFoundException();

    return user;
  }

  private async getPasswordAndSaltValue(id: string) {
    const hashedPassword = await this.db
      .getDbInstance()(PASSWORD)
      .where({ user_id: id })
      .select('password', 'salt')
      .first();

    return hashedPassword;
  }
}

export default AuthenticationRepository;
