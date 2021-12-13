import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';

@injectable()
class AttendanceRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getStudentAttendanceByMonth(month: string, LRN: string) {
    const studentAttendance: any[] = await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .where({ LRN: LRN })
      .select('subject_id', 'attendance_stat');

    return studentAttendance;
  }
}

export default AttendanceRepository;
