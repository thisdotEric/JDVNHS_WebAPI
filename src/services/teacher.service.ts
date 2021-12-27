import { injectable, inject } from 'inversify';
import { httpGet } from 'inversify-express-utils';
import TYPES from '../ioc/binding-types';
import TeacherRepository from '../repository/teacher.repository';

@injectable()
class TeacherService {
  constructor(
    @inject(TYPES.TeacherRepository)
    private readonly teacherRepo: TeacherRepository
  ) {}

  async getHandledSubjects(teacher_id: string): Promise<any[]> {
    return this.teacherRepo.getHandledSubjects(teacher_id);
  }
}

export default TeacherService;
