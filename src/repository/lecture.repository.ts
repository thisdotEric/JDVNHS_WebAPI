import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { LECTURES, TEACHER_SUBJECTS } from '../constant/tables';

export interface Lecture {
  lecture_date: Date;
  subject_id: string;
  grading_period: number;
  code: string;
}

@injectable()
class LectureRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async addNewLectureSession(lecture: Lecture) {
    await this.db.getDbInstance()(LECTURES).insert(lecture);
  }

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
      .getDbInstance()
      .raw(
        `select l.lecture_id, l.lecture_date, l.subject_id, l.grading_period, l.code, lc."learning_competency" from lectures l join learning_competency lc on l."code" = lc."code" where l.subject_id = '${subject_id}' order by l.lecture_date desc`
      );

    return lectures.rows;
  }

  async getLearningCompetencyWithAssessments(
    subject_id: string,
    grading_period: number
  ) {
    const unique_lc = await this.db
      .getDbInstance()
      .raw(
        `select distinct code from lectures where subject_id = '${subject_id}' and grading_period = '${grading_period}'`
      );

    return unique_lc.rows;
  }

  async getLectureIds(learning_competency_code: string) {
    //select lecture_id from lectures where code = 'M7NS-Ie-1'

    const lecture_ids = await this.db
      .getDbInstance()(LECTURES)
      .where({ code: learning_competency_code })
      .select('lecture_id');

    return lecture_ids;
  }

  async removeLecture(lecture_id: number) {
    //select lecture_id from lectures where code = 'M7NS-Ie-1'
    await this.db.getDbInstance()(LECTURES).where({ lecture_id }).delete();
  }
}

export default LectureRepository;
