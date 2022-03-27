import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import SubjectRepository, {
  EnrolledStudents,
} from '../repository/subject.repository';
import AttendanceRepository, {
  ATTENDANCE_STATUS,
  Attendance,
  LectureInfo,
} from '../repository/attendance.repository';
import AssessmentScoresRepository, {
  NewScores,
  UpdatedScore,
} from '../repository/scores.repository';
import LectureRepository from '../repository/lecture.repository';
import AssessmentRepository, {
  Assessment,
} from '../repository/assessment.repository';

@injectable()
class SubjectService {
  constructor(
    @inject(TYPES.SubjectRepository)
    private readonly subjectRepo: SubjectRepository,
    @inject(TYPES.AttendanceRepository)
    private readonly attendanceRepo: AttendanceRepository,
    @inject(TYPES.AssessmentScoresRepository)
    private readonly scoresRepo: AssessmentScoresRepository,
    @inject(TYPES.LectureRepository)
    private readonly lectureRepo: LectureRepository,
    @inject(TYPES.AssessmentRepository)
    private readonly assessmentRepo: AssessmentRepository
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

  async getAssessmentInfo(assessment_id: number) {
    return this.assessmentRepo.getAssessmentInfo(assessment_id);
  }

  async getAttendanceByLectureId(lecture_id: number) {
    return this.attendanceRepo.getAttendanceByLectureId(lecture_id);
  }

  async addNewAttendanceRecord(attendancelist: Attendance[]) {
    return this.attendanceRepo.addNewAttendanceRecord(attendancelist);
  }

  async getEnrolledStudentCount(subject_id: string) {
    return this.subjectRepo.getEnrolledStudentCount(subject_id);
  }

  async updateAttendance(
    LRN: string,
    newStatus: ATTENDANCE_STATUS,
    lecture_id: string
  ) {
    return this.attendanceRepo.updateAttendance(LRN, newStatus, lecture_id);
  }

  async getClassAttendance(subject_id: string, date: string) {
    return this.attendanceRepo.getClassAttendance(subject_id, date);
  }

  async getValidLectureDates(teacher_id: string, subject_id: string) {
    return this.lectureRepo.getValidLectureDates(teacher_id, subject_id);
  }

  async getAllAssessmentsInfo(subject_id: string) {
    return this.assessmentRepo.getAllAssessmentInfo(subject_id);
  }

  async getAllLectures(subject_id: string) {
    return this.lectureRepo.getAllLectures(subject_id);
  }

  async isValidAttendance(lecture_id: number) {
    return this.attendanceRepo.isValidAttendance(lecture_id);
  }

  async getClassAttendanceByLectureId(lecture_id: number) {
    return this.attendanceRepo.getAttendanceByLectureId(lecture_id);
  }

  async getLatestAttendance(subject_id: string) {
    const latestLecture_id =
      await this.attendanceRepo.getLatestAttendanceLectureId(subject_id);

    return this.attendanceRepo.getAttendanceByLectureId(latestLecture_id);
  }

  async getLecturesWithAttendance(subject_id: string) {
    return this.attendanceRepo.getLecturesWithAttendance(subject_id);
  }

  async updateAssessmentScores(scores: UpdatedScore[]) {
    return this.scoresRepo.updateAssessmentScores(scores);
  }

  async addNewAssessment(assessment: Assessment) {
    return this.assessmentRepo.addNewAssessment(assessment);
  }

  async removeAssessment(assessment_id: number) {
    return this.assessmentRepo.removeAssessment(assessment_id);
  }

  async getAllAssessmentsWithScores(subject_id: string) {
    return this.scoresRepo.getAllAssessmentsWithScores(subject_id);
  }

  async addNewScores(scores: NewScores) {
    return this.scoresRepo.addNewScores(scores);
  }
}

export default SubjectService;
