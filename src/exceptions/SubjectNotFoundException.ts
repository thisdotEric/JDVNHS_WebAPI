export default class SubjectNotFoundException extends Error {
  constructor(
    message: string = 'Subject not found',
    public readonly statusCode: number = 404
  ) {
    super(message);
  }
}
