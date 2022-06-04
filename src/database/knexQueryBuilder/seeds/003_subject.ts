import * as Knex from 'knex';
import { DbConstants } from '../../../constant/db.constants';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DbConstants.SUBJECT_TABLE).del();

  const subjects = [
    { subject_id: 'Fil10', subject_name: 'Filipino 10' },
    { subject_id: 'Eng10', subject_name: 'English 10' },
    { subject_id: 'Math10', subject_name: 'Mathematics 10' },
    { subject_id: 'Sci10', subject_name: 'Science 10' },
    { subject_id: 'AP10', subject_name: 'Aralin Panlipunan 10' },
    { subject_id: 'ESP10', subject_name: 'Edukasyon sa Pagpapakatao 10' },
    {
      subject_id: 'EPP10',
      subject_name: 'Edukasyong Pantahanan at Pangkabuhayan 10',
    },
    { subject_id: 'MAPEH10', subject_name: 'MAPEH 10' },
  ];

  // [
  //   { subject_id: 'MMW1', subject_name: 'Mathematics in the Modern World' },
  //   { subject_id: 'PS1', subject_name: 'Probability and Statistics 1' },
  //   { subject_id: 'GenMath', subject_name: 'General Mathematics' },
  //   { subject_id: 'PreCal', subject_name: 'Pre-Calculus' },
  // ]

  // Inserts seed entries
  await knex(DbConstants.SUBJECT_TABLE).insert(subjects);

  const start = 10;
  const end = 50;
  let LRN;

  const enrolledStudentsInMath10: any[] = [];
  const enrolledStudentsInEng10: any[] = [];
  const enrolledStudentsInFil10: any[] = [];
  const enrolledStudentsInSci10: any[] = [];
  const enrolledStudentsInAP10: any[] = [];
  const enrolledStudentsInESP10: any[] = [];
  const enrolledStudentsInEPP10: any[] = [];
  const enrolledStudentsInMAPEH10: any[] = [];

  for (let index = start; index <= end; index++) {
    LRN = `1234567891${index}`;

    enrolledStudentsInFil10.push({ LRN, subject_id: 'Fil10' });
    enrolledStudentsInMath10.push({ LRN, subject_id: 'Math10' });
    enrolledStudentsInEng10.push({ LRN, subject_id: 'Eng10' });
    enrolledStudentsInSci10.push({ LRN, subject_id: 'Sci10' });
    enrolledStudentsInAP10.push({ LRN, subject_id: 'AP10' });
    enrolledStudentsInESP10.push({ LRN, subject_id: 'ESP10' });
    enrolledStudentsInEPP10.push({ LRN, subject_id: 'EPP10' });
    enrolledStudentsInMAPEH10.push({ LRN, subject_id: 'MAPEH10' });
  }

  await Promise.all([
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInFil10),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInMath10),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInEng10),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInSci10),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInAP10),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInESP10),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInEPP10),
    knex(DbConstants.STUDENT_SUBJECTS).insert(enrolledStudentsInMAPEH10),
    /* Add subject teachers and subjects they handled */
    knex(DbConstants.TEACHER_SUBJECTS).insert([
      { teacher_id: '1111111', subject_id: 'Math10' },
      { teacher_id: '1111111', subject_id: 'Fil10' },
      { teacher_id: '1111111', subject_id: 'Sci10' },
      { teacher_id: '1111112', subject_id: 'Eng10' },
      { teacher_id: '1111112', subject_id: 'EPP10' },
      { teacher_id: '1111112', subject_id: 'ESP10' },
      { teacher_id: '1111113', subject_id: 'AP10' },
      { teacher_id: '1111113', subject_id: 'MAPEH10' },
    ]),
  ]);
}
