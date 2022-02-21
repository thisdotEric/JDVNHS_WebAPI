import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';

@injectable()
class UserRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getUser(user_id: string) {
    const user = await this.db
      .getDbInstance()(DbConstants.USERS_TABLE)
      .where({
        user_id,
      })
      .select('user_id', 'first_name', 'middle_name', 'last_name', 'role')
      .limit(1);

    return user[0];
  }
}

export default UserRepository;
