import { injectable, inject } from 'inversify';
import TYPES from '../ioc/binding-types';
import KnexQueryBuilder from '../database/knexQueryBuilder/knexDatabase';
import { DbConstants } from '../constant/db.constants';
import { IStudent } from './student.repository';
import { SubjectNotFoundException } from '../exceptions';
import {
  COMPONENTS,
  LEARNING_COMPETENCY,
  LEARNING_MATERIAL,
} from '../constant/tables';

export type EnrolledStudents = Pick<
  IStudent,
  'user_id' | 'first_name' | 'middle_name' | 'last_name'
>;

export interface SubjectComponentWeights {
  subject_id: string;
  performance_task: number;
  quarterly_assessment: number;
  written_work: number;
}

export interface LearningMaterial {
  code: string;
  learning_material: string;
  link?: string;
}

@injectable()
class SubjectRepository {
  constructor(@inject(TYPES.IDatabase) private readonly db: KnexQueryBuilder) {}

  async getEnrolledStudents(subjectName: string): Promise<EnrolledStudents[]> {
    const students = await this.db
      .getDbInstance()(DbConstants.USERS_TABLE)
      .join(
        DbConstants.STUDENT_SUBJECTS,
        `${DbConstants.USERS_TABLE}.user_id`,
        '=',
        `${DbConstants.STUDENT_SUBJECTS}.LRN`
      )
      .where(`${DbConstants.STUDENT_SUBJECTS}.subject_id`, 'like', subjectName)
      .select(
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'contact_number',
        'gender'
      );

    return students;
  }

  async getSubjectTeacher(subjectName: string) {
    const subjectTeacher = await this.db
      .getDbInstance()(DbConstants.USERS_TABLE)
      .join(
        DbConstants.TEACHER_SUBJECTS,
        `${DbConstants.USERS_TABLE}.user_id`,
        '=',
        `${DbConstants.TEACHER_SUBJECTS}.teacher_id`
      )
      .join(
        DbConstants.TEACHER_TABLE,
        `${DbConstants.USERS_TABLE}.user_id`,
        '=',
        `${DbConstants.TEACHER_TABLE}.teacher_id`
      )
      .where(`${DbConstants.TEACHER_SUBJECTS}.subject_id`, 'like', subjectName)
      .select(
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'contact_number',
        `${DbConstants.TEACHER_TABLE}.email_address`
      )
      .first();

    if (!subjectTeacher) throw new SubjectNotFoundException();

    return subjectTeacher;
  }

  async removeStudentFromClass(
    subjectName: string,
    lrn: string
  ): Promise<boolean> {
    await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .update({ LRN: null })
      .where({ LRN: lrn });

    const LRN = await this.db
      .getDbInstance()(DbConstants.STUDENT_SUBJECTS)
      .where('LRN', lrn)
      .andWhere('subject_id', subjectName)
      .del();

    return LRN == 1;
  }

  async getEnrolledStudentCount(subject_id: string) {
    const count = await this.db
      .getDbInstance()(DbConstants.STUDENT_SUBJECTS)
      .count('*')
      .where({ subject_id });

    return count;
  }

  async getAttendanceByLectureId(lecture_id: number) {
    const attendance = await this.db
      .getDbInstance()(DbConstants.ATTENDANCE_TABLE)
      .where({
        lecture_id,
      })
      .select(
        'status',
        'LRN'
        // 'users."first_name" || " " || users."middle_name" || " " || users."last_name" as fullname'
      );

    return attendance;
  }

  async getSubjectComponentWeights(
    subject_id: string
  ): Promise<SubjectComponentWeights | null> {
    const componentWeights = await this.db
      .getDbInstance()(COMPONENTS)
      .where({ subject_id })
      .select<SubjectComponentWeights>('*')
      .first();

    if (!componentWeights) return null;

    return componentWeights;
  }

  async getLearningCompetencyDetails(code: string) {
    const learning_competency = await this.db
      .getDbInstance()(LEARNING_COMPETENCY)
      .where({
        code,
      })
      .limit(1);

    return learning_competency[0].learning_competency;
  }

  async getLearningMaterials(code: string) {
    const learning_materials = await this.db
      .getDbInstance()(LEARNING_MATERIAL)
      .where({
        code,
      });

    return learning_materials;
  }

  async addLearningMaterial(learningMaterial: LearningMaterial) {
    await this.db.getDbInstance()(LEARNING_MATERIAL).insert(learningMaterial);
  }

  async deleteLearningMaterials(id: number) {
    await this.db.getDbInstance()(LEARNING_MATERIAL).where({ id }).delete();
  }
}

export default SubjectRepository;
