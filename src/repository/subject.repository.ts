import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';
import { IStudent } from './student.repository';

export type EnrolledStudents = Pick<
    IStudent,
    'user_id' | 'first_name' | 'middle_name' | 'last_name'
>;

@injectable()
class SubjectRepository {
    constructor(
        @inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder
    ) {}

    async getEnrolledStudents(
        subjectName: string
    ): Promise<EnrolledStudents[]> {
        const students = await this.db
            .getDbInstance()(DbConstants.USERS_TABLE)
            .join(
                DbConstants.STUDENT_SUBJECTS,
                `${DbConstants.USERS_TABLE}.user_id`,
                '=',
                `${DbConstants.STUDENT_SUBJECTS}.LRN`
            )
            .where(
                `${DbConstants.STUDENT_SUBJECTS}.subject_id`,
                'like',
                subjectName
            )
            .select('user_id', 'first_name', 'middle_name', 'last_name');

        return students;
    }

    async getSubjectTeacher(subjectName: string) {
        const subjectTeachers = await this.db
            .getDbInstance()(DbConstants.USERS_TABLE)
            .join(
                DbConstants.TEACHER_SUBJECTS,
                `${DbConstants.USERS_TABLE}.user_id`,
                '=',
                `${DbConstants.TEACHER_SUBJECTS}.teacher_id`
            )
            .where(
                `${DbConstants.TEACHER_SUBJECTS}.subject_id`,
                'like',
                subjectName
            )
            .select('user_id', 'first_name', 'middle_name', 'last_name');

        return subjectTeachers[0];
    }
}

export default SubjectRepository;
