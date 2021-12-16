import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';

export type ATTENDANCE_STATUS = 'present' | 'absent' | 'excused';

@injectable()
class AttendanceRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getAttendanceByLectureId(subject_id: string, lecture_id: number) {
    const date = await this.db
      .getDbInstance()(DbConstants.LECTURE_TABLE)
      .where({
        subject_id,
        lecture_id,
      })
      .select('lecture_date');

    const attendance = await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .join(
        DbConstants.LECTURE_TABLE,
        `${DbConstants.LECTURE_TABLE}.lecture_id`,
        '=',
        `${DbConstants.ATTENDANCE_TABLE}.lecture_id`
      )
      .where(`${DbConstants.ATTENDANCE_TABLE}.lecture_id`, lecture_id)
      .where(`${DbConstants.LECTURE_TABLE}.subject_id`, subject_id)
      .select('LRN', 'status');

    return {
      subject_id,
      lecture_id,
      lecture_date: date[0].lecture_date,
      attendance,
    };
  }

  async getStudentAttendanceByMonth(month: string, LRN: string) {
    const studentAttendance: any[] = await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .where({ LRN: LRN })
      .select('subject_id', 'attendance_stat');

    return studentAttendance;
  }
}

export default AttendanceRepository;
