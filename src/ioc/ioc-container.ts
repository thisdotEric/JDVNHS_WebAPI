import { Container } from 'inversify';
import TYPES from './binding-types';
import KnexQueryBuilder from './../database/knexQueryBuilder/knexDatabase';
import IDatabase from './../database/IDatabase';
import knex from 'knex';

// service class
import StudentService from '../services/student.service';
import SubjectService from '../services/subject.service';

// repositories
import StudentRepository from '../repository/student.repository';
import SubjectRepository from '../repository/subject.repository';
import AttendanceRepository from '../repository/attendance.repository';

//interfaces
import IStudentRepository from '../repository/IStudentRepository';

const container = new Container();

// bindings
container
    .bind<IDatabase<knex>>(TYPES.IDatabase)
    .to(KnexQueryBuilder)
    .inSingletonScope();

container.bind<StudentService>(TYPES.StudentService).to(StudentService);
container.bind<SubjectService>(TYPES.SubjectService).to(SubjectService);
container
    .bind<IStudentRepository>(TYPES.StudentRepository)
    .to(StudentRepository);
container
    .bind<SubjectRepository>(TYPES.SubjectRepository)
    .to(SubjectRepository);
container
    .bind<AttendanceRepository>(TYPES.AttendanceRepository)
    .to(AttendanceRepository);

export default container;
