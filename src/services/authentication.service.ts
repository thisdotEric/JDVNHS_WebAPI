import { inject, injectable } from 'inversify';
import TYPES from '../ioc/binding-types';
import AuthenticationRepository from '../repository/authentication.repository';
import JwtAuthentication from '../algorithms/password/jwt';
import PasswordUtil from '../algorithms/password/password';

@injectable()
class AuthenticationService {
  constructor(
    @inject(TYPES.AuthRepository)
    private readonly authRepository: AuthenticationRepository
  ) {}

  async login(id: string, password: string) {
    const user = await this.authRepository.validateLoginCredential(
      id,
      password
    );

    const accessToken = JwtAuthentication.createAccessToken(user);
    const refreshToken = JwtAuthentication.createRefreshToken(user);

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }
}

export default AuthenticationService;
