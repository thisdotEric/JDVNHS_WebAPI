export default class TeacherNotFoundException extends Error {
  constructor(
    message: string = 'Teacher not found',
    public readonly statusCode: number = 404
  ) {
    super(message);
  }
}
