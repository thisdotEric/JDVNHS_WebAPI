import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';

export type ATTENDANCE_STATUS = 'present' | 'absent' | 'excused';

export interface Attendance {
  lecture_id: number;
  LRN: string;
  status: ATTENDANCE_STATUS;
}

@injectable()
class AttendanceRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async addNewAttendanceRecord(attendancelist: Attendance[]) {
    await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .insert(attendancelist);
  }

  async getAttendanceByLectureId(lecture_id: number) {
    // const date = await this.db
    //   .getDbInstance()(DbConstants.LECTURE_TABLE)
    //   .where({
    //     subject_id,
    //     lecture_id,
    //   })
    //   .select('lecture_date');
    // const attendance = await this.db
    //   .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
    //   .join(
    //     DbConstants.LECTURE_TABLE,
    //     `${DbConstants.LECTURE_TABLE}.lecture_id`,
    //     '=',
    //     `${DbConstants.ATTENDANCE_TABLE}.lecture_id`
    //   )
    //   .where(`${DbConstants.ATTENDANCE_TABLE}.lecture_id`, lecture_id)
    //   .where(`${DbConstants.LECTURE_TABLE}.subject_id`, subject_id)
    //   .select('LRN', 'status');
    // return {
    //   subject_id,
    //   lecture_id,
    //   lecture_date: date[0].lecture_date,
    //   attendance,
    // };

    const attendance = await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .join(
        DbConstants.USERS_TABLE,
        `${DbConstants.USERS_TABLE}.user_id`,
        '=',
        `${DbConstants.ATTENDANCE_TABLE}.LRN`
      )
      .where({
        lecture_id,
      })
      .select('status', 'LRN', 'first_name', 'middle_name', 'last_name')
      .orderBy('last_name');

    return attendance;
  }

  async updateAttendance(
    LRN: string,
    newStatus: ATTENDANCE_STATUS,
    lecture_id: number
  ) {
    console.log(LRN, newStatus, lecture_id);

    await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .update({
        status: newStatus,
      })
      .where({
        LRN,
        lecture_id,
      });
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
