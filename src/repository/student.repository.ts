import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import IStudentRepository from './IStudentRepository';
import { DbConstants } from '../constant/db.constants';
import StudentNotFoundException from '../exceptions/StudentNotFoundException';

export interface IStudent {
    readonly LRN: string;
    readonly first_name: string;
    readonly middle_name: string;
    readonly last_name: string;
    readonly birthdate: Date;
    readonly address: string;
    readonly grade_level: string;
    readonly contact_number: string;
    readonly gender: string;
}

@injectable()
class StudentRepository implements IStudentRepository {
    constructor(
        @inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder
    ) {}

    async getStudentByLRN(lrn: string): Promise<IStudent> {
        const student = await this.db
            .getDbInstance()(DbConstants.STUDENT_TABLE)
            .where({ LRN: lrn })
            .select('*');

        if (!student[0])
            throw new StudentNotFoundException();

        return student[0];
    }
}

export default StudentRepository;
