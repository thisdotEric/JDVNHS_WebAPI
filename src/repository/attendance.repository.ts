import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';
import { ATTENDANCE, LECTURES } from '../constant/tables';

export type ATTENDANCE_STATUS = 'present' | 'absent' | 'excused';

export interface Attendance {
  lecture_id: number;
  LRN: string;
  status: ATTENDANCE_STATUS;
}

export interface LectureInfo {
  lecture_date: string;
  subject_id: string;
  grading_period?: number;
}

@injectable()
class AttendanceRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async addNewAttendanceRecord(attendancelist: Attendance[]) {
    // Check if lecture id is valid

    await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .insert(attendancelist);
  }

  async getLecturesWithAttendance(subject_id: string) {
    const allAttendance = await this.db
      .getDbInstance()
      .raw(
        `select distinct l.lecture_id from lectures l join attendance a on a."lecture_id" = l."lecture_id" where l."subject_id" = '${subject_id}';`
      );

    return allAttendance.rows;
  }

  async isValidAttendance(lecture_id: number) {
    const res = await this.db
      .getDbInstance()(ATTENDANCE)
      .where({ lecture_id })
      .select('*')
      .limit(1);

    return res.length === 1;
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

    return { attendance, lecture_id };
  }

  async updateAttendance(
    LRN: string,
    newStatus: ATTENDANCE_STATUS,
    lecture_id: string
  ) {
    await this.db
      .getDbInstance()(ATTENDANCE)
      .update({
        status: newStatus,
      })
      .where({
        lecture_id,
        LRN,
      });
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
        `${selects} ${first_join} ${second_join} where attendance."lecture_id" = ${subquery} AND attendance."LRN" IS NOT NULL  order by users."last_name" asc`
      );

    const latest_lecture_date = await this.db.getDbInstance().raw(
      // `select lectures."lecture_date", lectures."lecture_id" from lectures join attendance on attendance."lecture_id" = lectures."lecture_id" order by lectures.lecture_id desc limit 1`
      `select lectures."lecture_date", lectures."lecture_id" from lectures where lectures."lecture_date" = '${date}'`
    );

    return {
      lecture_date: this.formatDate(latest_lecture_date.rows[0].lecture_date),
      lecture_id: latest_lecture_date.rows[0].lecture_id,
      attendance: latest.rows,
    };
  }

  async getLatestAttendanceLectureId(subject_id: string) {
    const latest = await this.db
      .getDbInstance()(LECTURES)
      .where({ subject_id })
      .orderBy('lecture_id', 'desc')
      .select('*')
      .limit(1);

    return latest[0].lecture_id;
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
