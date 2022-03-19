import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { LECTURES, TEACHER_SUBJECTS } from '../constant/tables';

@injectable()
class LectureRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getValidLectureDates(teacher_id: string, subject_id: string) {
    const lecture_dates = await this.db
      .getDbInstance()(LECTURES)
      .join(
        TEACHER_SUBJECTS,
        `${TEACHER_SUBJECTS}.subject_id`,
        '=',
        `${LECTURES}.subject_id`
      )
      .where(`${TEACHER_SUBJECTS}.teacher_id`, teacher_id)
      .andWhere(`${TEACHER_SUBJECTS}.subject_id`, subject_id)
      .select(`${LECTURES}.lecture_date`);

    return lecture_dates;
  }

  async getAllLectures(subject_id: string) {
    const lectures = await this.db
      .getDbInstance()(LECTURES)
      .where({ subject_id })
      .select('*');

    return lectures;
  }
}

export default LectureRepository;
