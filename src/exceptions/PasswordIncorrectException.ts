export default class IncorrectPasswordException extends Error {
  constructor(
    message: string = 'Password is incorrect',
    public readonly statusCode: number = 401
  ) {
    super(message);
  }
}
