import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import SubjectRepository, {
    EnrolledStudents,
} from '../repository/subject.repository';

@injectable()
class SubjectService {
    constructor(
        @inject(TYPES.SubjectRepository)
        private readonly subjectRepo: SubjectRepository
    ) {}

    async getEnrolledStudents(
        subjectName: string
    ): Promise<EnrolledStudents[]> {
        return await this.subjectRepo.getEnrolledStudents(subjectName);
    }

    async getSubjectTeacher(subjectName: string) {
        return await this.subjectRepo.getSubjectTeacher(subjectName);
    }
}

export default SubjectService;
