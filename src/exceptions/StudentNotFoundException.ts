export default class StudentNotFoundException extends Error {
  constructor(
    message: string = 'Student not found',
    public readonly statusCode: number = 404
  ) {
    super(message);
  }
}
