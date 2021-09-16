import { injectable, inject } from 'inversify';
import StudentRepository, { IStudent } from '../repository/student.repository';
import TYPES from '../ioc/binding-types';
import { StudentConstants } from '../constant/constants';

@injectable()
class StudentService {
    constructor(
        @inject(TYPES.StudentRepository)
        private readonly studentRepo: StudentRepository
    ) {}

    async getStudentByLRN(lrn: string): Promise<IStudent> {
        if (lrn.length != StudentConstants.LRN_LENGTH)
            throw new Error('LRN must have length of 12');

        const student: IStudent = await this.studentRepo.getStudentByLRN(lrn);

        return student;
    }
}

export default StudentService;
