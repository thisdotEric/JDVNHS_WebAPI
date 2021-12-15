export abstract class DbConstants {
  static readonly STUDENT_TABLE = 'student';
  static readonly TEACHER_TABLE = 'teacher';
  static readonly SUBJECT_TABLE = 'subject';
  static readonly SCHEDULE_TABLE = 'schedule';
  static readonly TEACHER_SUBJECTS = 'teachers_subject';
  static readonly STUDENT_SUBJECTS = 'students_subject';
  static readonly ATTENDANCE_TABLE = 'attendance';
  static readonly USERS_TABLE = 'users';
  static readonly PASSWORD_TABLE = 'password';
  static readonly SCORES_TABLE = 'scores';
  static readonly ASSESSMENT_TABLE = 'assessments';
  static readonly LECTURE_TABLE = 'lectures';
  static readonly LESSONS_TABLE = 'lessons';
}

export abstract class ReferenceOptions {
  static readonly CASCADE = 'CASCADE';
}
