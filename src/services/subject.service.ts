import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import SubjectRepository, {
  EnrolledStudents,
} from '../repository/subject.repository';
import AttendanceRepository, {
  ATTENDANCE_STATUS,
  Attendance,
} from '../repository/attendance.repository';
import AssessmentScoresRepository from '../repository/scores.repository';

@injectable()
class SubjectService {
  constructor(
    @inject(TYPES.SubjectRepository)
    private readonly subjectRepo: SubjectRepository,
    @inject(TYPES.AttendanceRepository)
    private readonly attendanceRepo: AttendanceRepository,
    @inject(TYPES.AssessmentScoresRepository)
    private readonly scoresRepo: AssessmentScoresRepository
  ) {}

  async getEnrolledStudents(subjectName: string): Promise<EnrolledStudents[]> {
    return this.subjectRepo.getEnrolledStudents(subjectName);
  }

  async getSubjectTeacher(subjectName: string) {
    return this.subjectRepo.getSubjectTeacher(subjectName);
  }

  async getStudentAttendanceByMonth(month: string, LRN: string) {
    return this.attendanceRepo.getStudentAttendanceByMonth(month, LRN);
  }

  async removeStudentFromClass(subjectName: string, LRN: string) {
    return this.subjectRepo.removeStudentFromClass(subjectName, LRN);
  }

  async getScoresByAssessmentId(assessment_id: number) {
    return this.scoresRepo.getScoresByAssessmentId(assessment_id);
  }

  async getAttendanceByLectureId(subject_id: string, lecture_id: number) {
    return this.attendanceRepo.getAttendanceByLectureId(subject_id, lecture_id);
  }

  async addNewAttendanceRecord(attendancelist: Attendance[]) {
    return this.attendanceRepo.addNewAttendanceRecord(attendancelist);
  }

  async getEnrolledStudentCount(subject_id: string) {
    return this.subjectRepo.getEnrolledStudentCount(subject_id);
  }
}

export default SubjectService;
