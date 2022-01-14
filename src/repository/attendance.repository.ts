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

  private async insertNewLecture(
    lecture_date: string,
    subject_id: string,
    grading_period: number = 1
  ) {
    const lecture_id = await this.db
      .getDbInstance()(DbConstants.LECTURE_TABLE)
      .insert({
        lecture_date,
        subject_id,
        grading_period,
      })
      .returning('lecture_id');

    return lecture_id;
  }

  async addNewAttendanceRecord(attendancelist: Attendance[]) {
    const lecture_id = await this.insertNewLecture('2022-01-15', 'PreCal');

    console.log(lecture_id);

    // await this.db
    //   .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
    //   .insert(attendancelist);
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
    date: string
  ) {
    await this.db
      .getDbInstance()
      .raw(
        `update attendance set status = '${newStatus}' from lectures l where attendance."LRN" = '${LRN}' and l."lecture_date" = '${date}'`
      );
  }

  async getStudentAttendanceByMonth(month: string, LRN: string) {
    const studentAttendance: any[] = await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .where({ LRN: LRN })
      .select('subject_id', 'attendance_stat');

    return studentAttendance;
  }

  async getClassAttendance(subject_id: string, date: string) {
    const first_join =
      'inner join lectures on lectures."lecture_id" = attendance."lecture_id"';
    const second_join = 'join users on users."user_id" = attendance."LRN"';
    const subquery = `(select lecture_id from lectures where subject_id = '${subject_id}' and DATE(lecture_date)::TEXT LIKE '${date}' limit 1)`;
    const selects =
      'select attendance."LRN", attendance."status" , users."first_name", users."middle_name", users."last_name" from attendance';

    const latest = await this.db
      .getDbInstance()
      .raw(
        `${selects} ${first_join} ${second_join} where attendance."lecture_id" = ${subquery} AND attendance."LRN" IS NOT NULL`
      );

    const latest_lecture_date = await this.db
      .getDbInstance()
      .raw(
        `select lectures."lecture_date", lectures."lecture_id" from lectures join attendance on attendance."lecture_id" = lectures."lecture_id" order by lectures.lecture_id desc limit 1`
      );

    return {
      lecture_date: this.formatDate(latest_lecture_date.rows[0].lecture_date),
      lecture_id: latest_lecture_date.rows[0].lecture_id,
      attendance: latest.rows,
    };
  }

  private formatDate(date: string) {
    return new Date(date)
      .toISOString()
      .substring(0, 10)
      .replace(/T/, ' ')
      .replace(/\..+/, '');
  }
}

export default AttendanceRepository;
