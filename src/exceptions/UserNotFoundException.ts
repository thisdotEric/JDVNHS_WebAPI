export default class UserNotFoundException extends Error {
  constructor(
    message: string = 'User not found',
    public readonly statusCode: number = 404
  ) {
    super(message);
  }
}
