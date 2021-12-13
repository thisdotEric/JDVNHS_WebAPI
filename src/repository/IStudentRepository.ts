import { IStudent } from './student.repository';

export default interface IStudentRepository {
  getStudentByLRN(lrn: string): Promise<IStudent>;
}
