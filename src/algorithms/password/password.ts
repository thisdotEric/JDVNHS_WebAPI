import { randomBytes, pbkdf2 } from 'crypto';
import PasswordConstants from '../../constant/password.constants';

export interface PersistedPassword {
    salt: string;
    hashedPassword: string;
}

export default abstract class PasswordUtil {
    public static async hashPassword(
        password: string
    ): Promise<PersistedPassword> {
        return new Promise<PersistedPassword>((resolve, reject) => {
            const salt = randomBytes(PasswordConstants.SALT_LENGTH).toString(
                PasswordConstants.BYTE_TO_STRING_ENCODING
            );

            pbkdf2(
                password,
                salt,
                PasswordConstants.ITERATIONS,
                PasswordConstants.PASSWORD_LENGTH,
                PasswordConstants.DIGEST,
                (error, hash) => {
                    if (error) reject(error);
                    else
                        resolve({
                            salt,
                            hashedPassword: hash.toString(
                                PasswordConstants.BYTE_TO_STRING_ENCODING
                            ),
                        });
                }
            );
        });
    }

    public static async verifyPassword(
        passwordAttempt: string,
        hashedPassword: string,
        salt: string
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            pbkdf2(
                passwordAttempt,
                salt,
                PasswordConstants.ITERATIONS,
                PasswordConstants.PASSWORD_LENGTH,
                PasswordConstants.DIGEST,
                (error, hash) => {
                    if (error) reject(error);
                    else
                        resolve(
                            hashedPassword ===
                                hash.toString(
                                    PasswordConstants.BYTE_TO_STRING_ENCODING
                                )
                        );
                }
            );
        });
    }
}
