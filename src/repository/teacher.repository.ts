import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';

@injectable()
class TeacherRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getHandledSubjects(teacher_id: string) {
    const handledSubjects = await this.db
      .getDbInstance()(DbConstants.SUBJECT_TABLE)
      .join(
        DbConstants.TEACHER_SUBJECTS,
        `${DbConstants.SUBJECT_TABLE}.subject_id`,
        '=',
        `${DbConstants.TEACHER_SUBJECTS}.subject_id`
      )
      .where({ teacher_id })
      .select('subject.subject_id', 'subject.subject_name');

    return handledSubjects;
  }
}

export default TeacherRepository;
