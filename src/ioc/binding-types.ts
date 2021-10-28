const types = {
    IDatabase: Symbol.for('IDatabase'),
    StudentService: Symbol.for('StudentService'),
    StudentRepository: Symbol.for('StudentRepository'),
    SubjectRepository: Symbol.for('SubjectRepository'),
    AuthRepository: Symbol.for('AuthenticationRepository'),
    SubjectService: Symbol.for('SubjectService'),
    AuthService: Symbol.for('AuthenticationService'),
};

export default types;
