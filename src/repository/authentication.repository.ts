import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';
import {
    UserNotFoundException,
    PasswordIncorrectException,
} from '../exceptions/';
import PasswordUtil from '../algorithms/password/password';

@injectable()
class AuthenticationRepository {
    constructor(
        @inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder
    ) {}

    async validateLoginCredential(id: string, passwordAttempt: string) {
        const storedPassword = await this.getPasswordAndSaltValue(id);

        const samePasswordHash = await PasswordUtil.verifyPassword(
            passwordAttempt,
            storedPassword.password,
            storedPassword.salt
        );

        if (!samePasswordHash) throw new PasswordIncorrectException();

        const user = await this.db
            .getDbInstance()(DbConstants.USERS_TABLE)
            .where(`${DbConstants.USERS_TABLE}.user_id`, id)
            .andWhere(
                `${DbConstants.PASSWORD_TABLE}.password`,
                storedPassword.password
            )
            .join(
                DbConstants.PASSWORD_TABLE,
                `${DbConstants.USERS_TABLE}.user_id`,
                '=',
                `${DbConstants.PASSWORD_TABLE}.user_id`
            )
            .select('users.user_id', 'users.role')
            .first();

        if (!user) throw new UserNotFoundException();

        return user;
    }

    private async getPasswordAndSaltValue(id: string) {
        const hashedPassword = await this.db
            .getDbInstance()(DbConstants.PASSWORD_TABLE)
            .where({ user_id: id })
            .select('password', 'salt')
            .first();

        return hashedPassword;
    }
}

export default AuthenticationRepository;
