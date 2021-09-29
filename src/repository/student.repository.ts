import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import IStudentRepository from './IStudentRepository';
import { DbConstants } from '../constant/db.constants';
import StudentNotFoundException from '../exceptions/StudentNotFoundException';
import IUser from './IUser';
import IPerson from './IPerson';

export interface IStudent extends IUser, IPerson {
    readonly birthdate: Date;
    readonly address: string;
    readonly grade_level: string;
}

@injectable()
class StudentRepository implements IStudentRepository {
    constructor(
        @inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder
    ) {}

    async getStudentByLRN(lrn: string): Promise<IStudent> {
        const student = await this.db
            .getDbInstance()(DbConstants.USERS_TABLE)
            .join(
                DbConstants.STUDENT_TABLE,
                `${DbConstants.USERS_TABLE}.user_id`,
                '=',
                `${DbConstants.STUDENT_TABLE}.LRN`
            )
            .where({ user_id: lrn })
            .select(
                'user_id',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'contact_number',
                'gender',
                'birth_date',
                'address',
                'grade_level'
            );

        if (!student[0]) throw new StudentNotFoundException();

        return student[0];
    }
}

export default StudentRepository;
