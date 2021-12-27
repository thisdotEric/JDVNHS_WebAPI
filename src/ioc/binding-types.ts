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
};

export default types;
