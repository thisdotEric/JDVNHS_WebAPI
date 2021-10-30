export default abstract class Passwordstaticants {
    static readonly PASSWORD_LENGTH = 256;
    static readonly SALT_LENGTH = 64;
    static readonly ITERATIONS = 1000;
    static readonly DIGEST = 'sha256';
    static readonly BYTE_TO_STRING_ENCODING = 'hex';
}
