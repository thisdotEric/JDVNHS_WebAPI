import { AsyncContainerModule, interfaces } from 'inversify';
import TYPES from './binding-types';
import KnexQueryBuilder from './../database/knexQueryBuilder/knexDatabase';
import IDatabase from './../database/IDatabase';
import knex from 'knex';

// service class
import StudentService from '../services/student.service';
import SubjectService from '../services/subject.service';
import AuthenticationService from '../services/authentication.service';
import UserService from '../services/user.service';
import TeacherService from '../services/teacher.service';
import GradesService from '../services/grades.service';
import ReportsService from '../services/reports.service';

// repositories
import StudentRepository from '../repository/student.repository';
import SubjectRepository from '../repository/subject.repository';
import AttendanceRepository from '../repository/attendance.repository';
import AuthenticationRepository from '../repository/authentication.repository';
import AssessmentScoresRepository from '../repository/scores.repository';
import UserRepository from '../repository/user.repository';
import LectureRepository from '../repository/lecture.repository';
import AssessmentRepository from '../repository/assessment.repository';
import TrainingDataRepository from '../repository/training_data.repository';
import QuestionRepository from '../repository/question.repository';
import LearningCompetencyRepository from '../repository/learning_competency.repository';

//interfaces
import IStudentRepository from '../repository/IStudentRepository';
import TeacherRepository from '../repository/teacher.repository';

// Middlewares
import {
  StudentAccessONLY,
  TeacherAccessONLY,
  MustBeAuthenticated,
} from '../middleware';

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
  bind<AssessmentRepository>(TYPES.AssessmentRepository).to(
    AssessmentRepository
  );

  bind<TeacherRepository>(TYPES.TeacherRepository).to(TeacherRepository);
  bind<TeacherService>(TYPES.TeacherService).to(TeacherService);

  bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
  bind<UserService>(TYPES.UserService).to(UserService);

  bind<GradesService>(TYPES.GradesService).to(GradesService);
  bind<ReportsService>(TYPES.ReportsService).to(ReportsService);

  bind<LectureRepository>(TYPES.LectureRepository).to(LectureRepository);
  bind<TrainingDataRepository>(TYPES.TrainingDataRepository).to(
    TrainingDataRepository
  );
  bind<QuestionRepository>(TYPES.QuestionsRepository).to(QuestionRepository);
  bind<LearningCompetencyRepository>(TYPES.LearningCompetencyRepository).to(
    LearningCompetencyRepository
  );

  bind<MustBeAuthenticated>(TYPES.AuthMiddleware).to(MustBeAuthenticated);
  bind<StudentAccessONLY>(TYPES.StudentAccessONLY).to(StudentAccessONLY);
  bind<TeacherAccessONLY>(TYPES.TeacherAccessONLY).to(TeacherAccessONLY);
});

export default bindings;
