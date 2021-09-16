import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';

export interface IStudent {
    LRN: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    birthdate: Date;
    address: string;
    grade_level: string;
    contact_number: string;
    gender: string;
}

@injectable()
class StudentRepository {
    constructor(
        @inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder
    ) {}

    async getStudentByLRN(lrn: string): Promise<IStudent> {
        const student = await this.db
            .getDbInstance()('student')
            .where({ LRN: lrn })
            .select<IStudent>('*');

        return student;
    }
}

export default StudentRepository;
