import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DbConstants.SUBJECT_TABLE).del();

  // Inserts seed entries
  await knex(DbConstants.SUBJECT_TABLE).insert([
    { subject_id: 'MMW1', subject_name: 'Mathematics in the Modern World' },
    { subject_id: 'PS1', subject_name: 'Probability and Statistics 1' },
    { subject_id: 'GenMath', subject_name: 'General Mathematics' },
    { subject_id: 'PreCal', subject_name: 'Pre-Calculus' },
  ]);

  const start = 10;
  const end = 50;
  let LRN;

  const enrolledStudentsInMMW: any[] = [];
  const enrolledStudentsInGenMath: any[] = [];
  const enrolledStudentsInPreCal: any[] = [];

  for (let index = start; index <= end; index++) {
    LRN = `1234567891${index}`;

    enrolledStudentsInPreCal.push({ LRN, subject_id: 'PreCal' });
    enrolledStudentsInMMW.push({ LRN, subject_id: 'MMW1' });
    enrolledStudentsInGenMath.push({ LRN, subject_id: 'GenMath' });
  }

  await Promise.all([
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInPreCal),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInMMW),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInGenMath),
    /* Add subject teachers and subjects they handled */
    knex(DbConstants.TEACHER_SUBJECTS).insert([
      { teacher_id: '1111111', subject_id: 'GenMath' },
      { teacher_id: '1111111', subject_id: 'PreCal' },
      { teacher_id: '1111112', subject_id: 'PS1' },
      { teacher_id: '1111113', subject_id: 'MMW1' },
    ]),
  ]);
}
