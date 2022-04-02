const types = {
  IDatabase: Symbol.for('IDatabase'),
  StudentService: Symbol.for('StudentService'),
  StudentRepository: Symbol.for('StudentRepository'),
  SubjectRepository: Symbol.for('SubjectRepository'),
  AuthRepository: Symbol.for('AuthenticationRepository'),
  SubjectService: Symbol.for('SubjectService'),
  AttendanceRepository: Symbol.for('AttendanceRepository'),
  AuthService: Symbol.for('AuthenticationService'),
  AssessmentScoresRepository: Symbol.for('AssessmentScoresRepository'),
  TeacherRepository: Symbol.for('TeacherRepository'),
  TeacherService: Symbol.for('TeacherService'),
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  TeacherAccessONLY: Symbol.for('TeacherAccessONLY'),
  StudentAccessONLY: Symbol.for('StudentAccessONLY'),
  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  LectureRepository: Symbol.for('LectureRepository'),
  AssessmentRepository: Symbol.for('AssessmentRepository'),
  GradesService: Symbol.for('GradesService'),
};

export default types;
