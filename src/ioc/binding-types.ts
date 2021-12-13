const types = {
  IDatabase: Symbol.for('IDatabase'),
  StudentService: Symbol.for('StudentService'),
  StudentRepository: Symbol.for('StudentRepository'),
  SubjectRepository: Symbol.for('SubjectRepository'),
  AuthRepository: Symbol.for('AuthenticationRepository'),
  SubjectService: Symbol.for('SubjectService'),
  AttendanceRepository: Symbol.for('AttendanceRepository'),
  AuthService: Symbol.for('AuthenticationService'),
};

export default types;
