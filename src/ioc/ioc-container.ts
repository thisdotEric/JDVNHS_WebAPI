import { AsyncContainerModule, interfaces } from 'inversify';
import TYPES from './binding-types';
import KnexQueryBuilder from './../database/knexQueryBuilder/knexDatabase';
import IDatabase from './../database/IDatabase';
import knex from 'knex';

// service class
import StudentService from '../services/student.service';
import SubjectService from '../services/subject.service';
import AuthenticationService from '../services/authentication.service';

// repositories
import StudentRepository from '../repository/student.repository';
import SubjectRepository from '../repository/subject.repository';
import AttendanceRepository from '../repository/attendance.repository';
import AuthenticationRepository from '../repository/authentication.repository';
import AssessmentScoresRepository from '../repository/scores.repository';

//interfaces
import IStudentRepository from '../repository/IStudentRepository';
import TeacherRepository from '../repository/teacher.repository';
import { TYPE } from 'inversify-express-utils';
import TeacherService from '../services/teacher.service';

const bindings = new AsyncContainerModule(async (bind: interfaces.Bind, _) => {
  // async!
  // bindings
  bind<IDatabase<knex>>(TYPES.IDatabase)
    .to(KnexQueryBuilder)
    .inSingletonScope();

  bind<StudentService>(TYPES.StudentService).to(StudentService);
  bind<SubjectService>(TYPES.SubjectService).to(SubjectService);
  bind<IStudentRepository>(TYPES.StudentRepository).to(StudentRepository);
  bind<SubjectRepository>(TYPES.SubjectRepository).to(SubjectRepository);
  bind<AttendanceRepository>(TYPES.AttendanceRepository).to(
    AttendanceRepository
  );
  bind<AuthenticationService>(TYPES.AuthService).to(AuthenticationService);

  bind<AuthenticationRepository>(TYPES.AuthRepository).to(
    AuthenticationRepository
  );

  bind<AssessmentScoresRepository>(TYPES.AssessmentScoresRepository).to(
    AssessmentScoresRepository
  );

  bind<TeacherRepository>(TYPES.TeacherRepository).to(TeacherRepository);
  bind<TeacherService>(TYPES.TeacherService).to(TeacherService);
});

export default bindings;
