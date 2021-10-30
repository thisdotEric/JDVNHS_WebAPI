import { decode, sign } from 'jsonwebtoken';

const timeToExpire = '2h';

export interface UserDecodedData {
    user_id: string;
    role: string;
}

type JwtTokenType = 'REFRESH_TOKEN' | 'ACCESS_TOKEN';

export default abstract class JwtAuthentication {
    // Todo, make refresh token longer than access token
    // and make access token relatively short
    private static createToken(
        userData: UserDecodedData,
        tokenType: JwtTokenType
    ) {
        // Encode a jwt token using the user data
        const encodedToken = sign(userData, process.env.SECRET_TOKEN!, {
            expiresIn: timeToExpire,
        });

        return encodedToken;
    }

    public static createAccessToken(userData: UserDecodedData) {
        return JwtAuthentication.createToken(userData, 'ACCESS_TOKEN');
    }

    public static createRefreshToken(userData: UserDecodedData) {
        return JwtAuthentication.createToken(userData, 'REFRESH_TOKEN');
    }
}
