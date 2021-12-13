import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import SubjectRepository, {
  EnrolledStudents,
} from '../repository/subject.repository';
import AttendanceRepository from '../repository/attendance.repository';

@injectable()
class SubjectService {
  constructor(
    @inject(TYPES.SubjectRepository)
    private readonly subjectRepo: SubjectRepository,
    @inject(TYPES.AttendanceRepository)
    private readonly attendanceRepo: AttendanceRepository
  ) {}

  async getEnrolledStudents(subjectName: string): Promise<EnrolledStudents[]> {
    return await this.subjectRepo.getEnrolledStudents(subjectName);
  }

  async getSubjectTeacher(subjectName: string) {
    return await this.subjectRepo.getSubjectTeacher(subjectName);
  }

  async getStudentAttendanceByMonth(month: string, LRN: string) {
    return await this.attendanceRepo.getStudentAttendanceByMonth(month, LRN);
  }
}

export default SubjectService;
