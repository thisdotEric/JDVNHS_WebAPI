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

  async getClassLatestAttendance(subject_id: string) {
    const first_join =
      'inner join lectures on lectures."lecture_id" = attendance."lecture_id"';
    const second_join = 'join users on users."user_id" = attendance."LRN"';
    const subquery = `(select lecture_id from lectures where subject_id = '${subject_id}' order by lecture_id desc limit 1)`;
    const selects =
      'select attendance."LRN", attendance."status" , users."first_name", users."middle_name", users."last_name" from attendance';

    const latest = await this.db
      .getDbInstance()
      .raw(
        `${selects} ${first_join} ${second_join} where attendance."lecture_id" = ${subquery} AND attendance."LRN" IS NOT NULL`
      );

    return latest.rows;
  }
}

export default AttendanceRepository;
