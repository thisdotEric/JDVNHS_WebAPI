import { Container } from 'inversify';
import TYPES from './binding-types';
import KnexQueryBuilder from './../database/knexQueryBuilder/knexDatabase';
import IDatabase from './../database/IDatabase';
import knex from 'knex';

// service class
import StudentService from '../services/student.service';

// repositories
import StudentRepository from '../repository/student.repository';

const container = new Container();

// bindings
container
    .bind<IDatabase<knex>>(TYPES.IDatabase)
    .to(KnexQueryBuilder)
    .inSingletonScope();

container.bind<StudentService>(TYPES.StudentService).to(StudentService);
container
    .bind<StudentRepository>(TYPES.StudentRepository)
    .to(StudentRepository);

export default container;
